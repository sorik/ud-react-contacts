import React, { Component } from 'react';
import PropTypes from 'prop-types';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';

class ListContacts extends Component {
  static propTypes ={
    contacts: PropTypes.array.isRequired,
    onDeleteContact: PropTypes.func.isRequired
  }

  state = {
    query: ''
  }

  updateQuery = (query) => {
    this.setState({query: query.trim()})
  }

  showingContacts() {
    let contacts;

    if(this.state.query) {
      const matcher = new RegExp(escapeRegExp(this.state.query), 'i');
      contacts = this.props.contacts.filter((contact) => matcher.test(contact.name));
    } else {
      contacts =  this.props.contacts;
    }

    return contacts.sort(sortBy('name'));
  }

  render() {
    return (
      <div className='list-contacts'>
        <div className='list-contacts-top'>
         <input
          className='search-contacts'
          type='text'
          placeholder='search contacts'
          value={this.state.value}
          onChange={(event) => this.updateQuery(event.target.value)}
        />
        </div>
        <ol className='contact-list'>
          {this.showingContacts().map(contact => (
            <li key={contact.id} className='contact-list-item'>
              <div className='contact-avatar' style={{backgroundImage: `url(${contact.avatarURL})`}}></div>
              <div className='contact-details'>
                <p>{contact.name}</p>
                <p>{contact.email}</p>
              </div>
              <button onClick={() => this.props.onDeleteContact(contact)} className='contact-remove'>
                Remove
              </button>
            </li>
          ))}
        </ol>
      </div>
    )
  }
}

export default ListContacts;
