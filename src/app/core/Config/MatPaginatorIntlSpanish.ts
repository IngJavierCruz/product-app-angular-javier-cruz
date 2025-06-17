import { MatPaginatorIntl } from '@angular/material/paginator';

export function MatPaginatorIntlSpanish() : MatPaginatorIntl {
	const paginatorIntl = new MatPaginatorIntl();
	paginatorIntl.itemsPerPageLabel = 'Registros por pagina';
	paginatorIntl.nextPageLabel = 'Página siguiente';
	paginatorIntl.lastPageLabel = 'Última página';
	paginatorIntl.previousPageLabel = 'Página anterior';
	paginatorIntl.firstPageLabel = 'Primer página';

	paginatorIntl.getRangeLabel = function (
		page: number,
		pageSize: number,
		length: number
	) {
		if (length === 0 || pageSize === 0) {
			return '0 de ' + length + ' registros';
		}

		length = Math.max(length, 0);
		const startIndex = page * pageSize;
		const endIndex =
			startIndex < length
				? Math.min(startIndex + pageSize, length)
				: startIndex + pageSize;
		return startIndex + 1 + ' al ' + endIndex + ' de ' + length + ' registros';
	};

	return paginatorIntl;
}
