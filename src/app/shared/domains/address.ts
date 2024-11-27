export class AddressEntity {
    streetAddress: string;
    number: string;
    complement: string;
    city: string;
    district: string;
    uf: string;
    cep: string;

    constructor(props?: {streetAddress?:string, number?:string, complement?:string, city?:string, district?:string, uf?:string, cep?:string}) {
        this.streetAddress = props?.streetAddress || "";
        this.number = props?.number || "";
        this.complement = props?.complement || "";
        this.city = props?.city || "";
        this.district = props?.district || "";
        this.uf = props?.uf || "";
        this.cep = props?.cep || "";
    }
}