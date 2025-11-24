"use client";

import ChatButton from "@/src/components/chat-button";
import ChatDrawer from "@/src/components/chat-drawer";
import Simulation from "@/src/components/simulation";
import { CHAT_DATA, SIMULATION_DATA, SIMULATION_DATA_2 } from "@/src/mock";
import { ChatConversation, ChatMessage } from "@/src/types/chat";
import {
  SimulationData,
  SimulationDepotTransaction,
} from "@/src/types/simulation";
import { Box, Button, Drawer, Typography } from "@mui/material";
import React, { useState } from "react";

interface Props {}

const DemoPage: React.FC<Props> = ({}) => {
  const [open, setOpen] = useState(false);

  const [chatData, setChatData] = useState<ChatConversation>(CHAT_DATA);
  const [simulationData, setSimulationData] =
    useState<SimulationData>(SIMULATION_DATA_2);

  const toggleDrawer = (state: boolean) => () => {
    setOpen(state);
  };

  const sendMessage = (message: string) => {
    const newDepotTransaction: SimulationDepotTransaction = {
      date: simulationData.currentDate,
      pricePerShare: 100,
      shares: 1,
      symbol: "PRIEK",
      type: "buy",
    };
    setSimulationData((prev) => {
      return {
        ...prev,
        depotTransactions: [...prev.depotTransactions, newDepotTransaction],
      };
    });

    const userMessage: ChatMessage = {
      isUser: true,
      content: message,
    };
    const agentMessage: ChatMessage = {
      isUser: false,
      content: "Sure I added the transaction",
    };
    setChatData((prev) => {
      return {
        chatMessages: [...prev.chatMessages, userMessage, agentMessage],
      };
    });
  };

  return (
    <>
      {/* Simulation View */}
      <Simulation simulationData={simulationData} />

      {/* Chatbot modal */}
      <ChatDrawer
        chatData={chatData}
        sendMessage={sendMessage}
        open={open}
        toggleDrawer={toggleDrawer}
      />

      {/* Floating button top-right */}
      {!open && <ChatButton toggleDrawer={toggleDrawer} />}
    </>
  );
};

export default DemoPage;
