import { HttpClient } from '@angular/common/http';
import { Injectable} from  '@angular/core'

interface AuthResponseData{
    idToken :string,
    email: string,
    refreshToken:string,
    expiresIn: string,
    localId: string
}
@Injectable({providedIn: 'root'})


export class AuthService{
constructor( private http: HttpClient){}


onSignup(email: string, password:string){
  return  this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAecRGdf8AvP-I0T8c6gv0qpFX6cBJYYfc',{
        email:email,
        password: password,
        returnSecureToken:true
    } );
}
}