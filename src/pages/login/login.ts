import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { environment } from '../../environments';
import { HttpProvider } from '../../providers/http/http';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage';
import { Observable } from 'rxjs/Observable';
import { MainPage } from '../../pages/main/main';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  private loading: boolean = false;
  private noMatch: boolean = false;
  public loginForm: FormGroup;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private _fb: FormBuilder, 
              private http:HttpProvider,
              private secureStorage: SecureStorage) {
                this.navCtrl.push(MainPage);
    
    this.loginForm = this._fb.group({
      username: ['emil2@gmail.com', [<any>Validators.required, this.noMatchValidator(this), Validators.email, <any>Validators.minLength(5)]],
      password: ['password', [<any>Validators.required, <any>Validators.minLength(5)]]
    });
    this.loginForm.controls.password.valueChanges.subscribe(() => {
      if(this.noMatch){
        this.noMatch = false;
        this.loginForm.controls.username.updateValueAndValidity();
      }
    })
  }

  ionViewDidLoad() {

  }

  private noMatchValidator(self:LoginPage): any {
    return (control: FormControl): {[key:string]: boolean} => {
      if (self.noMatch) {
        return { 'noMatch': true };
      }
    }
  }


  public login(model: any, isValid: boolean) :void {
    if ( ! isValid)
      return;
    this.loading = true;
    this.noMatch = false;
    this.http.post('auth', model, undefined)
      .subscribe((res: any) => {
        sessionStorage.setItem(environment.SESSION_STORAGE_TOKEN, res.token.accessToken);
        sessionStorage.setItem(environment.SESSION_STORAGE_ROLE, res.role);
       this.secureStorage.create(environment.SESSION_STORAGE)
        .then((storage: SecureStorageObject) => {
          let count = 0;
          Observable.merge(...[storage.set(environment.SESSION_STORAGE_TOKEN, res.token.accessToken),
              storage.set(environment.SESSION_STORAGE_ROLE, res.role)])
            .startWith(null)
            .map(data => {
              if(++count == 2)
                this.navCtrl.push(MainPage);
            })
        });
      }, (err) => {
        this.loading = false;
        (<FormControl>this.loginForm.controls['password'])
        .setValue(undefined, { onlySelf: true });

        (<FormControl>this.loginForm.controls['password']).markAsUntouched(); 
        (<FormControl>this.loginForm.controls['password']).markAsPristine(); 
        (<FormControl>this.loginForm.controls['password']).updateValueAndValidity(); 
        this.noMatch = true;
        (<FormControl>this.loginForm.controls['username']).updateValueAndValidity();
      });
  }
}
