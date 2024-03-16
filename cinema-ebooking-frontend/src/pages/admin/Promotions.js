import React from 'react';
import TableManager from './TableManager';
import Axios from 'axios';

const Promotions = () => {
    function createCallback(row) {
        return Axios.post('http://localhost:3000/promotions', row);
    }
    function readCallback() {
        return Axios.get('http://localhost:3000/promotions');
    }
    function updateCallback(row) {
        return Axios.put(`http://localhost:3000/promotions/${row.id}`, row);
    }
    function deleteCallback(row) {
        return Axios.delete(`http://localhost:3000/promotions/${row.id}`);
    }

    return (
        <TableManager rowHeaders={['id', 'expirationDate', 'discAmount', 'regExpression']} createCallback={createCallback} readCallback={readCallback} updateCallback={updateCallback} deleteCallback={deleteCallback} />
    );

};

export default Promotions;
