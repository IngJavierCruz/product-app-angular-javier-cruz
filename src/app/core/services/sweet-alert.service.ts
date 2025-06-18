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

	showInfo(text:string) {
    Swal.fire({
      text: text,
      icon: 'info',
      position: 'center',
      showConfirmButton: true,
      confirmButtonColor: this.primaryColor,
    });
  }

  showSmallInfo(text: string) {
    Swal.mixin({
      toast: true,
      position: 'top-right',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    }).fire({
      icon: 'info',
      text: text,
      confirmButtonColor: this.primaryColor,
    });
  }

  showSuccess(text:string, timer = 1500) {
    Swal.fire({
      text: text,
      position: 'center',
      icon: 'success',
      showConfirmButton: true,
      confirmButtonColor: this.primaryColor,
      timer
    });
  }

  showSmallSuccess(text: string){
    Swal.mixin({
      toast: true,
      position: 'top-right',
      showConfirmButton: false,
      timer: 1800,
      timerProgressBar: true,
    }).fire({
      icon: 'success',
      text: text,
      confirmButtonColor: this.primaryColor,
    });
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

  showAlertWarning(text: string) {
    Swal.fire({
      title: "Advertencia",
      text: text,
      position: "center",
      icon: "warning",
      showConfirmButton: true,
			confirmButtonColor: this.primaryColor,
      timer: 1750,
    });
  }
}
