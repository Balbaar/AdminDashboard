import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { LoginComponent } from './login/login.component';
import { CreateComponent } from './create/create.component';
import { ManageComponent } from './manage/manage.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateComponent,
    ManageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,

    provideFirebaseApp(() => initializeApp({apiKey: "AIzaSyCO2jxiq_lf_2ZTVqqAFFznkekw0moC86s",
    authDomain: "retrokuriosa.firebaseapp.com",
    projectId: "retrokuriosa",
    storageBucket: "retrokuriosa.appspot.com",
    messagingSenderId: "770917293090",
    appId: "1:770917293090:web:fc732c022c2e711fbf3e7b",
    measurementId: "G-6K13MNDQ4L"})),
    
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
