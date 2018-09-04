import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import { Route, Redirect, withRouter } from 'react-router-dom'

import { connect } from 'react-redux'

import { compose } from 'ramda'

import Account from './Account'
import LoggedArea from './LoggedArea'

const enhance = compose(
  withRouter,
  connect(({ account: { token } }) => ({ token }))
)

function Root ({ location, token }) {
  const { pathname: path } = location
  return (
    <Fragment>
      {!token && !path.startsWith('/account') ? (
        <Redirect to="/account/login" />
      ) : (
        <Route path="/account" component={Account} />
      )}
      {token && path.startsWith('/account/login') && <Redirect to="/" />}
      {token && <LoggedArea />}
    </Fragment>
  )
}

Root.propTypes = {
  location: PropTypes.shape({
    pathnae: PropTypes.string,
  }),
  token: PropTypes.string,
}

Root.defaultProps = {
  location: {},
  token: null,
}

export default enhance(Root)
