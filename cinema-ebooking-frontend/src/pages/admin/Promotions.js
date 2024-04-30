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
        <div> 
            <TableManager rowHeaders={['id', 'expirationDate', 'discAmount', 'regExpression']} 
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

export default Promotions;
