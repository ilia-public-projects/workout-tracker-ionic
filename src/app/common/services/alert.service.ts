import { Injectable } from "@angular/core";
import { AlertButton, AlertController } from "@ionic/angular";

@Injectable({ providedIn: 'root' })
export class AlertService {
    constructor(
        private alertCtrl: AlertController
    ) { }

    public async showAlert(header: string, message: string, buttons: AlertButton[]) {
        const alert = await this.alertCtrl.create({
            header: header,
            message: message,
            buttons: buttons?.length ? buttons : ['OK']
        });

        await alert.present();
    }
}