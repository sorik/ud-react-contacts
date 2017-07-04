import React, { Component } from 'react';

class ContactList extends Component {
  render() {
    const people = this.props.contacts;

    return <ol>
      {people.map(person => <li>{person.name}</li>)}
      </ol>;
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <ContactList contacts={[{ name: 'Tyler' }, { name: 'Sam' }] }/>
        <ContactList contacts={[{ name: 'Claire' }, { name: 'Joe' }] }/>
        <ContactList contacts={[{ name: 'Daniel' }, { name: 'Susan' }] }/>
      </div>
    );
  }
}

export default App;
