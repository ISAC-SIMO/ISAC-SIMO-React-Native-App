//app selectors
import {createSelector} from 'reselect';

const selectApp = state => state.app;

export const selectLoading = createSelector([selectApp], app => app.loading);

export const selectIsDarkTheme = createSelector(
  [selectApp],
  app => app.isDarkTheme,
);

export const selectIsFirstLoad = createSelector(
  [selectApp],
  app => app.isFirstLoad,
);

export const selectToken = createSelector([selectApp], app => app.token);
