import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import ActivityIndicator from '../../global/components/activity-indicator';
import {
  selectLoading,
  selectIsDarkTheme,
  selectToken,
} from '../../redux/app/app.selectors';
import {selectAuthenticationSkip} from '../../redux/auth/auth.selectors';
import * as mapDispatchToProps from '../../redux/app/app.actions';

import {AppAuthContainer, AppMainContainer} from '../../';
import {api} from '../../api';

const Initial = (props) => {
  const {setLoading, loading, token, skip} = props;
  useEffect(() => {
    // initial load of assets
    // after completion of load set loading to false
    setLoading(false);
  }, [setLoading]);

  useEffect(() => {
    if (token === 'null') {
      api.defaults.headers.common.Authorization = '';
    } else {
      api.defaults.headers.common.Authorization = 'Bearer ' + token;
    }
  }, [token]);

  if (loading) {
    return <ActivityIndicator />;
  }
  if (token) {
    // remove always true logic after AppAuthContainer screens are setup
    return <AppMainContainer />;
  }
  return <AppAuthContainer />;
};

const mapStateToProps = createStructuredSelector({
  loading: selectLoading,
  isDarkTheme: selectIsDarkTheme,
  token: selectToken,
  skip: selectAuthenticationSkip,
});

export default connect(mapStateToProps, mapDispatchToProps)(Initial);
