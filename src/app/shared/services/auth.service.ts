import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map, tap} from 'rxjs/operators'
import { UserServiceMock } from '../mock/services/user.service';



const API_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
        private http: HttpClient,
        private userService: UserServiceMock
      ) { }

  authenticate(email: string, password: string){
    
   return this.http
              .post(
                API_URL + '/users',
               {email: email, password: password}, 
               {observe: 'response'}
               )
              .pipe(tap(res => { 
                const authToken = res.headers.get('x-access-token');
                this.userService.setToken(authToken || '{}')
                console.log(`User ${email} authenticated with token ${authToken}`)
                
              }))
              
  }
}
