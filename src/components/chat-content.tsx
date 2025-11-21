import React from "react";
import { ChatConversation } from "../types/chat";
import { Box, Button, Card, Stack, TextField } from "@mui/material";
import ChatCard from "./chat-card";
import SendIcon from "@mui/icons-material/Send";

interface Props {
  chatConversation: ChatConversation;
}

const ChatContent: React.FC<Props> = ({ chatConversation }) => {
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
            />
            <Button sx={{ height: "100%" }}>
              <SendIcon sx={{ fontSize: 48 }} />
            </Button>
          </Stack>
        </Card>
      </Box>
    </>
  );
};

export default ChatContent;
