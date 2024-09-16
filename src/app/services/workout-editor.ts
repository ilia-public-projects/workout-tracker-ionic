import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage-angular";
import { WorkoutCreateModel } from "../models/workouts/workout-create-model";
import { GuidUtils } from "../utils/guid.utils";
import { WorkoutLoader } from "./workout-loader";

@Injectable({ providedIn: 'root' })
export class WorkoutEditor {
    private key = "workouts";

    constructor(
        private storage: Storage,
        private loader: WorkoutLoader
    ) {
    }

    public async createWorkout(title: string) {
        const model = new WorkoutCreateModel(GuidUtils.newGuid(), new Date(), title, '', []);

        const workouts = await this.loader.get() || [];
        workouts.push(model);

        // sort by date
        workouts.sort((a, b) => a.date.getTime() - b.date.getTime());

        await this.storage.set(this.key, workouts);

        return model.id;
    }

    public async add() {
    }

    public async update() {
    }

    public async delete() {
    }
}