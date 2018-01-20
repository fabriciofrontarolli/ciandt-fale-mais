import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-dddselector',
  templateUrl: './dddselector.component.html',
  styleUrls: ['./dddselector.component.scss']
})
export class DddselectorComponent implements OnInit {

  constructor(private matDialogRef: MatDialogRef<DddselectorComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  selectCode(code) {
    this.matDialogRef.close(code.ddd);
  }
}
