import { Component } from "@angular/core";
import { TabsPage } from "../tabs/tabs.page";

@Component({
    selector: 'app-workout',
    templateUrl: 'workout.component.html',
})
export class WorkoutComponent {
    public component = TabsPage;
    constructor(
    ) { }

    public async save(){}

}