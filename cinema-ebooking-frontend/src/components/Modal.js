import React, { useEffect, useState } from 'react';
import './Modal.css'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import AddShowing from '../components/AddShowing';
import EditShowing from '../components/EditShowing';
import axios from 'axios';


function Modal({ selectedMovie, setSelectedMovie, handleSelectShowing }) {
  const [editShowing, setEditShowing] = useState(false);
  const isAdmin = JSON.parse(sessionStorage.getItem('isAdmin'));

  return (
    <>
      <Dialog open={selectedMovie !== null} onClose={() => setSelectedMovie(null)}>
        <div className='display_top'>
          <DialogTitle>{selectedMovie?.title}</DialogTitle>
          {
            isAdmin &&
            <Button color="primary" onClick={() => setEditShowing(true)}> Edit </Button>
          }
        </div>
        <DialogContent>
          <iframe
            width="560"
            height="315"
            src={"https://www.youtube.com/embed/" + selectedMovie?.trailerUrl.replace("https://youtu.be/", "")}
            title={selectedMovie?.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <div>
            <h3>{selectedMovie?.genres}</h3>
            <span>{selectedMovie?.description}</span>
            <br></br>
            <br></br>
            <h3>Showtimes:</h3>
            <ul>
              {selectedMovie?.showings.map(showing => (
                <li key={showing.id}>
                  <span>{new Date(showing.dateTime).toLocaleString()}</span>
                  <Button onClick={() => handleSelectShowing(showing)} color="primary">
                    Buy Tickets
                  </Button>
                </li>
              ))}
              {isAdmin &&
                <li>
                  <AddShowing movie={selectedMovie} />
                </li>
              }
            </ul>
          </div>
          <EditShowing editShowing={editShowing} setEditShowing={setEditShowing} movie={selectedMovie} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedMovie(null)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Modal;