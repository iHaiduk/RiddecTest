import React, {Component, PropTypes} from 'react';
import Radium, {StyleRoot} from 'radium';
import { bindActionCreators } from 'redux';

import {connect} from 'react-redux';
import Info from './Info';
import Contact from './Contact';
import * as Actions from './../../store/actions';

@Radium
@connect((store) => {
    const {phoneBook} = store;
    return {phoneBook};
})
class Table extends Component {

    static propTypes = {
        dispatch: PropTypes.func.isRequired
    };

    constructor (props, context) {
        super(props, context);
        this.state = {
            showForm: false,
            search: null
        };
    }

    showForm (type) {
        const {showForm} = this.state;
        this.setState({showForm: typeof type !== 'boolean' ? !showForm : type});
    }

    searchPhone () {
        const value = this.searchInput.value.trim();
        this.setState({search: value.length ? value : null});
    }

    render () {
        const {showForm} = this.state;
        const { dispatch, phoneBook } = this.props;

        let search = this.state.search;
        search = search != null ? new RegExp(search, 'ig') : search;

        return (
            <StyleRoot>
                <div className="row">
                    <div className="col-xs-4">
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={this.showForm.bind(this)}
                        >{showForm && 'Hide form' || 'Add Contact'}</button>
                    </div>
                    <div className="col-xs-4 col-xs-offset-4">
                        <div className="text-right">
                            <input type="text" className="form-control" placeholder="Search"
                                   ref={(input) => { this.searchInput = input; }}
                                   onKeyUp={this.searchPhone.bind(this)}/>
                        </div>
                    </div>
                </div>

                {showForm && <Info showForm={this.showForm.bind(this)} {...bindActionCreators(Actions, dispatch)} />}

                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Options</th>
                    </tr>
                    </thead>
                    <tbody>
                    {phoneBook.fields.filter(contact => {
                        if (search === null) return true;
                        let answ = false;

                        if (search.test(contact.name) || search.test(contact.second)) {
                            answ = true;
                        } else {
                            contact.phones.forEach(v => {
                                if (!answ && search.test(String(v))) {
                                    answ = true;
                                }
                            });
                        }
                        return answ;
                    }).map((v, k) => (
                        <Contact
                            key={k}
                            num={k}
                            {...v}
                            {...bindActionCreators(Actions, dispatch)}
                        />
                    ))}
                    </tbody>
                </table>
            </StyleRoot>
        );
    }
}

export default Table;
