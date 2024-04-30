import React, { useState } from 'react';
import TableManager from './TableManager';
import Axios from 'axios';

const Users = () => {
    const [rows, setRows] = useState([
        { id: 1, name: 'Louis', type: 'registered' },
        { id: 2, name: 'Dev', type: 'admin' }
    ]);

    return (
        <div>
            <TableManager rows={rows} setRows={setRows} rowHeaders={['id', 'name', 'type']} />
            <div className='backButton' style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <li>
                    <a href='/admin' style={{ display: 'inline-block', padding: '10px 20px', fontSize: '18px', border: '1px solid white', borderRadius: '5px', textDecoration: 'none', color: 'white' }}>Go Back</a>
                </li>
            </div>
        </div>
        );
};

export default Users;
