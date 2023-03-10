import React from 'react';
import styles from "./Form.module.css"

export class Form extends React.Component {
    state = {
        name: '',
        number: ''
    }

    handleChange = e => {
        const { name, value } = e.currentTarget;
        this.setState({[name]: value})
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.onSubmit(this.state);
        this.reset();
    }

    reset = () => {
        this.setState({name: '', number:''})
    }
    
    render() {
        return <form className={styles.form} onSubmit={this.handleSubmit}>
            <label className={styles.label}>Name
                <input
                    type="text"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleChange}
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    required
                />
            </label>
            <label className={styles.label}>Number
                <input
                    type="tel"
                    name="number"
                    value={this.state.number}
                    onChange={this.handleChange}
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    required
                />
            </label>
            <button type='submit' className={styles.button}>Add contact</button>
        </form>;
    }
}