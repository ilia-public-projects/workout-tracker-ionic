import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/services/auth.guard';

const routes: Routes = [
	{
		path: '',
		loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
	},
	{
		path: 'workout',
		loadChildren: () => import('./workout/workout.module').then(m => m.WorkoutModule),
	},
	{
		path: 'auth',
		loadChildren: () => import('./auth/auth.module').then((x) => x.AuthModule),
	},
];
@NgModule({
	imports: [
		RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
	],
	exports: [RouterModule]
})
export class AppRoutingModule { }
