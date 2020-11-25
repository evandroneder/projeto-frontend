import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

interface DialogData {
  id: number;
  nome: string;
  nota: number;
}

@Component({
  selector: 'app-contratar',
  templateUrl: './contratar.component.html',
  styleUrls: ['./contratar.component.scss'],
})
export class ContratarComponent implements OnInit {
  form: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<ContratarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.form = fb.group({ desc: ['', Validators.required] });
  }

  ngOnInit(): void {}

  getTotal() {
    return new Array(this.data.nota);
  }

  onClose() {
    this.dialogRef.close();
  }

  onConfirm() {
    this.router.navigate(['perfil']);
    this.onClose();
  }
}
