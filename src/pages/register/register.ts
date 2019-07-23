import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../home/home';
import { DicasPage } from '../dicas/dicas';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  @ViewChild("usuario") email;
  @ViewChild("senha") password;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public fire: AngularFireAuth,
    public toastCtrl: ToastController
  ) {
  }

  registrar() {

    let toast = this.toastCtrl.create({ duration: 2000, position: 'bottom' })

    this.fire.auth.createUserWithEmailAndPassword(this.email.value, this.password.value)
      .then(data => {

        console.log('aqui temos a data: ', data);
        toast.setMessage("Usuário criado com sucesso!");
        toast.present();
        this.navCtrl.setRoot(DicasPage);
      })
      .catch((error: any) => {
        if (error.code == 'auth/email-already-in-use') {
          toast.setMessage("Email ja está em uso.");
        }
        else if (error.code == 'auth/invalid-email') {
          toast.setMessage("Email inválido.");
        }
        else if (error.code == 'auth/operation-not-allowed') {
          toast.setMessage("Você não tem permissão para realizar esta ação.");
        }
        else if (error.code == 'auth/weak-password') {
          toast.setMessage("Senha fraca.");
        }
        toast.present();
      });
  }

}
