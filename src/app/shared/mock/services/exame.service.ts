import { HttpClient, HttpResponse } from "@angular/common/http";

import { lastValueFrom } from "rxjs";
import { Injectable } from "@angular/core";
import { ToastComponent } from "../../components/toaster/toast/toast.component";
import { ExameEntity } from "../../domains/exame";



const API_URL = 'http://localhost:9090';
@Injectable({
    providedIn: 'root'
  })
export class ExameServiceMock{


    constructor(private http: HttpClient,
        private toastComponent: ToastComponent){}

    async findById(id: number): Promise<ExameEntity> {
        try {
      const exame = await lastValueFrom(this.http.get<ExameEntity>(API_URL + `/exames/${id}`));
      return exame;

    } catch (error) {
      console.error(error);
      throw new Error();
    }
    }

    async getAll(): Promise<Array<ExameEntity>> {
       try{
            const exames: Array<ExameEntity> = await lastValueFrom
            (this.http. get<Array<ExameEntity>>(API_URL + '/exames'))
                if(exames){
                    return exames;
                }
       }catch (error) {
        console.error(error);
      }
      throw new Error();
    }


    async save(exame: ExameEntity): Promise<boolean> {
        try{
            const exames= await lastValueFrom(this.http.post(API_URL + '/exames', exame,  { 'headers': { 'Content-Type': 'application/json' } }))
            if(exames){
                return true;
            }
        } catch (error){
            throw new Error();

        }
        return false
    }
    async update(exame: ExameEntity): Promise<boolean> {
        try {
            const exames = await lastValueFrom(this.http.put(API_URL + `/exames/${exame.id}`, exame, { 'headers': { 'Content-Type': 'application/json' } }));
            if (exames) {
              return true;
            }
          } catch (error) {
            this.toastComponent.showApiError(error);
            console.error(error);
            throw new Error();
          }
          return false;
    }
    async delete(id: number): Promise<boolean> {
        try {
            const success: HttpResponse<any> = await lastValueFrom(this.http.delete(API_URL + `/exames/${id}`, { observe: 'response' }));
            return success.status >= 200 && success.status < 300;
          } catch (error) {
            this.toastComponent.showApiError(error);
            console.log(error);
            throw error;
          }
        }
}
