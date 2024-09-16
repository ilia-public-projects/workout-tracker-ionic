import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ModalController } from "@ionic/angular";
import { ExerciseEditor } from "src/app/services/exercise-editor";

@Component({
    selector: 'app-exercise-create-dialog',
    templateUrl: 'exercise-create-dialog.component.html',
})
export class ExerciseCreateDialogComponent implements OnInit {

    public form?: FormGroup;

    constructor(
        private editor: ExerciseEditor,
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

        await this.editor.add(this.name?.value);

        this.modalCtrl.dismiss(null, 'confirm');
    }

    public cancel() {
        this.modalCtrl.dismiss();
    }



    get name() { return this.form?.get('name'); }

}