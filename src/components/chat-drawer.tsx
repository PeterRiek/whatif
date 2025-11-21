import { Box, Drawer, Typography } from "@mui/material";
import React from "react";
import ChatContent from "./chat-content";
import { CHAT_DATA } from "../mock";

interface Props {
  open: boolean;
  toggleDrawer: (state: boolean) => () => void;
}

const ChatDrawer: React.FC<Props> = ({ open, toggleDrawer }) => {
  return (
    <>
      {/* Chatbot modal */}
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        <Box
          display="flex"
          flexDirection="column"
          height="100%"
          width="80vw"
          justifyContent="center"
          alignItems="center"
        >
          <ChatContent chatConversation={CHAT_DATA}/>
        </Box>
      </Drawer>
    </>
  );
};

export default ChatDrawer;
