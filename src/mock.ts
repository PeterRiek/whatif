import { ChatConversation } from "./types/chat";
import { SimulationData } from "./types/simulation";

/*
/!\ FOR EVERY STOCK BOUGHT / SOLD ADD TRANSACTION ADDITIONALLY TO DEPOT TRANSACTION /!\
*/

import MOCK from "@/public/mock/scenario.json";
type ScenarioKey = keyof typeof MOCK;

export const mockHandleMessage = (
  sim: SimulationData,
  chat: ChatConversation,
  msg: string
): ScenarioKey => {

  if (msg.includes("Nein")) return "ratenzahlung"
  if (msg.startsWith("Ja")) return "invest"
  return "intro";
};
