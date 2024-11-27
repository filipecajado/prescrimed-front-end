export interface ConsultaEntity{
    id?: any
    paciente_id?: number;
    medico_id?: number;
    data_consulta?: Date;
    motivo_consulta?: string;
    diagnostico?: string;
    prescricao?: string;
}
