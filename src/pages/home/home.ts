import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  private loading: boolean = true;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private http:HttpProvider) {

  }

  ionViewDidLoad() {
  }

}
