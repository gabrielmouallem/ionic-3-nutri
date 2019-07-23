import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

import { DicasPage } from '../dicas/dicas';
import { RegisterPage } from '../register/register';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild("usuario") email;
  @ViewChild("senha") password;

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController
    ) {

  }

  entrar (){

    let toast = this.toastCtrl.create({duration: 3000, position: 'bottom'});

    if (this.email.value ==  "admin" && this.password.value == "admin"){
      this.navCtrl.push(DicasPage);
      toast.setMessage('Logado com sucesso!');
      toast.present();
    } else {
      toast.setMessage('Usuário ou senha não encontrado.');
      toast.present();
    }
    
  }

  cadastrar () {
    this.navCtrl.push(RegisterPage);
  }
}
