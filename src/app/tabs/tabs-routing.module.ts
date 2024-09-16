import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
	{
		path: 'tabs',
		component: TabsPage,
		children: [
			{
				path: 'workout',
				loadChildren: () => import('../workout-tab/workout-tab.module').then(m => m.WorkoutTabPageModule)
			},
			{
				path: 'tab2',
				loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
			},
			{
				path: 'exercises',
				loadChildren: () => import('../exercises-tab/exercises-tab.module').then(m => m.ExercisesTabPageModule)
			},
			{
				path: '',
				redirectTo: '/tabs/workout',
				pathMatch: 'full'
			}
		]
	},
	{
		path: '',
		redirectTo: '/tabs/workout',
		pathMatch: 'full'
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule { }
