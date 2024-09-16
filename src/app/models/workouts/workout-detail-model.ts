import { WorkoutSetModel } from "./workout-set-model";

export interface WorkoutDetailModel {
    exerciseId: string;
    sets: WorkoutSetModel[];
}