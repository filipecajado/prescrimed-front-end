export interface ExameEntity{
    id?: any
    paciente_id?: number;
    medico_id?: number;
    tipo_exame?: string;
    resultado?: string;
    observacoes?: string;
    prescricao?: string;
    data_exame?: Date;
}
