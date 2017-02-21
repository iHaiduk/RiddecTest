import React from 'react';
import { Link } from 'react-router'

const Contact = (prop) => {
    const {num, _id, name, second, phones, removeTodo} = prop;
    return (
		<tr key={_id}>
			<th scope="row">{num + 1}</th>
			<td>{`${name} ${second}`}</td>
			<td>{
                phones.map((phone, key) => (
					<div key={key}><a href={`tel:${phone}`}>{phone}</a></div>
                ))
            }</td>
			<td>
				<Link className="btn btn-default" to={`/contact/${_id}`}><span className="glyphicon glyphicon-pencil" aria-hidden="true" /></Link>
				<button type="button" className="btn btn-danger" onClick={removeTodo.bind(this, _id)}>
					<span className="glyphicon glyphicon-remove" aria-hidden="true" />
				</button>
			</td>
		</tr>
    );
};

export default Contact;
