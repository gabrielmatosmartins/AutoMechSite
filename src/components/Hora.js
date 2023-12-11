import React, { useState, useEffect } from 'react';
import { Box } from '@chakra-ui/react';

function Hora() {
  const dataHoraAtual = new Date();
  const [currentTime, setCurrentTime] = useState(dataHoraAtual);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box>
    {currentTime.toLocaleString('pt-BR')}
    </Box>
  );
}

export default Hora;