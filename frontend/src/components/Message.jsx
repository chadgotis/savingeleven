import React from "react";
import { Alert } from "react-bootstrap";

const Message = ({ variant, children }) => {
  return (
    <>
      <Alert style={{ display: "block" }} variant={variant}>
        {children}
      </Alert>
    </>
  );
};

Message.defaultProps = {
  variant: "info",
};

export default Message;
