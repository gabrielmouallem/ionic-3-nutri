import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';

import { DicasPage } from '../dicas/dicas';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild("usuario") email;
  @ViewChild("senha") password;

  constructor(public navCtrl: NavController) {

  }

  entrar (){

    if (this.email.value ==  "admin" && this.password.value == "admin"){
      this.navCtrl.push(DicasPage);
    } else {

    }
    
  }
}
