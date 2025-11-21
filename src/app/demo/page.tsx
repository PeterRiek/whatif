"use client";

import ChatButton from "@/src/components/chat-button";
import ChatDrawer from "@/src/components/chat-drawer";
import Simulation from "@/src/components/simulation";
import { SIMULATION_DATA } from "@/src/mock";
import { Box, Button, Drawer, Typography } from "@mui/material";
import React, { useState } from "react";

interface Props {}

const DemoPage: React.FC<Props> = ({}) => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (state: boolean) => () => {
    setOpen(state);
  };

  return (
    <>
      {/* Simulation View */}
      <Simulation simulationData={SIMULATION_DATA} />

      {/* Chatbot modal */}
      <ChatDrawer open={open} toggleDrawer={toggleDrawer} />

      {/* Floating button top-right */}
      {!open && <ChatButton toggleDrawer={toggleDrawer} />}
    </>
  );
};

export default DemoPage;
