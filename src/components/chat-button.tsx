import ChatIcon from "@mui/icons-material/Chat";
import { Button } from "@mui/material";

import React from "react";

interface Props {
  toggleDrawer: (state: boolean) => () => void;
}

const ChatButton: React.FC<Props> = ({ toggleDrawer }) => {
  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={toggleDrawer(true)}
        size="large"
        sx={{
          position: "fixed",
          bottom: 64,
          right: 16,
          zIndex: 1300, // above most content
          height: 80,
          width: 80,
          borderRadius: "100%",
        }}
      >
        <ChatIcon sx={{fontSize: 48}}/>
      </Button>
    </>
  );
};

export default ChatButton;
