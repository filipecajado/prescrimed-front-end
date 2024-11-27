import { HttpClient, HttpResponse } from "@angular/common/http";


import { lastValueFrom } from "rxjs";
import { Injectable } from "@angular/core";
import { ToastComponent } from "../../components/toaster/toast/toast.component";
import { MedicoEntity } from "../../domains/medico/medico";


const API_URL = 'http://localhost:9090';
@Injectable({
    providedIn: 'root'
  })
export class MedicoServiceMock{


    constructor(private http: HttpClient,
        private toastComponent: ToastComponent){}

    async findById(id: number): Promise<MedicoEntity> {
        try {
      const medico = await lastValueFrom(this.http.get<MedicoEntity>(API_URL + `/medicos/${id}`));
      // const medico = await lastValueFrom(this.http.get<MedicoEntity>(API_URL + `/medicos?id=${id}`));
      return medico;

    } catch (error) {
      console.error(error);
      throw new Error();
    }
    }

    async getAll(): Promise<Array<MedicoEntity>> {
       try{
            const medicos: Array<MedicoEntity> = await lastValueFrom
            (this.http. get<Array<MedicoEntity>>(API_URL + '/medicos'))
                if(medicos){
                    return medicos;
                }
       }catch (error) {
        console.error(error);
      }
      throw new Error();
    }


    async save(medico: MedicoEntity): Promise<boolean> {
        try{
            const medicos= await lastValueFrom(this.http.post(API_URL + '/medicos', medico,  { 'headers': { 'Content-Type': 'application/json' } }))
            if(medicos){
                return true;
            }
        } catch (error){
            throw new Error();

        }
        return false
    }
    async update(medico: MedicoEntity): Promise<boolean> {
        try {
            const medicos = await lastValueFrom(this.http.put(API_URL + `/medicos/${medico.id}`, medico, { 'headers': { 'Content-Type': 'application/json' } }));
            if (medicos) {
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
            const success: HttpResponse<any> = await lastValueFrom(this.http.delete(API_URL + `/medicos/${id}`, { observe: 'response' }));
            return success.status >= 200 && success.status < 300;
          } catch (error) {
            this.toastComponent.showApiError(error);
            console.log(error);
            throw error;
          }
        }
}
