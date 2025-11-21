"use client";

import React, { useState } from "react";
import { ChatConversation } from "../types/chat";
import { Box, Button, Card, Stack, TextField } from "@mui/material";
import ChatCard from "./chat-card";
import SendIcon from "@mui/icons-material/Send";

interface Props {
  chatConversation: ChatConversation;
  sendMessage: (message: string) => void;
}

const ChatContent: React.FC<Props> = ({ chatConversation, sendMessage }) => {
  const [message, setMessage] = useState<string>("");

  const onSendClicked = () => {
    if (!message) return;
    sendMessage(message);
    setMessage("")
  };

  return (
    <>
      <Box sx={{ maxHeight: "100%" }}>
        {/* Chat messages */}
        <Stack spacing={1} p={1} mb={5} maxHeight="80%" overflow="auto">
          {chatConversation.chatMessages.map((chatMessage, index) => (
            <ChatCard chatMessage={chatMessage} key={index} />
          ))}
        </Stack>
        {/* Send Message */}
        <Card sx={{ width: "100%", p: 1, alignItems: "center" }}>
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
            <Button sx={{ height: "100%" }} onClick={onSendClicked} disabled={message==""}>
              <SendIcon sx={{ fontSize: 48 }} />
            </Button>
          </Stack>
        </Card>
      </Box>
    </>
  );
};

export default ChatContent;
