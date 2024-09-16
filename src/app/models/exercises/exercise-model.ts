export interface ExerciseModel {
    id: string;
    name: string;
    isEditable: boolean;
    force: string;
    level: string;
    mechanic: string;
    equipment: string;
    category: string;
    primaryMuscles: string[];
    secondaryMuscles: string[];
    instructions: string[];
    imagePaths: string[];
}