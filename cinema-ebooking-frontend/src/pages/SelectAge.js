import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IntegerSelector from '../components/IntegerSelector';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export default function SelectAge() {
  const [adultTickets, setAdultTickets] = useState(0);
  const [childTickets, setChildTickets] = useState(0);
  const [seniorTickets, setSeniorTickets] = useState(0);

  return (
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
        to="/select-seats"
        component={Link}
      >Continue to Checkout</Button>
    </Box>
  );
}
