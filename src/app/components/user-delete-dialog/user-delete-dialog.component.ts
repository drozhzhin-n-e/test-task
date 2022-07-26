import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';

import * as UserActions from '../../actions';
import { selectLoading } from '../../reducers';

@Component({
  selector: 'app-user-delete-dialog',
  templateUrl: './user-delete-dialog.component.html',
  styleUrls: ['./user-delete-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDeleteDialogComponent {
  loading$ = this.store.pipe(select(selectLoading));
  id: string;

  constructor(
    private store: Store,
    @Inject(MAT_DIALOG_DATA) private data: { id: string }
  ) {
    this.id = this.data.id;
  }

  remove(): void {
    this.store.dispatch(UserActions.remove({ id: this.id }));
    this.store.dispatch(UserActions.closeRemoveDialog());
  }
}
