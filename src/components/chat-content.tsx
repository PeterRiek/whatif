"use client";

import React, { useEffect, useRef, useState } from "react";
import { ChatConversation } from "../types/chat";
import { Box, Button, Card, Stack, TextField } from "@mui/material";
import ChatCard from "./chat-card";
import SendIcon from "@mui/icons-material/Send";
import MOCK from "@/public/mock/scenario.json";

interface Props {
  chatConversation: ChatConversation;
  sendMessage: (message: string) => void;
}

const ChatContent: React.FC<Props> = ({ chatConversation, sendMessage }) => {
  const [message, setMessage] = useState<string>("");
  const [sc, setSc] = useState<string[]>([]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatConversation.chatMessages]);

  const onSendClicked = () => {
    if (!message) return;
    sendMessage(message);
    setMessage("");
  };

  const getScenario = () => {
    const msgs = chatConversation.chatMessages;
    const c = msgs[msgs.length - 1].content;
    if (c.startsWith("Weniger als")) return MOCK.intro.options;
    if (c.startsWith("Ja! Der Unterschied")) return MOCK.invest.options;
    if (c.startsWith("Ja, aber")) return MOCK.ratenzahlung.options;
    return MOCK.intro.options;
  };

  useEffect(() => {
    setSc(getScenario());
  }, [chatConversation]);

  return (
    <>
      <Box
        sx={{
          maxHeight: "100%",
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "end",
          justifyContent: "end",
          pt: 2,
        }}
      >
        {/* Chat messages */}
        <Stack
          spacing={1}
          p={1}
          mb={5}
          maxHeight="70%"
          overflow="auto"
          width="100%"
        >
          {chatConversation.chatMessages.map((chatMessage, index) => (
            <ChatCard chatMessage={chatMessage} key={index} />
          ))}
          <div ref={messagesEndRef} />
        </Stack>

        {/* Select Predefined scenarios */}
        <Stack width="100%" direction="column" spacing={1} my={1}>
          {sc.map((s) => (
            <Button onClick={() => sendMessage(s)} key={s}>
              {s}
            </Button>
          ))}
        </Stack>
        {/* Send Message */}
        <Card sx={{ width: "100%", height: "30%", p: 1, alignItems: "center" }}>
          <Stack
            spacing={1}
            direction="row"
            sx={{ width: "100%", alignItems: "center" }}
          >
            <TextField
              variant="outlined"
              multiline
              maxRows={5}
              sx={{ width: "100%" }}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button
              sx={{ height: "100%" }}
              onClick={onSendClicked}
              disabled={message == ""}
            >
              <SendIcon sx={{ fontSize: 48 }} />
            </Button>
          </Stack>
        </Card>
      </Box>
    </>
  );
};

export default ChatContent;
