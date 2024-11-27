export class MaterialEntity{
    id?: number
    name?: string;
    type?: string;
    description?: string;
    unit?: number;
    priceCost?: number;
    priceExecution?: number;
    quantity?: number;
    provider?: string;
    providerId?: number;

    constructor(name?: string, type?: string, 
                description?: string, unit?: number,
                 priceCost?: number, priceExecution?: number,
                 quantity?: number, provider?: string ,
                 providerId?: number ){
        this.name = name || '';
        this.type = type || '';
        this.description = description || '';
        this.unit = unit || undefined;
        this.priceCost = priceCost || undefined;
        this.priceExecution = priceExecution || undefined;
        this.quantity = quantity || undefined;
        this.provider = provider || '';
        
    }
}