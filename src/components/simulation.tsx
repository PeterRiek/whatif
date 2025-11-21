import { Container } from '@mui/material';
import React from 'react';
import DepotSection from './depot-section';
import GraphSection from './graph-section';
import TransactionSection from './transaction-section';
import { SimulationData } from '../types/simulation';

interface Props {
  simulationData: SimulationData
}

const Simulation: React.FC<Props> = ({ simulationData }) => {
  return (
    <Container>
      <GraphSection />
      <DepotSection />
      <TransactionSection />
    </Container>
  );
};

export default Simulation;