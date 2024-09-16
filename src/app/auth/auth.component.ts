import { Component, Renderer2 } from "@angular/core";
import { ToastService } from "../common/services/toastr.service";
import { AuthService } from "./services/auth.service";
import { LoadingController } from "@ionic/angular";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment";

@Component({
    selector: 'app-auth',
    templateUrl: 'auth.component.html',
})
export class AuthComponent {
    public user: any;

    constructor(
        private authService: AuthService,
        private toastr: ToastService,
        private loadingCtrl: LoadingController,
        private router: Router,
        private renderer: Renderer2,
    ) { }

    ngOnInit(): void {
        this.loadFacebookSDK();
    }

    loadFacebookSDK() {
        // Check if the SDK script is already loaded
        if (document.getElementById('facebook-jssdk')) {
            return;
        }

        const js = this.renderer.createElement('script');
        js.id = 'facebook-jssdk';
        js.src = "https://connect.facebook.net/en_US/sdk.js";

        const fjs = document.getElementsByTagName('script')[0];
        this.renderer.insertBefore(fjs.parentNode, js, fjs);

        // Initialize the Facebook SDK when the script is loaded
        window['fbAsyncInit'] = () => {
            window['FB'].init({
                appId: environment.facebookAppId,
                xfbml: true,
                version: 'v5.0'
            });
        };
    }

    public async facebookLogin() {
        const loader = await this.loadingCtrl.create({ message: 'Loggin in ...', keyboardClose: false });
        loader.present();

        try {
            await this.authService.facebookLogin();
            this.router.navigate(['/tabs']);
        }
        catch (error) {
            this.toastr.showToast('Error logging in with Facebook', true);
        } finally {
            loader.dismiss();
        }
    }
}