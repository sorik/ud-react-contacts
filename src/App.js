import React, { Component } from 'react'
import ListContacts from './ListContacts'
import * as ContactsAPI from './utils/ContactsAPI'

class App extends Component {
  state = {
    contacts: []
  }

  removeContact = (contact) => {
    this.setState(state => ({
      contacts: state.contacts.filter(c => c.id !== contact.id)
    }))
  }

  componentDidMount() {
      ContactsAPI.getAll().then((contacts) => {
        this.setState({ contacts })
      })
  }

  render() {
    return <ListContacts onDeleteContact={this.removeContact} contacts={this.state.contacts} />
  }
}
export default App
