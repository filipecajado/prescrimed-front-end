import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, lastValueFrom, Observable } from 'rxjs';
import { UserEntity } from '../../domains/user/user';
import { ToastComponent } from '../../components/toaster/toast/toast.component';
import { TokenService } from '../../utils/token/token.service';
import jwt_decode from 'jwt-decode';

const API_URL = 'http://localhost:3000';

@Injectable({
    providedIn: 'root'
})
export class UserServiceMock {

    private userSubject = new BehaviorSubject<UserEntity | null>(null);
    private userEmail!: string | undefined;

    constructor(private http: HttpClient,
        private toastComponent: ToastComponent,
        private tokenService: TokenService) {

        this.tokenService.hasToken() &&
            this.decodeAndNotify();
    }
    getAll(): Promise<UserEntity[]> {
        throw new Error('Method not implemented.');
    }

    async save(user: UserEntity): Promise<boolean> {
        try {
            const users = await lastValueFrom(this.http.post(API_URL + '/users', user, { 'headers': { 'Content-Type': 'application/json' } }))
            if (users) {
                return true;
            }
        } catch (error) {
            throw new Error();

        }
        return false
    }

    setToken(token: string) {
        this.tokenService.setToken(token);
        this.decodeAndNotify();
    }


    private decodeAndNotify() {
        const token = this.tokenService.getToken();
        const user = jwt_decode(token) as UserEntity;
        console.log(token)
        this.userEmail = user.email
        this.userSubject.next(user);

    }

    getEmail() {
        return this.userEmail;
    }

}


