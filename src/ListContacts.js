import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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

  clearQuery = () => {
    this.setState({query: ''})
  }

  showingContacts() {
    let filteredContacts;
    const { contacts } = this.props;
    const { query } = this.state;

    if(query) {
      const matcher = new RegExp(escapeRegExp(query), 'i');
      filteredContacts = contacts.filter((contact) => matcher.test(contact.name));
    } else {
      filteredContacts = contacts;
    }

    return filteredContacts.sort(sortBy('name'));
  }

  render() {
    const { contacts, onDeleteContact, onNavigate } = this.props;
    const { query } = this.state
    let showingContacts = this.showingContacts();

    return (
      <div className='list-contacts'>
        <div className='list-contacts-top'>
         <input
          className='search-contacts'
          type='text'
          placeholder='search contacts'
          value={query}
          onChange={(event) => this.updateQuery(event.target.value)}
        />
        <Link
          className='create-contact'
          to='/create'
          onClick={onNavigate}
        >Create Contact</Link>
        </div>
        {showingContacts.length !== contacts.length && (
          <div className='showing-contacts'>
            <span>Now showing {showingContacts.length} of {contacts.length} total</span>
            <button onClick={this.clearQuery}>Show All</button>
          </div>
        )}
        <ol className='contact-list'>
          {showingContacts.map(contact => (
            <li key={contact.id} className='contact-list-item'>
              <div className='contact-avatar' style={{backgroundImage: `url(${contact.avatarURL})`}}></div>
              <div className='contact-details'>
                <p>{contact.name}</p>
                <p>{contact.email}</p>
              </div>
              <button onClick={() => onDeleteContact(contact)} className='contact-remove'>
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
