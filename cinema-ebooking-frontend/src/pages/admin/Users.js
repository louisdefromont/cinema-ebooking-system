import React from 'react';
import TableManager from './TableManager';
import Axios from 'axios';

const Users = () => {
    function readCallback() {
        return Axios.get('https://localhost:3000/user');
    }
    function createCallback(row) {
        return Axios.post('https://localhost:3000/user', row);
    }
    function deleteCallback(row) {
        return Axios.delete(`https://localhost:3000/user/${row.id}`);
    }
    function updateCallback(row) {
        return Axios.put(`https://localhost:3000/user/${row.id}`, row);
    }

    return (
        <div> 
            <TableManager rowHeaders={['id', 'email', 'firstName', 'lastName', 'password', 'phone', 'city', 'state','regPromo', 'status']} 
            createCallback={createCallback} 
            readCallback={readCallback} 
            updateCallback={updateCallback} 
            deleteCallback={deleteCallback} 
            />
           <div className='backButton' style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <li>
                    <a href='/admin' style={{ display: 'inline-block', padding: '10px 20px', fontSize: '18px', border: '1px solid white', borderRadius: '5px', textDecoration: 'none', color: 'white' }}>Go Back</a>
                </li>
            </div>
        </div>



    );

};

export default Users;




/** 
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
*/
