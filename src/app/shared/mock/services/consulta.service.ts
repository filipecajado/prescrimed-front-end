import { HttpClient, HttpResponse } from "@angular/common/http";

import { lastValueFrom } from "rxjs";
import { Injectable } from "@angular/core";
import { ToastComponent } from "../../components/toaster/toast/toast.component";
import { ConsultaEntity } from "../../domains/consulta";



const API_URL = 'http://localhost:9090';
@Injectable({
    providedIn: 'root'
  })
export class ConsultaServiceMock{


    constructor(private http: HttpClient,
        private toastComponent: ToastComponent){}

    async findById(id: number): Promise<ConsultaEntity> {
        try {
      const consulta = await lastValueFrom(this.http.get<ConsultaEntity>(API_URL + `/consultas/${id}`));
      return consulta;

    } catch (error) {
      console.error(error);
      throw new Error();
    }
    }

    async getAll(): Promise<Array<ConsultaEntity>> {
       try{
            const consultas: Array<ConsultaEntity> = await lastValueFrom
            (this.http. get<Array<ConsultaEntity>>(API_URL + '/consultas'))
                if(consultas){
                    return consultas;
                }
       }catch (error) {
        console.error(error);
      }
      throw new Error();
    }


    async save(consulta: ConsultaEntity): Promise<boolean> {
        try{
            const consultas= await lastValueFrom(this.http.post(API_URL + '/consultas', consulta,  { 'headers': { 'Content-Type': 'application/json' } }))
            if(consultas){
                return true;
            }
        } catch (error){
            throw new Error();

        }
        return false
    }
    async update(consulta: ConsultaEntity): Promise<boolean> {
        try {
            const consultas = await lastValueFrom(this.http.put(API_URL + `/consultas/${consulta.id}`, consulta, { 'headers': { 'Content-Type': 'application/json' } }));
            if (consultas) {
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
            const success: HttpResponse<any> = await lastValueFrom(this.http.delete(API_URL + `/consultas/${id}`, { observe: 'response' }));
            return success.status >= 200 && success.status < 300;
          } catch (error) {
            this.toastComponent.showApiError(error);
            console.log(error);
            throw error;
          }
        }
}
