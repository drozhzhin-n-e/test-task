import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { combineLatest, map, skip } from 'rxjs';

import * as UserActions from './actions';
import { User } from './models';
import { selectUsers, selectLoading } from './reducers';

import { ActionsSubject } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  vm$ = combineLatest([
    this.store.pipe(select(selectLoading)),
    this.store.pipe(select(selectUsers)),
  ]).pipe(map(([loading, users]) => ({ loading, users })));

  constructor(private store: Store, private actionListener$: ActionsSubject) {}

  ngOnInit() {
    this.store.dispatch(UserActions.loadAll());

    this.actionListener$.pipe(
      skip(1) // optional: skips initial logging done by ngrx
    ).subscribe((action) => console.info('ngrx action', action));
  }

  showCreateDialog(): void {
  	console.log("showCreateDialog()")
    this.store.dispatch(UserActions.showCreateDialog());
  }

  showEditDialog(user: User): void {
    this.store.dispatch(UserActions.showEditDialog({ user }));
  }

  showRemoveDialog(id: number): void {
    this.store.dispatch(UserActions.showRemoveDialog({ id }));
  }
}
