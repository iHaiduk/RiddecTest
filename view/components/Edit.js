import React, {Component} from 'react';
import {connect} from 'react-redux';
import Info from './Info';
import {updateTodo} from './../../store/actions';

@connect((store) => {
    const {phoneBook} = store;
    return {phoneBook};
},
    dispatch =>
        ({
            updateContact: (id, data) => {
                dispatch(updateTodo(id, data));
            }
        })
)
class Edit extends Component {

    constructor (props, context) {
        super(props, context);
    }

    updateContact (id, child) {
        const phones = [...child.state.phones].filter(v => v != null && String(v).trim().length);
        const name = child.nameInput.value.trim();
        const second = child.secondInput.value.trim();

        if (phones.length && name.length && second.length) {
            this.props.updateContact(id, {phones, name, second});
            location.href = '/';
        }
    }

    render () {
        const { phoneBook, id } = this.props;
        const index = phoneBook.fields.findIndex(v => String(v._id) === id);
        return (
            index !== -1 && <Info updateContact={this.updateContact.bind(this, id)} {...phoneBook.fields[index]} /> || <div>Contact not found</div>
        );
    }
}

export default Edit;
