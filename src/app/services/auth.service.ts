import { Injectable } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth, 
    private Router: Router
  ) { };

  private user: any;

  login(email: string, password: string) {
    this.afAuth.signInWithEmailAndPassword(email, password).then(logRef => {
      console.log("Login Success")
      this.Router.navigate(["/manage"])
    }).catch(e => {
      console.log(e)
      console.log("Wrong Info")
    })
  }

  logout() {
    this.afAuth.signOut().then(() => {
      alert("Du är nu utloggad.")
    })
  }

  checkUser() {
    this.afAuth.authState.subscribe(user => {
      this.user = user

      console.log("User Info Fetched!")

      if (!this.user) {
        this.Router.navigate(["/login"])
      }
    })
  }


}
