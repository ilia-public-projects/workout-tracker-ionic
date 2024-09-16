export interface WorkoutSetModel {
    weight: number;
    isKgs: boolean;
    reps: number;
    dropSets: WorkoutSetModel[];
}