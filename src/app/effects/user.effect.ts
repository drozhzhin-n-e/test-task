import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, tap, concatMap, switchMap, catchError } from 'rxjs/operators';

import * as UserActions from '../actions';
import {
  UserDeleteDialogComponent,
  UserFormDialogComponent,
} from '../components';


@Injectable()
export class UserEffects {
  userFormDialogRef?: MatDialogRef<UserFormDialogComponent>;
  removeDialogRef?: MatDialogRef<UserDeleteDialogComponent>;

  showCreateDialog$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.showCreateDialog),
        tap(() => {
          this.userFormDialogRef = this.dialog.open(UserFormDialogComponent, {
            data: { 
              mode: 'create' 
            },
          });
        })
      ),
    { dispatch: false }
  );

  hideCreateDialog$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.closeCreateDialog),
        tap(() => {
          this.userFormDialogRef?.close();
        })
      ),
    { dispatch: false }
  );

  showEditDialog$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.showEditDialog),
        tap(({ user }) => {
          this.userFormDialogRef = this.dialog.open(UserFormDialogComponent, {
            data: { 
              user,
              mode: 'edit' 
            },
          });
        })
      ),
    { dispatch: false }
  );

  hideEditDialog$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.closeEditDialog),
        tap(() => {
          this.userFormDialogRef?.close();
        })
      ),
    { dispatch: false }
  );

  showRemoveDialog$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.showRemoveDialog),
        tap(({ id }) => {
          this.removeDialogRef = this.dialog.open(UserDeleteDialogComponent, {
            data: { id },
          });
        })
      ),
    { dispatch: false }
  );

  hideRemoveDialog$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.closeRemoveDialog),
        tap(() => {
          this.removeDialogRef?.close();
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private dialog: MatDialog
  ) {}
}
