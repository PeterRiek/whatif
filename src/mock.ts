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
  if (msg.includes("ti")) return "time.invest";
  if (msg.includes("t")) return "time";
  if (msg.includes("r")) return "ratenzahlung";

  return "demo";
};
