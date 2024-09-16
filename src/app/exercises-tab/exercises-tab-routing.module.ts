import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExercisesTabPage } from './exercises-tab.page';

const routes: Routes = [
  {
    path: '',
    component: ExercisesTabPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExercisesTabPageRoutingModule {}
