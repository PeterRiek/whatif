import { Box, Drawer } from "@mui/material";
import React from "react";
import ChatContent from "./chat-content";
import { ChatConversation } from "../types/chat";

interface Props {
  chatData: ChatConversation;
  open: boolean;
  toggleDrawer: (state: boolean) => () => void;
  sendMessage: (message: string) => void;
}

const ChatDrawer: React.FC<Props> = ({ chatData, open, toggleDrawer, sendMessage }) => {
  return (
    <>
      {/* Chatbot modal */}
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        <Box
          display="flex"
          flexDirection="column"
          height="100%"
          width="80vw"
          maxWidth="500px"
          justifyContent="center"
          alignItems="center"
        >
          <ChatContent chatConversation={chatData} sendMessage={sendMessage}/>
        </Box>
      </Drawer>
    </>
  );
};

export default ChatDrawer;
