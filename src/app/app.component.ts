import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from './auth/services/auth.service';
import { ExerciseMasterDataLoader } from './services/exercise-master-data-loader';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
	constructor(
		private storage: Storage,
		private router: Router,
		private authService: AuthService,
		private exerciseMasterDataLoader: ExerciseMasterDataLoader
	) { }

	async ngOnInit() {
		this.authService.autoLogin();
		await this.storage.create();
		
		await this.exerciseMasterDataLoader.insertMasterData();
	}

	public logout() {
		this.router.navigate(['/auth']);
	}
}
