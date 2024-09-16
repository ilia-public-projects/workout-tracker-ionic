import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ModalController } from "@ionic/angular";
import { ExerciseModel } from "src/app/models/exercises/exercise-model";
import { ExerciseEditor } from "src/app/services/exercise-editor";

@Component({
    selector: 'app-exercise-edit-dialog',
    templateUrl: 'exercise-edit-dialog.component.html',
})
export class ExerciseEditDialogComponent implements OnInit {
    @Input() public item!: ExerciseModel;

    public form?: FormGroup;

    constructor(
        private editor: ExerciseEditor,
        private modalCtrl: ModalController
    ) { }

    ngOnInit() {
        this.form = new FormGroup({
            name: new FormControl(this.item.name, [Validators.required]),
        });
    }

    public async confirm() {
        if (this.form?.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        await this.editor.update(this.item.id, this.name?.value);

        this.modalCtrl.dismiss(null, 'confirm');
    }

    public cancel() {
        this.modalCtrl.dismiss();
    }



    get name() { return this.form?.get('name'); }
}