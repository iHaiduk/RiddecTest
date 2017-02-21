/**
 * Created by igor on 19.02.17.
 */


export default (state = {fields: []}, action) => {
    switch (action.type) {
        case 'ADD_FULFILLED': {
            const fields = [...state.fields, action.payload.data];
            return {...state, fields};
        }
        case 'REMOVE_FULFILLED': {
            const {_id} = action.payload.data;
            const fields = [...state.fields].filter(v => String(v._id) !== String(_id));
            return {...state, fields};
        }
        case 'UPDATE_FULFILLED': {
            const {_id} = action.payload.data;
            const fields = [...state.fields];
            const index = fields.findIndex(v => String(v._id) !== String(_id));
            fields.splice(index, 1, action.payload.data);
            return {...state, fields};
        }
        default:
            return state;
    }
};
