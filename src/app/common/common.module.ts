import { NgModule } from "@angular/core";
import { ExercisePickerComponent } from "./components/exercise-picker/exercise-picker.component";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [
        ExercisePickerComponent
    ],
    imports: [
        IonicModule,
		CommonModule,
		FormsModule,
    ],
    exports: [
        ExercisePickerComponent
    ]
})
export class CommonComponentsModule { }
