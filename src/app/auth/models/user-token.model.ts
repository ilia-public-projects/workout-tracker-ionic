import { jwtDecode } from "jwt-decode";

export class UserTokenModel {
    public userId!: string;
    public email!: string;
    public name!: string;
    public picture!: string;
    public token!: string;
    public tokenExpiresAt!: number;

    public static buildFromToken(token: string) {
        const userToken = new UserTokenModel();
        const decodedToken = jwtDecode(token) as any;
        userToken.userId = decodedToken.userId;
        userToken.email = decodedToken.email;
        userToken.name = decodedToken.name;
        userToken.picture = decodedToken.picture;
        userToken.token = token;
        userToken.tokenExpiresAt = decodedToken.expires;
        return userToken;
    }

    get isExpired() {
        if (!this.tokenExpiresAt || this.tokenExpiresAt <= new Date().getTime() / 1000) {
            return true
        }

        return false;
    }

    get tokenDuration() {
        if (!this.token) {
            return 0;
        } else {
            const remaining = (this.tokenExpiresAt * 1000) - new Date().getTime();
            return remaining;
        }
    }

}