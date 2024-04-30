import React from 'react';
import TableManager from './TableManager';
import Axios from 'axios';

const Showtimes = () => {
     

    
    function readCallback(row) {
        return Axios.get('https://localhost:3000/showtimes/');
    }
    /** 

    function createCallback(row) {
        return Axios.post('https://localhost:3000/showtimes', row);
    }


    function updateCallback(row) {
        return Axios.put('https://localhost:3000/showings/${row.id}', row);
    }
    function deleteCallback(row) {
        return Axios.delete('https://localhost:3000/showings/${row.id}');
    }
*/
    return (
        <div>
            <TableManager
                rowHeaders={["dateTime", "movieId", "showroomId"]}
               // createCallback={createCallback}
                readCallback={readCallback}
              //  updateCallback={updateCallback}
               // deleteCallback={deleteCallback}
            />
            <div className='backButton' style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <li>
                    <a href='/admin' style={{ display: 'inline-block', padding: '10px 20px', fontSize: '18px', border: '1px solid white', borderRadius: '5px', textDecoration: 'none', color: 'white' }}>Go Back</a>
                </li>
            </div>
        </div>
   
        );
};

export default Showtimes;