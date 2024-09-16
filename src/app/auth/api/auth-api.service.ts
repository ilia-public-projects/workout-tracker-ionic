import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiResult } from "src/app/common/api-models/api-result";
import { environment } from "src/environments/environment";
import { PostLoginResponse } from "./responses/post-login-response";
import { PostFacebookLoginRequest } from "./requests/post-facebook-login-request";
import { take } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthApiService {
    private urlBase = `${environment.apiUrl}/oauth`;

    constructor(
        private http: HttpClient,
    ) { }

    public facebookLogin(accessToken: string) {
        const url = `${this.urlBase}/facebook`;
        const request = new PostFacebookLoginRequest(accessToken);
        return this.http.post<ApiResult<PostLoginResponse>>(url, request).pipe(take(1));
    }
}