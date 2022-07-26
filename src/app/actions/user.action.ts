import { createAction, props } from '@ngrx/store';

import { User } from '../models';

export const loadAll = createAction(
  '[User] Load All'
);

export const load = createAction('[User] Load', props<{ id: string }>());

export const create = createAction(
  '[User] Create',
  props<{ user: User }>()
);

export const update = createAction(
  '[User] Update',
  props<{ user: User }>()
);

export const remove = createAction(
  '[User] Remove',
  props<{ id: string }>()
);

export const showCreateDialog = createAction('[User] Show Create Dialog');
export const closeCreateDialog = createAction('[User] Close Create Dialog');

export const showEditDialog = createAction(
  '[User] Show Edit Dialog',
  props<{ user: User }>()
);
export const closeEditDialog = createAction('[User] Close Edit Dialog');

export const showRemoveDialog = createAction(
  '[User] Show Remove Dialog',
  props<{ id: number }>()
);
export const closeRemoveDialog = createAction('[User] Close Remove Dialog');