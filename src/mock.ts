import { ChatConversation } from "./types/chat";
import { SimulationData } from "./types/simulation";

const images = {
  starbucks:
    "https://upload.wikimedia.org/wikipedia/sco/thumb/d/d3/Starbucks_Corporation_Logo_2011.svg/763px-Starbucks_Corporation_Logo_2011.svg.png",
  swm: "data:image/jpeg;base64,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",
  commerzbank:
    "data:image/jpeg;base64,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",
  rewe: "data:image/png;base64,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",
};

export const SIMULATION_DATA: SimulationData = {
  currentDate: "2025-01-15",
  transactions: [
    {
      date: "2025-01-01",
      name: "Paycheck",
      amount: 2500,
      imageUrl: images.commerzbank,
    },
    {
      date: "2025-01-02",
      name: "Starbucks Coffee",
      amount: -5,
      imageUrl: images.starbucks,
    },
    {
      date: "2025-01-03",
      name: "Electricity Bill",
      amount: -60,
      imageUrl: images.swm,
    },
    {
      date: "2025-01-04",
      name: "Groceries",
      amount: -120,
      imageUrl: images.rewe,
    },
    {
      date: "2025-01-05",
      name: "Gym Membership",
      amount: -35,
      imageUrl: "/icons/gym.png",
    },
    {
      date: "2025-01-06",
      name: "Netflix Subscription",
      amount: -15,
      imageUrl: "/icons/netflix.png",
    },
    {
      date: "2025-01-07",
      name: "Groceries",
      amount: -20,
      imageUrl: images.rewe,
    },
    {
      date: "2025-01-08",
      name: "Paycheck",
      amount: 2500,
      imageUrl: images.commerzbank,
    },
    {
      date: "2025-01-09",
      name: "Starbucks Coffee",
      amount: -4.5,
      imageUrl: images.starbucks,
    },
    {
      date: "2025-01-10",
      name: "Amazon Purchase",
      amount: -75,
      imageUrl: "/icons/shopping.png",
    },
    {
      date: "2025-01-11",
      name: "Gas Station",
      amount: -50,
      imageUrl: "/icons/gas.png",
    },
    {
      date: "2025-01-12",
      name: "Dividend Payment",
      amount: 12.5,
      imageUrl: "/icons/dividend.png",
    },
    {
      date: "2025-01-13",
      name: "Deposit",
      amount: 1000,
      imageUrl: "/icons/deposit.png",
    },
    {
      date: "2025-01-14",
      name: "Lunch Out",
      amount: -18,
      imageUrl: "/icons/lunch.png",
    },
    {
      date: "2025-01-15",
      name: "Coffee",
      amount: -4,
      imageUrl: images.starbucks,
    },
  ],
  depotTransactions: [
    {
      date: "2025-01-05",
      symbol: "AAPL",
      shares: 2,
      pricePerShare: 150,
      type: "buy",
    },
    {
      date: "2025-01-09",
      symbol: "GOOG",
      shares: 1,
      pricePerShare: 2800,
      type: "buy",
    },
    {
      date: "2025-01-11",
      symbol: "TSLA",
      shares: -1,
      pricePerShare: 220,
      type: "sell",
    },
    {
      date: "2025-01-14",
      symbol: "MSFT",
      shares: 3,
      pricePerShare: 300,
      type: "buy",
    },
  ],
};

export const CHAT_DATA: ChatConversation = {
  chatMessages: [
    {
      isUser: true,
      content: "Can you explain the difference between stocks and ETFs?"
    },
    {
      isUser: false,
      content: "Sure! A stock represents ownership in a single company, while an ETF is a fund that holds many stocks or other assets."
    },
    {
      isUser: true,
      content: "So ETFs are like a bundle of stocks?"
    },
    {
      isUser: false,
      content: "Exactly! They give you instant diversification, so your risk is spread across multiple companies instead of just one."
    },
    {
      isUser: true,
      content: "Are ETFs safer than individual stocks?"
    },
    {
      isUser: false,
      content: "Generally, yes, because diversification reduces the impact of any single company's poor performance. But they still carry market risk."
    }
  ]
};

