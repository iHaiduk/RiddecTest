/**
 * Created by igor on 19.02.17.
 */

import axios from 'axios';

export function addTodo (contact) {
    return {
        type: 'ADD',
        payload: axios.put('/api/contact', contact)
    };
}

export function removeTodo (id) {
    return {
        type: 'REMOVE',
        payload: axios.delete('/api/contact/' + id)
    };
}

export function updateTodo (id, data) {
    return {
        type: 'UPDATE',
        payload: axios.post('/api/contact/' + id, data)
    };
}

