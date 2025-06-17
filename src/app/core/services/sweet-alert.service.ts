import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
	providedIn: 'root'
})
export class SweetAlertService {
	title = 'Exámen de Javier';
	primaryColor = '#005cbb';

	constructor() {
	}

	showError(message? : string) {
    Swal.fire({
      text: message || 'Error de servidor',
      position: 'center',
      icon: 'error',
      confirmButtonColor: this.primaryColor,
    });
  }

	async showDeleteConfirmationAlert({
		title = '¡Confirmación de eliminación! ',
		text = '¿Eliminar Registro?'
	} = {}) {
		const result = await Swal.fire({
			title,
			text,
			icon: 'warning',
			showCloseButton: true,
			showCancelButton: true,
			cancelButtonText: 'Cancelar',
			confirmButtonText: 'Aceptar',
			confirmButtonColor: this.primaryColor,
			reverseButtons: true
		});

		return result.isConfirmed;
	}

	async showActionConfirmationAlert({
		title = '¡Confirmación! ',
		text = '¿Esta seguro que desea realizar esta acción?'
	} = {}) {
		const result = await Swal.fire({
			title,
			text,
			icon: 'question',
			showCloseButton: true,
			showCancelButton: true,
			cancelButtonText: 'Cancelar',
			confirmButtonText: 'Aceptar',
			confirmButtonColor: this.primaryColor,
			reverseButtons: true
		});

		return result.isConfirmed;
	}
}
