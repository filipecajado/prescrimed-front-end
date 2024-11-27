import { HttpClient, HttpResponse } from "@angular/common/http";

import { MaterialServiceInterface } from "../../interfaces/material-service.interface";
import { lastValueFrom } from "rxjs";
import { Injectable } from "@angular/core";
import { ToastComponent } from "../../components/toaster/toast/toast.component";
import { MedicoEntity } from "../../domains/medico/medico";


const API_URL = 'http://localhost:3000';
@Injectable({
    providedIn: 'root'
  })
export class PacienteServiceMock{


    constructor(private http: HttpClient,
        private toastComponent: ToastComponent){}

    async findById(id: number): Promise<MedicoEntity> {
        try {
      const material = await lastValueFrom(this.http.get<MedicoEntity>(API_URL + `/pacientes/${id}`));
      return material;

    } catch (error) {
      console.error(error);
      throw new Error();
    }
    }

    async getAll(): Promise<Array<MedicoEntity>> {
       try{
            const materials: Array<MedicoEntity> = await lastValueFrom
            (this.http. get<Array<MedicoEntity>>(API_URL + '/pacientes'))
                if(materials){
                    return materials;
                }
       }catch (error) {
        console.error(error);
      }
      throw new Error();
    }


    async save(material: MedicoEntity): Promise<boolean> {
        try{
            const materials= await lastValueFrom(this.http.post(API_URL + '/pacientes', material,  { 'headers': { 'Content-Type': 'application/json' } }))
            if(materials){
                return true;
            }
        } catch (error){
            throw new Error();

        }
        return false
    }
    async update(material: MedicoEntity): Promise<boolean> {
        try {
            const materials = await lastValueFrom(this.http.put(API_URL + `/pacientes/${material.id}`, material, { 'headers': { 'Content-Type': 'application/json' } }));
            if (materials) {
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
