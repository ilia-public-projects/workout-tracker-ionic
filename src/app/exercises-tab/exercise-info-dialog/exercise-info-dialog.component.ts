import { Component, Input, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { ExerciseModel } from "src/app/models/exercises/exercise-model";
import { ExerciseLoader } from "src/app/services/exercise-loader";

@Component({
    selector: 'app-exercise-info-dialog',
    templateUrl: 'exercise-info-dialog.component.html'
})
export class ExerciseInfoDialogComponent implements OnInit {
    @Input() public exerciseId!: string;

    public exercise?: ExerciseModel;

    constructor(
        private exerciseLoader: ExerciseLoader,
        private modalCtrl: ModalController
    ) { }

    async ngOnInit() {
        this.exercise = await this.exerciseLoader.getById(this.exerciseId);
    }

    public cancel(){
        this.modalCtrl.dismiss();
    }
}