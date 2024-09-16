import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ModalController } from "@ionic/angular";
import { WorkoutEditor } from "src/app/services/workout-editor";

@Component({
    selector: 'app-new-workout-dialog',
    templateUrl: 'new-workout-dialog.component.html',
})
export class NewWorkoutDialogComponent implements OnInit {

    public form?: FormGroup;

    constructor(
        private editor: WorkoutEditor,
        private modalCtrl: ModalController
    ) { }

    ngOnInit() {
        this.form = new FormGroup({
            name: new FormControl('', [Validators.required]),
        });
    }

    public async confirm() {
        if (this.form?.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        await this.editor.createWorkout(this.name?.value);

        this.modalCtrl.dismiss(null, 'confirm');
    }

    public cancel() {
        this.modalCtrl.dismiss();
    }



    get name() { return this.form?.get('name'); }

}