import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
    providedIn: 'root',
})
export class ToastService {
    constructor(private toastr: ToastController) { }

    public showToast(toastMessage: string, error = true) {
        this.toastr
            .create({
                duration: 2000,
                header: error ? 'Error!' : 'Success!',
                message: toastMessage,
                color: error ? 'danger' : 'success',
                position: 'top',
            })
            .then((toaster) => {
                toaster.present();
            });
    }
}
