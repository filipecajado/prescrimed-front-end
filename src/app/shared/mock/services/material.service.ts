import { HttpClient, HttpResponse } from "@angular/common/http";
import { MaterialEntity } from "../../domains/material/material";
import { MaterialServiceInterface } from "../../interfaces/material-service.interface";
import { lastValueFrom } from "rxjs";
import { Injectable } from "@angular/core";
import { ToastComponent } from "../../components/toaster/toast/toast.component";


const API_URL = 'http://localhost:3000';
@Injectable({
    providedIn: 'root'
  })
export class MaterialServiceMock implements MaterialServiceInterface{


    constructor(private http: HttpClient,
        private toastComponent: ToastComponent){}

    async findById(id: number): Promise<MaterialEntity> {
        try {
      const material = await lastValueFrom(this.http.get<MaterialEntity>(API_URL + `/insumos/${id}`));
      return material;

    } catch (error) {
      console.error(error);
      throw new Error();
    }
    }

    async getAll(): Promise<Array<MaterialEntity>> {
       try{
            const materials: Array<MaterialEntity> = await lastValueFrom
            (this.http. get<Array<MaterialEntity>>(API_URL + '/insumos'))
                if(materials){
                    return materials;
                }
       }catch (error) {
        console.error(error);
      }
      throw new Error();
    }

    
    async save(material: MaterialEntity): Promise<boolean> {
        try{
            const materials= await lastValueFrom(this.http.post(API_URL + '/insumos', material,  { 'headers': { 'Content-Type': 'application/json' } }))
            if(materials){
                return true;
            }
        } catch (error){
            throw new Error();
            
        }
        return false
    }
    async update(material: MaterialEntity): Promise<boolean> {
        try {
            const materials = await lastValueFrom(this.http.put(API_URL + `/insumos/${material.id}`, material, { 'headers': { 'Content-Type': 'application/json' } }));
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
            const success: HttpResponse<any> = await lastValueFrom(this.http.delete(API_URL + `/insumos/${id}`, { observe: 'response' }));
            return success.status >= 200 && success.status < 300;
          } catch (error) {
            this.toastComponent.showApiError(error);
            console.log(error);
            throw error;
          }
        }
    

}