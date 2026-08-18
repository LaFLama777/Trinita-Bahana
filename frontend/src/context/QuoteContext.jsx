import { createContext, useContext, useState } from "react";

const QuoteContext = createContext();

export const QuoteProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  return (
    <QuoteContext.Provider value={{ open, setOpen }}>
      {children}
    </QuoteContext.Provider>
  );
};

export const useQuote = () => useContext(QuoteContext);
