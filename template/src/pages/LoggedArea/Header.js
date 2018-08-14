import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import Header from '../../containers/Header'

const enhance = connect(({ account: { token: username } }) => ({
  avatar: 'https://randomuser.me/api/portraits/thumb/men/12.jpg',
  username,
}))

const HeaderContainer = ({ avatar, username }) => (
  <Header
    avatar={avatar}
    username={username}
  />
)

HeaderContainer.propTypes = {
  avatar: PropTypes.string,
  username: PropTypes.string.isRequired,
}

HeaderContainer.defaultProps = {
  avatar: null,
}

export default enhance(HeaderContainer)
