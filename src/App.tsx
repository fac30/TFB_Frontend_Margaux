import { Box, NativeBaseProvider } from 'native-base';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PWAInstallPrompt from './components/PWAInstallPrompt';
import { theme } from './utils/native-base-config';

function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <Box flex={1} bg={theme.colors.gray[50]}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
        <PWAInstallPrompt />
      </Box>
    </NativeBaseProvider>
  );
}

export default App;
