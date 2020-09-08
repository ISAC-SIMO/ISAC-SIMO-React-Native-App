import {createSelector} from 'reselect';

const selectAuth = (state) => state.auth;

export const selectCurrentUser = createSelector(
  [selectAuth],
  (auth) => auth.currentUser,
);

export const selectAuthenticationSkip = createSelector(
  [selectAuth],
  (auth) => auth.isSkipAuthentication,
);

export const selectLoading = createSelector(
  [selectAuth],
  (auth) => auth.loading,
);

export const selectErrors = createSelector([selectAuth], (auth) => auth.error);

export const selectRegisterSuccess = createSelector(
  [selectAuth],
  (auth) => auth.registerSuccess,
);

export const selectUserData = createSelector(
  [selectAuth],
  (auth) => auth.userData,
);
