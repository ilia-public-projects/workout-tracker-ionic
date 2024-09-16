import { Injectable } from "@angular/core";
import { RoutineLoader } from "./routine-loader";
import { RoutineModel } from "../models/routine/routine-model";
import { Storage } from "@ionic/storage-angular";

@Injectable({providedIn: 'root'})
export class RoutineEditor {
    private key = "routines";

    constructor(
        private storage: Storage,
        private loader: RoutineLoader
    ) {
    }

    public async createRoutine(model: RoutineModel) {
        const routines = await this.loader.get() || [];
        routines.push(model);

        // sort by name
        routines.sort((a, b) => a.name.localeCompare(b.name));

        await this.storage.set(this.key, routines);

    }

    public async updateRoutine(model: RoutineModel) {
        const routines = await this.loader.get() || [];
        const index = routines.findIndex(r => r.id === model.id);
        if (index >= 0) {
            routines[index] = model;
            await this.storage.set(this.key, routines);
        }
    }

    public async add() {
    }

    public async update() {
    }

    public async delete() {
    }
}