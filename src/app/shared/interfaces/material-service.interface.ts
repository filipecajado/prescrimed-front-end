import { MaterialEntity } from "../domains/material/material";

export interface MaterialServiceInterface{
    getAll(): Promise<Array<MaterialEntity>>;
    save(material: MaterialEntity): Promise<boolean>;
    update(material: MaterialEntity): Promise<boolean>;
    delete(id: number): Promise<boolean>;
    findById(id: number): Promise<MaterialEntity>;
}