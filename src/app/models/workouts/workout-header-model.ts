import { WorkoutDetailModel } from "./workout-detail-model";

export interface WorkoutHeaderModel {
    id: string;
    date: Date;
    title: string;
    comments: string;
    details: WorkoutDetailModel[];
}