import React from 'react';
import TableManager from './TableManager';
import Axios from 'axios';

const Promotions = () => {
    function createCallback(row) {
        return Axios.post('https://localhost:3000/promotions', row);
    }
    function readCallback() {
        return Axios.get('https://localhost:3000/promotions');
    }
    function updateCallback(row) {
        return Axios.put(`https://localhost:3000/promotions/${row.id}`, row);
    }
    function deleteCallback(row) {
        return Axios.delete(`https://localhost:3000/promotions/${row.id}`);
    }

    return (
        <TableManager rowHeaders={['id', 'expirationDate', 'discAmount', 'regExpression']} createCallback={createCallback} readCallback={readCallback} updateCallback={updateCallback} deleteCallback={deleteCallback} />
    );

};

export default Promotions;
