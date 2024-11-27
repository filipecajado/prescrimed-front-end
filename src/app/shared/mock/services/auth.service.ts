import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, map, tap} from 'rxjs/operators'
import { UserServiceMock } from './user.service';
import { Observable, lastValueFrom, of } from 'rxjs';
import { UserEntity } from '../../domains/user/user';


const API_URL = 'http://localhost:9090';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceMock {

  constructor(
        private http: HttpClient,
      ) { }

  // authenticate(email: string, password: string): Observable<boolean> {
  //   return this.http.get<Array<UserEntity>>(API_URL + `/users?email=${email}&password=${password}`).pipe(
  //     map(userArray => {
  //       const user = userArray[0];
  //       console.log(user)
  //       if (user) {
  //         localStorage.setItem("CACHE_TOKEN", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJlbWFpbCI6IjEiLCJwYXNzd29yZCI6IjEiLCJjb25maXJtUGFzc3dvcmQiOiIxIn0.MDkwrbunmSZHg4nowu11u9kEgBHfcj4R_4xaS7Q9Zh4");
  //         localStorage.setItem("CACHE_USER", JSON.stringify(user));
  //         return true;
  //       } else {
  //         return false;
  //       }
  //     }), catchError(error => {
  //       console.error(error);
  //       return of(false);
  //     })
  //     );
  // }

  authenticate(email: string, password: string): Observable<boolean> {
    return this.http
      .post(
        API_URL + '/login',
        { username: email, senha: password },
        { observe: 'response' } // Observa a resposta completa
      )
      .pipe(
        tap(res => {
          // Opcional: você pode fazer algo com a resposta, como armazenar tokens
          console.log('Login bem-sucedido:', res);
        }),
        map(() => true), // Mapeia para `true` no caso de sucesso
        catchError(err => {
          // Opcional: trate o erro, exiba logs ou mensagens
          console.error('Erro no login:', err);
          return of(false); // Retorna `false` em caso de erro
        })
      );
  }
}
