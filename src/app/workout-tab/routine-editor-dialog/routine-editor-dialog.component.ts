import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { AlertButton, ModalController } from "@ionic/angular";
import { Subscription } from "rxjs";
import { ExercisePickerComponent } from "src/app/common/components/exercise-picker/exercise-picker.component";
import { AlertService } from "src/app/common/services/alert.service";
import { ToastService } from "src/app/common/services/toastr.service";
import { ExerciseInfoDialogComponent } from "src/app/exercises-tab/exercise-info-dialog/exercise-info-dialog.component";
import { ExerciseModel } from "src/app/models/exercises/exercise-model";
import { RoutineExerciseModel } from "src/app/models/routine/routine-exercise-model";
import { RoutineExerciseSetModel } from "src/app/models/routine/routine-exercise-set-model";
import { RoutineModel } from "src/app/models/routine/routine-model";
import { ExerciseLoader } from "src/app/services/exercise-loader";
import { RoutineEditor } from "src/app/services/routine-editor";
import { RoutineLoader } from "src/app/services/routine-loader";
import { GuidUtils } from "src/app/utils/guid.utils";

@Component({
    selector: 'app-routine-editor-dialog',
    templateUrl: './routine-editor-dialog.component.html',
    styleUrls: ['./routine-editor-dialog.component.scss']
})
export class RoutineEditorDialogComponent implements OnInit, OnDestroy {
    @Input() public routineId?: string;

    public form?: FormGroup;
    private subs: Subscription[] = [];

    constructor(
        private modalCtrl: ModalController,
        private formBuilder: FormBuilder,
        private routineEditor: RoutineEditor,
        private routineLoader: RoutineLoader,
        private toast: ToastService,
        private exerciseLoader: ExerciseLoader,
        private alertService: AlertService
    ) { }

    ngOnDestroy(): void {
        this.subs.forEach(sub => sub.unsubscribe());
    }

    async ngOnInit() {
        this.form = new FormGroup({
            id: new FormControl(GuidUtils.newGuid()),
            name: new FormControl('', [Validators.required]),
            exercises: this.formBuilder.array([])
        });

        await this.loadRoutine();
    }

    private async loadRoutine() {
        if (!this.routineId) {
            return;
        }

        const routine = await this.routineLoader.getById(this.routineId);
        if (!routine) {
            this.toast.showToast('Routine not found');
            this.dismissModal();
            return;
        }

        this.name?.setValue(routine.name);
        this.id?.setValue(routine.id);

        routine.exercises?.forEach(async exercise => {
            const exerciseInfo = await this.exerciseLoader.getById(exercise.exerciseId);
            const form = new FormGroup({
                exerciseId: new FormControl(exercise.exerciseId),
                name: new FormControl(exerciseInfo?.name),
                sets: this.formBuilder.array(exercise.sets?.map(set => new FormGroup({
                    reps: new FormControl(set.repetitions),
                    weight: new FormControl(set.weight)
                })))
            });

            this.exercises.setControl(this.exercises.length, form);
        });
    }

    public async dismissModal() {
        if (this.form?.dirty) {
            const alertHeader = 'Unsaved changes';
            const message = 'You have unsaved changes. Are you sure you want to leave?';

            const buttons: AlertButton[] = [
                {
                    text: 'Cancel',
                    role: 'cancel',
                },
                {
                    text: 'Leave',
                    handler: () => {
                        this.modalCtrl.dismiss(null, 'confirm');
                    }
                }
            ];

            await this.alertService.showAlert(alertHeader, message, buttons);
        } else {
            this.modalCtrl.dismiss(null, 'confirm');
        }
    }

    public async save() {
        const routine = this.buildRoutineModel();
        if (this.routineId) {
            await this.routineEditor.updateRoutine(routine);
        } else {
            await this.routineEditor.createRoutine(routine);
        }
        this.modalCtrl.dismiss(null, 'confirm');
    }

    private buildRoutineModel(): RoutineModel {
        const routine = {} as RoutineModel;
        routine.id = this.id?.value;
        routine.name = this.name?.value;

        routine.exercises = this.exercises.controls.map(exercise => {
            return {
                exerciseId: exercise.get('exerciseId')?.value,
                sets: (exercise.get('sets') as FormArray).controls.map(set => {
                    return {
                        repetitions: set.get('reps')?.value ?? 0,
                        weight: set.get('weight')?.value ?? 0
                    } as RoutineExerciseSetModel;
                })
            } as RoutineExerciseModel;
        });

        return routine;
    }

    public async addExercise() {
        const modal = await this.modalCtrl.create({
            component: ExercisePickerComponent
        });

        modal.present();

        const { data, role } = await modal.onDidDismiss();
        if (role === 'confirm') {
            const exercise = data as ExerciseModel;

            const form = new FormGroup({
                exerciseId: new FormControl(exercise.id),
                name: new FormControl(exercise.name),
                sets: this.formBuilder.array([]),
            });

            this.exercises.setControl(this.exercises.length, form);
            this.form?.markAsDirty();
        }
    }

    public async swapExercise(index: number) {
        const modal = await this.modalCtrl.create({
            component: ExercisePickerComponent
        });

        modal.present();

        const { data, role } = await modal.onDidDismiss();
        if (role === 'confirm') {
            const exercise = data as ExerciseModel;

            const exerciseForm = this.exercises.controls[index];
            exerciseForm.get('exerciseId')?.setValue(exercise.id);
            exerciseForm.get('name')?.setValue(exercise.name);
            this.form?.markAsDirty();
        }
    }

    public async showExerciseInfo(index:number){
        const exerciseId = this.exercises.controls[index].get('exerciseId')?.value;
        const modal = await this.modalCtrl.create({
            component: ExerciseInfoDialogComponent,
            componentProps: {
                exerciseId
            }
        });

        modal.present();
    }

    public async removeExercise(index: number) {
        this.exercises.removeAt(index);
        this.form?.markAsDirty();
    }

    public addSet(exercise: AbstractControl) {
        const form = new FormGroup({
            reps: new FormControl(''),
            weight: new FormControl(''),
        });


        const sets = exercise.get('sets') as FormArray;
        sets.setControl(sets.length, form);

        this.form?.markAsDirty();
    }

    public removeSet(exerciseIndex: number, setIndex: number) {
        const sets = this.sets(this.exercises.controls[exerciseIndex]);
        sets.removeAt(setIndex);
        this.form?.markAsDirty();
    }

    public sets(exercise: AbstractControl) {
        return exercise.get('sets') as FormArray;
    }

    get id() { return this.form?.get('id'); }
    get name() { return this.form?.get('name'); }
    get exercises() { return this.form?.get('exercises') as FormArray; }
}