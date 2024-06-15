import React, { useState } from "react";
import TransactionDetailForm from "./TransactionDetailForm";

const App = () => {
  const [isVisible, setIsVisible] = useState(false);
  const transactionData = {}; // API'den gelen veriyi buraya atayın.

  return (
    <div>
      <button onClick={() => setIsVisible(true)}>Open Form</button>
      <TransactionDetailForm
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        transactionData={transactionData}
      />
    </div>
  );
};

export default App;
