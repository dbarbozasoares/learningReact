import React from "react";

const Container = ({ children }) => {
  return (
    <div>
      <h2>Esse e o titulo do container</h2>
      {children}
    </div>
  );
};

export default Container;
