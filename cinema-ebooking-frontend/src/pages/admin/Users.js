import React, { useState } from 'react';
import TableManager from './TableManager';

const Users = () => {
    const [rows, setRows] = useState([
        { id: 1, name: 'Louis', type: 'registered' },
        { id: 2, name: 'Dev', type: 'admin' }
    ]);

    return (
        <TableManager rows={rows} setRows={setRows} rowHeaders={['id', 'name', 'type']} />
    );
};

export default Users;
