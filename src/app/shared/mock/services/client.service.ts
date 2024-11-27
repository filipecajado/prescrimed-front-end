import { HttpClient, HttpResponse } from "@angular/common/http";
import { MaterialEntity } from "../../domains/material/material";
import { MaterialServiceInterface } from "../../interfaces/material-service.interface";
import { lastValueFrom } from "rxjs";
import { Injectable } from "@angular/core";
import { ToastComponent } from "../../components/toaster/toast/toast.component";
import { ClientServiceInterface } from "../../interfaces/client-service.interface";
import { ClientEntity } from "../../domains/client/client";


const API_URL = 'http://localhost:3000';
@Injectable({
    providedIn: 'root'
  })
export class ClientServiceMock implements ClientServiceInterface{


    constructor(private http: HttpClient,
        private toastComponent: ToastComponent){}

    async findById(id: number): Promise<ClientEntity> {
        try {
      const client = await lastValueFrom(this.http.get<MaterialEntity>(API_URL + `/clients/${id}`));
      return client;

    } catch (error) {
      console.error(error);
      throw new Error();
    }
    }

    async getAll(): Promise<Array<ClientEntity>> {
       try{
            const clients: Array<ClientEntity> = await lastValueFrom
            (this.http. get<Array<ClientEntity>>(API_URL + '/clients'))
                if(clients){
                    return clients;
                }
       }catch (error) {
        console.error(error);
      }
      throw new Error();
    }

    
    async save(client: ClientEntity): Promise<boolean> {
        try{
            const clients = await lastValueFrom(this.http.post(API_URL + '/clients', client,  { 'headers': { 'Content-Type': 'application/json' } }))
            if(clients){
                return true;
            }
        } catch (error){
            throw new Error();
            
        }
        return false
    }
    async update(client: ClientEntity): Promise<boolean> {
        try {
            const clients  = await lastValueFrom(this.http.put(API_URL + `/clients/${client.id}`, client, { 'headers': { 'Content-Type': 'application/json' } }));
            if (clients) {
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
            const success: HttpResponse<any> = await lastValueFrom(this.http.delete(API_URL + `/clients/${id}`, { observe: 'response' }));
            return success.status >= 200 && success.status < 300;
          } catch (error) {
            this.toastComponent.showApiError(error);
            console.log(error);
            throw error;
          }
        }

}