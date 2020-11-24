import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface DialogData {
  id: number;
  nome: string;
  nota: number;
}

@Component({
  selector: 'app-avaliacao',
  templateUrl: './avaliacao.component.html',
  styleUrls: ['./avaliacao.component.scss'],
})
export class AvaliacaoComponent implements OnInit {
  form: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<AvaliacaoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder
  ) {
    this.form = fb.group({
      desc: [''],
      nota: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  getTotal() {
    return new Array(this.data.nota);
  }

  onClose() {
    this.dialogRef.close();
  }

  onConfirm() {}
}
