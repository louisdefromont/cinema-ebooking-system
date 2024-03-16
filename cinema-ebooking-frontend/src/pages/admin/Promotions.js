import React, { useState } from 'react';
import TableManager from './TableManager';

const Promotions = () => {
    const [rows, setRows] = useState([
        { id: 1, title: 'Dune', discount: '0.80', regex: '/dune/i' },
        { id: 2, title: 'Deadpool', discount: '0.50', regex: '/deadpool/i' }
    ]);

    return (
        <TableManager rows={rows} setRows={setRows} rowHeaders={['id', 'title', 'discount', 'regex']} />
    );

};

export default Promotions;
