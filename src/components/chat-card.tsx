import { Box, Card, Typography } from "@mui/material";
import React from "react";
import { ChatMessage } from "../types/chat";

interface Props {
  chatMessage: ChatMessage;
}

const ChatCard: React.FC<Props> = ({ chatMessage }) => {
  const align = chatMessage.isUser ? "end" : "start"
  return (
    <>
      <Box sx={{ width: "100%", display: "flex", justifyContent: align }}>
        <Card sx={{ maxWidth: "60%", p: 1 }}>
          <Typography>{chatMessage.content}</Typography>
        </Card>
      </Box>
    </>
  );
};

export default ChatCard;
