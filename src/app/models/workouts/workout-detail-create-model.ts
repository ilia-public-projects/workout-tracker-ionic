import { WorkoutSetCreateModel } from "./workout-set-create-model";

export class WorkoutDetailCreateModel{
    constructor(
        public exerciseId: string,
        public sets: WorkoutSetCreateModel[]
    ){}
}