import { Injectable } from "@angular/core";
import { FacebookLogin, FacebookLoginResponse } from "@capacitor-community/facebook-login";

@Injectable({
    providedIn: 'root'
})
export class FacebookLoginService {

    public async facebookLogin() {

        const FACEBOOK_PERMISSIONS = ['email', 'public_profile'];
        let accessToken: string | null = null;
        try {
            const response: FacebookLoginResponse = await FacebookLogin.login({ permissions: FACEBOOK_PERMISSIONS });
            if (response.accessToken) {
                accessToken = response.accessToken.token;
            }
        } catch (error) {
            throw new Error('Error logging in with Facebook');
        }

        return accessToken;

    }
}