import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService) {}

  showSuccess(message: string = 'Operazione completata con successo!', title: string = 'Successo') {
    this.toastr.success(message, title, {
      toastClass: 'ngx-toastr custom-toast-success',
      timeOut: 3000,
      closeButton: true,
      progressBar: true,
      positionClass: 'toast-bottom-right'
    });
  }

  showError(message: string = 'Si è verificato un errore.', title: string = 'Errore') {
    this.toastr.error(message, title, {
      toastClass: 'ngx-toastr custom-toast-error',
      timeOut: 3000,
      closeButton: true,
      progressBar: true,
      positionClass: 'toast-bottom-right'
    });
    
  }

  
  showErrorMessage(message: string, title: string = 'Errore') {
    this.toastr.error(message, title, {
      toastClass: 'ngx-toastr custom-toast-error',
      timeOut: 3000,
      closeButton: true,
      progressBar: true,
      positionClass: 'toast-bottom-right'
    });
    
  }


   showInfo(message: string, title: string ) {
  this.toastr.info(message, title, {
    toastClass: 'ngx-toastr custom-toast-info',
    timeOut: 3000,
    closeButton: true,
    progressBar: true,
    positionClass: 'toast-bottom-right'
  });
}
}
