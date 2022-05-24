import { createContext } from "react";

export const TestContext = createContext();
export const TestContextProvider = ({ children, value }) => {
  return <TestContext.Provider value={value}>{children}</TestContext.Provider>;
};
