import { RoutineExerciseModel } from "./routine-exercise-model";

export interface RoutineModel {
    id: string;
    name: string;
    exercises: RoutineExerciseModel[];
}