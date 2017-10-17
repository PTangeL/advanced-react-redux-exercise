import React from 'react'
import { connect } from 'react-redux'
import * as userActions from '../actions/users'
import * as api from '../api'
import * as uiActions from '../actions/ui'
import * as messageActions from '../actions/message'
import Users from '../components/User/Users'

class UsersContainer extends React.Component {
  componentDidMount() {
    this.fetch({ query: 'javascript' })
  }

  fetchNextPage = () => {
    this.fetch({ nextUrl: this.props.nextUrl })
  }

  fetch = params => {
    api.fetchUsers(params).then( ({ users, nextUrl }) => {
      this.props.receiveUsers(users, nextUrl)
    }).catch(error => {
      console.log('error', error)
    })
  }

  sendMessageTo = user => {
    this.props.setMessageTo(user)
    this.props.setIsSideMenuOpen(true)
  }

  render() {
    return <Users
      fetchNextPage={ this.fetchNextPage }
      users={ this.props.users }
      sendMessageTo={ this.sendMessageTo }
    />
  }
}

UsersContainer.propTypes = {
  fetchUsers: React.PropTypes.func,
  users: React.PropTypes.array,
  nextUrl: React.PropTypes.string,
  setIsSideMenuOpen: React.PropTypes.func,
  setMessageTo: React.PropTypes.func
}

const mapStateToProps = state => ({
  users: state.users.items,
  nextUrl: state.users.nextUrl,
})

const mapDispatchToProps = ({
  fetchUsers: userActions.fetchUsers,
  receiveUsers: userActions.receiveUsers,
  setIsSideMenuOpen: uiActions.setIsSideMenuOpen,
  setMessageTo: messageActions.setMessageTo
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersContainer)
