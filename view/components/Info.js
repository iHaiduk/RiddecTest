import React, {Component} from 'react';
import Prefixer from 'inline-style-prefixer';
import {Link} from 'react-router';
const prefixer = new Prefixer();

import PhoneBlock from './PhoneBlock';
import styles from './../style';

class Contact extends Component {

    constructor (props, context) {
        super(props, context);
        this.state = {
        	phones: props.phones || [null],
            date: +new Date()
        };
    }

    addPhone () {
    	const phones = [...this.state.phones, null];
    	this.setState({phones});
    }

    updatePhoneNumber (index, element) {
    	const value = element.target.value;
        const phones = [...this.state.phones];
    	phones[index] = value;
    	this.setState({phones});
    }

    addContact () {
        const phones = [...this.state.phones].filter(v => v != null && String(v).trim().length);
        const name = this.nameInput.value.trim();
        const second = this.secondInput.value.trim();

        if (phones.length && name.length && second.length) {
            this.props.addTodo({phones, name, second});
        }

        this.props.showForm(false);
        this.setState({phones: [null], date: +new Date()});
    }

    render () {
    	const {phones, date} = this.state;
    	const {name, second, updateContact} = this.props;
        return (
			<div style={prefixer.prefix(styles.example)}>
				<div className="form-horizontal">
					<div className="form-group">
						<label className="col-sm-2 control-label">Name</label>
						<div className="col-sm-10">
							<input
								type="text"
								className="form-control"
								placeholder="Name"
								defaultValue={name}
								ref={(input) => { this.nameInput = input; }}
							/>
						</div>
					</div>
					<div className="form-group">
						<label className="col-sm-2 control-label">Second Name</label>
						<div className="col-sm-10">
							<input
								type="text"
								className="form-control"
								placeholder="Second Name"
								defaultValue={second}
								ref={(input) => { this.secondInput = input; }}
							/>
						</div>
					</div>
					{phones.map((value, key) => (
						<PhoneBlock
							key={date + key}
							num={key}
							number={value}
							addPhone={this.addPhone.bind(this)}
							updatePhoneNumber={this.updatePhoneNumber.bind(this, key)}
						/>
					))}
					<div className="form-group">
						<div className="col-sm-offset-2 col-sm-10">
							{updateContact instanceof Function && <div>
								<button type="submit" className="btn btn-success" onClick={updateContact.bind(updateContact, this)}>Update Contact</button>
								<Link to="/"> Back to Home </Link>
							</div>|| <button type="submit" className="btn btn-default" onClick={this.addContact.bind(this)}>Add Contact</button>
                            }
						</div>
					</div>
				</div>
			</div>
        );
    }
}

export default Contact;
