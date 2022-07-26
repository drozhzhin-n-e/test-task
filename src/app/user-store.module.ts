import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { name, reducer } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './effects';

@NgModule({
  imports: [
    StoreModule.forRoot({user: reducer}),
    EffectsModule.forRoot([UserEffects])
  ],
})
export class UserStoreModule {}
