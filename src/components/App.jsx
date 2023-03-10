import React from 'react';
import { nanoid } from 'nanoid';
import { ContactList } from './ContactList/ContactList';
import { Form } from './Form/Form';
import { Filter } from './Filter/Filter';
import styles from "./App.module.css"

export class App extends React.Component{
  state = {
    contacts: [
      {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
    filter: ''
  }

  handleChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value })
  }

  formSubmitHandler = data => {
    if (this.isDublicate(data.name)) {
      return alert(`${data.name} is already in contacts`);
    }
    this.setState(prevState => {
      const newContact = {
        id: nanoid(),
        name: data.name,
        number: data.number
      }

      return { contacts: [newContact, ...prevState.contacts] };
    })
  }

  isDublicate = (name) => {
    const normalizedName = name.toLowerCase();
    const { contacts } = this.state;
    const result = contacts.find(({ name }) => {
      return name.toLowerCase()===normalizedName;
    })
    return Boolean(result);
  }

  getFilteredContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    const result = contacts.filter(({ name }) => {
      return (name.toLowerCase().includes(normalizedFilter))
    })
    return result;
  }

  removeContact = id => {
    this.setState(prevState => {
      const newContacts = prevState.contacts.filter(contact => contact.id !== id);
      return { contacts: newContacts };
    })
  }

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const contacts = this.getFilteredContacts();
    return <div className={styles.app}>
      <h1>Phonebook</h1>
      <Form
        onSubmit={this.formSubmitHandler}
      />
      <h2>Contacts:</h2>
      <Filter handleInput={this.handleChange}/>
      <ContactList
        contacts={contacts}
        removeContact={this.removeContact}
      />
    </div>;
  }
}