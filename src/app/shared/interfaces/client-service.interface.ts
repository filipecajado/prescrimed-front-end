import { ClientEntity } from "../domains/client/client";

export interface ClientServiceInterface{
    getAll(): Promise<Array<ClientEntity>>;
    save(material: ClientEntity): Promise<boolean>;
    update(material: ClientEntity): Promise<boolean>;
    delete(id: number): Promise<boolean>;
    findById(id: number): Promise<ClientEntity>;
}