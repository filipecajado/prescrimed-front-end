import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
@Injectable({
  providedIn: 'root'
})
export class CustomPaginatorIntl extends MatPaginatorIntl {
    override itemsPerPageLabel = 'Itens por página';
    override nextPageLabel = 'Próxima página';
    override previousPageLabel = 'Página anterior';
    override firstPageLabel = 'Primeira página';
    override lastPageLabel = 'Última página';
  
    override getRangeLabel = (page: number, pageSize: number, length: number) => {
      const startIndex = page * pageSize + 1;
      const endIndex = (page + 1) * pageSize;
      return `${startIndex} - ${endIndex > length ? length : endIndex} de ${length}`;
    }
}