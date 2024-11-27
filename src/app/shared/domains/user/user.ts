export class UserEntity{
    id?: number
    email?: string;
    password?: string;
    confirmPassword?: string;

    constructor(email?: string, password?: string, 
        confirmPassword?: string ){
        this.email = email || '';
        this.password = password || '';
        this.confirmPassword = confirmPassword || '';
    }
}