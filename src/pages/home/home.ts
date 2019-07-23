import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

import { DicasPage } from '../dicas/dicas';
import { RegisterPage } from '../register/register';

import { AngularFireAuth } from 'angularfire2/auth'

import { Users } from './users';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  users: Users = new Users();

  @ViewChild("usuario") email;
  @ViewChild("senha") password;

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public fire: AngularFireAuth
    ) {

  }

  entrar (){

    let toast = this.toastCtrl.create({duration: 3000, position: 'bottom'});

    this.fire.auth.signInWithEmailAndPassword(this.email.value, this.password.value)
    .then (data =>{

      console.log ("dados do login:", data);
      this.users.email = this.email.value;
      this.users.senha = this.password.value;

      this.navCtrl.setRoot(DicasPage);
    })
    .catch((error: any) => {
      if (error.code == 'auth/user-disabled') {
        toast.setMessage("Este usuário foi não se encontra mais em nosso banco.");
      }
      else if (error.code == 'auth/invalid-email') {
        toast.setMessage("Email inválido.");
      }
      else if (error.code == 'auth/user-not-found') {
        toast.setMessage("Usuário não encontrado.");
      }
      else if (error.code == 'auth/wrong-password') {
        toast.setMessage("Senha incorreta.");
      }
      toast.present();
    });
    
  }

  cadastrar () {
    this.navCtrl.push(RegisterPage);
  }
}
