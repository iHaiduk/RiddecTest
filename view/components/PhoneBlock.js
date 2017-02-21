import React from 'react';

const PhoneBlock = (props) => {
    const {num, number, addPhone, updatePhoneNumber} = props;
    return (
		<div className="form-group">
			<label className="col-sm-2 control-label">Phone {num > 0 && `#${num + 1}`}</label>
			<div className="col-sm-8">
				<input type="phone" className="form-control" placeholder="Phone" defaultValue={number} onChange={updatePhoneNumber}/>
			</div>
            {num === 0 &&
				<div className="col-sm-2">
					<button type="button" className="btn btn-default" onClick={addPhone}>Add one</button>
				</div>
            }
		</div>
    );
};

export default PhoneBlock;
