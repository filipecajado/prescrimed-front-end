import { AddressEntity } from "../address";

export interface ClientEntity{
    id?: number;
    fantasyName?: string
    corporateName?: string
    cnpj?: string;
    segment?: string;
    phone?: string;
    address?: AddressEntity;
    isActive?: boolean;
    stateRegistration?: string;
}