import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { NativeBaseProvider } from "native-base";
import App from "./App";
import { theme } from "./utils/native-base-config";
 

// Call getPublicUrl with the required argument
  // Pass the correct file path


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NativeBaseProvider theme={theme}>
      
      <App />
    </NativeBaseProvider>
  </StrictMode>
);
