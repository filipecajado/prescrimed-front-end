import { HttpClient, HttpResponse } from "@angular/common/http";


import { lastValueFrom } from "rxjs";
import { Injectable } from "@angular/core";
import { ToastComponent } from "../../components/toaster/toast/toast.component";
import { PacienteEntity } from "../../domains/paciente";



const API_URL = 'http://localhost:9090';
@Injectable({
    providedIn: 'root'
  })
export class PacienteServiceMock{


    constructor(private http: HttpClient,
        private toastComponent: ToastComponent){}

    async findById(id: number): Promise<PacienteEntity> {
        try {
      const paciente = await lastValueFrom(this.http.get<PacienteEntity>(API_URL + `/pacientes/${id}`));
      return paciente;

    } catch (error) {
      console.error(error);
      throw new Error();
    }
    }

    async getAll(): Promise<Array<PacienteEntity>> {
       try{
            const pacientes: Array<PacienteEntity> = await lastValueFrom
            (this.http. get<Array<PacienteEntity>>(API_URL + '/pacientes'))
                if(pacientes){
                    return pacientes;
                }
       }catch (error) {
        console.error(error);
      }
      throw new Error();
    }


    async save(paciente: PacienteEntity): Promise<boolean> {
        try{
            const pacientes= await lastValueFrom(this.http.post(API_URL + '/pacientes', paciente,  { 'headers': { 'Content-Type': 'application/json' } }))
            if(pacientes){
                return true;
            }
        } catch (error){
            throw new Error();

        }
        return false
    }
    async update(paciente: PacienteEntity): Promise<boolean> {
        try {
            const pacientes = await lastValueFrom(this.http.put(API_URL + `/pacientes/${paciente.id}`, paciente, { 'headers': { 'Content-Type': 'application/json' } }));
            if (pacientes) {
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
            const success: HttpResponse<any> = await lastValueFrom(this.http.delete(API_URL + `/pacientes/${id}`, { observe: 'response' }));
            return success.status >= 200 && success.status < 300;
          } catch (error) {
            this.toastComponent.showApiError(error);
            console.log(error);
            throw error;
          }
        }
}
