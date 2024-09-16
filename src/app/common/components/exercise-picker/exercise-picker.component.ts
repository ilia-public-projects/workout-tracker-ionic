import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { ExerciseModel } from "src/app/models/exercises/exercise-model";
import { ExerciseLoader } from "src/app/services/exercise-loader";

@Component({
    selector: 'app-exercise-picker',
    templateUrl: 'exercise-picker.component.html',
})
export class ExercisePickerComponent implements OnInit {
    public list: ExerciseModel[] = [];

    constructor(
        private loader: ExerciseLoader,
        private modalCtrl: ModalController
    ) { }

    async ngOnInit() {
        await this.search();
    }

    public async search(searchTest?: string) {
        this.list = await this.loader.get();
        if (searchTest) {
            this.list = this.list.filter(item => item.name.toLowerCase().includes(searchTest.toLowerCase()));
        }
    }

    public async handleSearch(event: CustomEvent) {
        await this.search(event.detail.value);
    }

    public async select(item: ExerciseModel) {
        this.modalCtrl.dismiss(item, 'confirm');
    }

    public cancel() {
        this.modalCtrl.dismiss();
    }
}