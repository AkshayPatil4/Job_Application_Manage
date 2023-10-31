import { HttpClient } from '@angular/common/http';
import { Injectable} from  '@angular/core'
import { catchError, throwError } from 'rxjs';

export interface AuthResponseData{
    idToken :string,
    email: string,
    refreshToken:string,
    expiresIn: string,
    localId: string,
    registered?:boolean
}
@Injectable({providedIn: 'root'})


export class AuthService{
constructor( private http: HttpClient){}


onSignup(email: string, password:string){
  return  this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAecRGdf8AvP-I0T8c6gv0qpFX6cBJYYfc',{
        email:email,
        password: password,
        returnSecureToken:true
    } ).pipe(catchError(errorRes=>{
        let errorMessage = 'An unknown error occured';
        if(!errorRes.error || !errorRes.error.error){
            return throwError(errorMessage);
        }
        switch(errorRes.error.error.message){
            case 'EMAIL_EXISTS' : 
            errorMessage = 'The email address is already in use by another account';
            break;
            case 'EMAIL_NOT_FOUND' :
                errorMessage = 'There is no user record corresponding to this identifier';
                break;
            case 'INVALID_PASSWORD' :
                errorMessage = 'The password is invalid ';
                break;
        }
       return throwError(errorMessage);
    }));
}

login(email: string, password:string){
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAecRGdf8AvP-I0T8c6gv0qpFX6cBJYYfc',{
    email: email,
    password: password,
    returnSecureToken:true
    })
}
}