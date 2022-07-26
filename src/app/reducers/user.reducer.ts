import { createFeature, createReducer, on } from '@ngrx/store';
import { EntityState, createEntityAdapter } from '@ngrx/entity';

import * as UserActions from '../actions';
import { User } from '../models';

export interface State extends EntityState<User> {
  error: unknown | null;
  loading: boolean;
  selectedId: string | null;
}

export const adapter = createEntityAdapter<User>();

export const initialState: State = adapter.getInitialState({
  error: null,
  loading: false,
  selectedId: null,
});

export const { name, reducer, selectUserState, selectLoading, selectError } =
  createFeature({
    name: 'user',
    reducer: createReducer(
      initialState,
      on(UserActions.loadAll, (state) => ({ ...state })),
      on(UserActions.load, (state, { id }) => ({
        ...state,
        selectedId: id,
      })),
      on(UserActions.create, (state, { user }) =>
        adapter.addOne(user, { ...state })
      ),
      on(UserActions.update, (state, { user }) =>
        adapter.updateOne(
          { id: user.id, changes: user },
          { ...state }
        )
      ),
      on(UserActions.remove, (state, { id }) =>
        adapter.removeOne(id, { ...state })
      ),
    ),
  });

export const { selectAll: selectUsers } = adapter.getSelectors(selectUserState);
