import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage-angular";
import { RoutineModel } from "../models/routine/routine-model";

@Injectable({ providedIn: 'root' })
export class RoutineLoader {
    private key = "routines";

    constructor(
        private storage: Storage
    ) {
    }

    public async get() {
        return await this.storage.get(this.key) as RoutineModel[];
    }

    public async getById(id: string) {
        const routines = await this.get();
        return routines.find(r => r.id === id);
    }
}