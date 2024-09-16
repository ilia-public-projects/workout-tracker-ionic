import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FacebookLogin, FacebookLoginResponse } from '@capacitor-community/facebook-login';
import { jwtDecode } from 'jwt-decode';
import { firstValueFrom } from 'rxjs';

@Component({
	selector: 'app-tab2',
	templateUrl: 'tab2.page.html',
	styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
	public user: any;
	constructor(
		private http: HttpClient
	) { }

	public async facebookLogin() {
		const FACEBOOK_PERMISSIONS = ['email', 'public_profile'];

		try {
			const response: FacebookLoginResponse = await FacebookLogin.login({ permissions: FACEBOOK_PERMISSIONS });
			console.log('FacebookLogin response:', response);
			if (response.accessToken) {
				const accessToken = response.accessToken.token;
				console.log('accessToken:', accessToken);

				// Send accessToken to your .NET API to exchange for your own token
				const result = await firstValueFrom(this.http.post<any>('https://localhost:44395/oauth/facebook', { accessToken }));
				console.log('result:', result);
				// const yourToken = result.token;
				// Store your token (e.g., in localStorage)
				localStorage.setItem('token', result.response.token);

				this.user = jwtDecode(result.response.token);
			}
		} catch (error) {
			console.error('Error logging in with Facebook', error);
		}

	}
}
