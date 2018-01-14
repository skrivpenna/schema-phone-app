import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { SecureStorage } from '@ionic-native/secure-storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { NotificationPage } from '../pages/notification/notification';
import { SettingsPage } from '../pages/settings/settings';
import { MainPage } from '../pages/main/main';
import { HttpProvider } from '../providers/http/http';
import { JsonpProvider } from '../providers/jsonp/jsonp';
import { LoadingComponent } from '../components/loading/loading';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    NotificationPage,
    SettingsPage,
    MainPage,
    LoadingComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    NotificationPage,
    SettingsPage,
    MainPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SecureStorage,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpClientModule,
    HttpProvider,
    JsonpProvider
  ]
})
export class AppModule {}
