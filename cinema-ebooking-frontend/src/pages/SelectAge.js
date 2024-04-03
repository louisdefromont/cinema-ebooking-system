import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IntegerSelector from '../components/IntegerSelector';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export default function SelectAge() {
  const [adultTickets, setAdultTickets] = useState(0);
  const [childTickets, setChildTickets] = useState(0);
  const [seniorTickets, setSeniorTickets] = useState(0);
  const [movie, setMovie] = useState(sessionStorage.getItem('selectedMovie'));
  const showing = JSON.parse(sessionStorage.getItem('selectedShowing'));

  useEffect(() => {
    const movieId = showing?.movieId;
    if (movieId && movieId !== movie?.id) {
      fetch(`https://localhost:3000/movies/${movieId}`)
        .then(response => response.json())
        .then(data => {
          setMovie(data.movie);
          sessionStorage.setItem('selectedMovie', JSON.stringify(data.movie));
        }
        )
        .catch(error => console.error('Error fetching movie:', error));

    }
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    sessionStorage.setItem('selectedTickets', JSON.stringify({
      adultTickets,
      childTickets,
      seniorTickets,
    }));
    window.location.href = '/select-seats';
  }

  return (
    <Box display="flex" flexDirection="row" p={2} justifyContent="center">
      <Box display="flex" flexDirection="column" p={2} justifyContent="flex-start">
        <img src={movie?.thumbnailUrl} alt={movie?.title} style={{ width: '200px', height: '300px' }} />
        <Typography variant="h3" sx={{ color: 'white' }}>
          {movie?.title}
        </Typography>
        <Typography variant="h5" sx={{ color: 'white' }}>
          {new Date(showing?.dateTime).toLocaleString()}
        </Typography>
        <Typography variant="h5" sx={{ color: 'white' }}>
          Theater {showing?.showroomId}
        </Typography>
      </Box>
      <Box display="flex" flexDirection="column" p={2} justifyContent="flex-end" textAlign="right">
        <Box alignSelf="flex-end">
          <Typography variant="h5" sx={{ color: 'white' }}>
            Adult Ticket(s) $12.00
          </Typography>
          <IntegerSelector value={adultTickets} setValue={setAdultTickets} />
        </Box>
        <Box mt={2} alignSelf="flex-end">
          <Typography variant="h5" sx={{ color: 'white' }}>
            Child Ticket(s) $6.00 (Age 12 and under)
          </Typography>
          <IntegerSelector value={childTickets} setValue={setChildTickets} />
        </Box>
        <Box mt={2} alignSelf="flex-end">
          <Typography variant="h5" sx={{ color: 'white' }}>
            Senior Ticket(s) $6.00 (Age 55+)
          </Typography>
          <IntegerSelector value={seniorTickets} setValue={setSeniorTickets} />
        </Box>
        <Typography variant="h3" sx={{ color: 'white' }}>
          Total: ${adultTickets * 12 + childTickets * 6 + seniorTickets * 6}.00
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >Select Seats</Button>
      </Box>
    </Box>
  );
}
