import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, firstValueFrom, map, of, take } from "rxjs";
import { AuthApiService } from "../api/auth-api.service";
import { UserTokenModel } from "../models/user-token.model";
import { FacebookLoginService } from "./facebook-login.service";

@Injectable({
    providedIn: 'root'
})
export class AuthService implements OnDestroy {
    private user = new BehaviorSubject<UserTokenModel | null>(null);

    constructor(
        private facebookLoginService: FacebookLoginService,
        private authApiService: AuthApiService
    ) { }

    public autoLogin() {
        const token = localStorage.getItem('token');
        if (token) {
            const user = UserTokenModel.buildFromToken(token);
            this.user.next(user);

            return of(true);
        }

        return of(false);
    }

    ngOnDestroy(): void {

    }

    public async facebookLogin() {
        const accessToken = await this.facebookLoginService.facebookLogin();
        if (!accessToken) {
            return;
        }

        const loginResponse = await firstValueFrom(this.authApiService.facebookLogin(accessToken));
        this.storeToken(loginResponse.response.token);
    }

    private storeToken(token: string) {
        const user = UserTokenModel.buildFromToken(token);
        this.user.next(user);

        localStorage.setItem('token', token);
    }

    public getUser() {
        return this.user.asObservable().pipe(take(1));
    }

    public isAuthenticated() {
        return this.user.asObservable().pipe(map(user => {
            if (user) {
                return !!user.token;
            } else {
                return false;
            }
        }));
    }
}