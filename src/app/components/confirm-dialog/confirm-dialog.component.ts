import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.css'
})
export class ConfirmDialogComponent {
  @Input() title = "Are you sure?"
  @Input() message = "Do you really want to perform this action?"
  @Input() confirmButtonText = "Confirm"
  @Input() cancelButtonText  = "Cancel"
  @Output() onConfirm = new EventEmitter()
  @Output() onCancel = new EventEmitter()
}
