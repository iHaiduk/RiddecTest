import React from 'react';
import Edit from '../components/Edit';

const View = (props) => {
    return (
		<div className="container">
			<Edit id={props.params.id} />
		</div>
    );
};

export default View;
