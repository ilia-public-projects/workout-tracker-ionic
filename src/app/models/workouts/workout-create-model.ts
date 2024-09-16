import { WorkoutDetailCreateModel } from "./workout-detail-create-model";

export class WorkoutCreateModel {
    constructor(
        public id: string,
        public date: Date,
        public title: string,
        public comments: string,
        public details: WorkoutDetailCreateModel[]
    ) { }
}