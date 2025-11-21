import Simulation from "@/src/components/simulation";
import { SIMULATION_DATA } from "@/src/mock";
import { Button } from "@mui/material";
import React from "react";

interface Props {}

const DemoPage: React.FC<Props> = ({}) => {
  return (
    <>
      <Simulation simulationData={SIMULATION_DATA} />
    </>
  );
};

export default DemoPage;
