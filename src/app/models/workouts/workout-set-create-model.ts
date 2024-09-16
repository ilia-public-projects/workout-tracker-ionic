export class WorkoutSetCreateModel {
    constructor(
        public weight: number,
        public isKgs: boolean,
        public reps: number,
        public dropSets: WorkoutSetCreateModel[]
    ) { }
}