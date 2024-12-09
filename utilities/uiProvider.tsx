import React, { createContext, useContext, useState, ReactNode } from "react";
import LoadingScreen from "@/transitional-screens/loadingScreen";

interface UIContextProps {
  showOverlay: boolean;
  setShowOverlay: (value: boolean) => void;
}

const UIContext = createContext<UIContextProps | undefined>(undefined);

export const UIProvider = ({ children }: { children: ReactNode }) => {
  const [showOverlay, setShowOverlay] = useState(false);

  return (
    <>
      <UIContext.Provider value={{ showOverlay, setShowOverlay }}>
        {children}
        {showOverlay && <LoadingScreen />} {/* Conditionally render the overlay */}
      </UIContext.Provider>
    </>
  );
};

export const useUIContext = () => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error("useUIContext must be used within a UIProvider");
  }
  return context;
};
