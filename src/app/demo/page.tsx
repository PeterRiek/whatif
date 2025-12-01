"use client";

import ChatButton from "@/src/components/chat-button";
import ChatDrawer from "@/src/components/chat-drawer";
import Simulation from "@/src/components/simulation";
import { mockHandleMessage } from "@/src/mock";
import { ChatConversation } from "@/src/types/chat";
import {
  SimulationData,
  SimulationDepotTransaction,
} from "@/src/types/simulation";
import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import MOCK from "@/public/mock/scenario.json";

interface Props {}

const getPrice = async (symbol: string, date: Date): Promise<number> => {
  const start = date.toLocaleDateString("en-CA");
  date.setDate(date.getDate() + 7);
  const end = date.toLocaleDateString("en-CA");
  const url = `https://api.ahqu.de:2096/api/stock/${symbol}?start=${start}&end=${end}&interval=${"1d"}`;
  const response = await fetch(url);
  const json = await response.json();
  return Object.entries(json)[0][1] as number;
};

const DemoPage: React.FC<Props> = ({}) => {
  const [chatData, setChatData] = useState<ChatConversation>();
  const [simulationData, setSimulationData] = useState<SimulationData>();

  const [open, setOpen] = useState(false);

  type ScenarioKey = keyof typeof MOCK;
  const loadScenario = async (scenario: ScenarioKey) => {
    const demo = MOCK[scenario];

    console.log("demo laoded:", scenario, demo)

    const parsedSimulationData: SimulationData = {
      currentDate: new Date(demo.simulationData.currentDate),
      transactions: demo.simulationData.transactions.map((t) => ({
        ...t,
        date: new Date(t.date),
      })),
      depotTransactions: demo.simulationData.depotTransactions.map((d) => ({
        ...d,
        date: new Date(d.date),
        type: d.type as "buy" | "sell",
      })),
    };
    const depotTransactions: SimulationDepotTransaction[] = [];
    for (const t of parsedSimulationData.depotTransactions) {
      const price = await getPrice(t.symbol, new Date(t.date));
      depotTransactions.push({
        ...t,
        pricePerShare: price,
      });
      console.log("working on", t)
    }
    parsedSimulationData.depotTransactions = depotTransactions;
    console.log("Set parsed simulation data!", parsedSimulationData);

    setChatData(demo.chatData as ChatConversation);
    setSimulationData(parsedSimulationData);
  };

  useEffect(() => {
    loadScenario("demo");
  }, []);

  const sendMessage = (message: string) => {
    if (!simulationData || !chatData) return;
    loadScenario(mockHandleMessage(simulationData, chatData, message));
  };

  const toggleDrawer = (state: boolean) => () => {
    setOpen(state);
  };

  if (!chatData || !simulationData) {
    return (
      <>
        <CircularProgress />
      </>
    );
  }
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
