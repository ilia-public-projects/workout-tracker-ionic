import { UnitOfMeasure } from "../common/unit-of-measure";
import { RoutineExerciseSetModel } from "./routine-exercise-set-model";

export interface RoutineExerciseModel {
    exerciseId: string;
    unitOfMeasure: UnitOfMeasure;
    sets: RoutineExerciseSetModel[];
}