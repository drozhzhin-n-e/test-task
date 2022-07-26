import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import * as UserActions from '../../actions';
import { User } from '../../models';
import { selectLoading } from '../../reducers';

export type Mode = "create" | "edit";

@Component({
  selector: 'app-user-form-dialog',
  templateUrl: './user-form-dialog.component.html',
  styleUrls: ['./user-form-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFormDialogComponent {
  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*')]],
    surname: ['', [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*')]],
    gender: ['', Validators.required],
    personalNumber: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern('[0-9]*')]],
    mobile: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern('[0-9]*')]],
    legalAddress: ['', Validators.required],
    country: ['', Validators.required],
    city: ['', Validators.required],
    address: ['', Validators.required],
  });
  user: User;
  mode?: Mode;

  constructor(
    private fb: UntypedFormBuilder, 
    private store: Store,
    @Inject(MAT_DIALOG_DATA) private data: { 
      user: User,
      mode: Mode
    }) {
    this.user = this.data.user;
    this.mode = this.data.mode;
  }

  ngOnInit(): void {
    if (this.mode === 'edit') {
      this.form.setValue({
        name: this.user.name,
        surname: this.user.surname,
        gender: this.user.gender,
        personalNumber: this.user.personalNumber,
        mobile: this.user.mobile,
        legalAddress: this.user.legalAddress,
        country: this.user.country,
        city: this.user.city,
        address: this.user.address,
      });
    }
  }

  save(): void {
    if (this.mode === 'create') {
      this.create();
      this.store.dispatch(UserActions.closeCreateDialog());
    }

    if (this.mode === 'edit') {
      this.edit();
      this.store.dispatch(UserActions.closeEditDialog());
    }
  }

  create() {
    const user: User = {
      id: Math.floor(Math.random() * (999999999999)) + 1,
      ...this.form.value
    };
    this.store.dispatch(UserActions.create({ user }));
  }

  edit() {
    const user: User = {
      id: this.user.id,
      ...this.form.value
    };
    this.store.dispatch(UserActions.update({ user }));
  }
}