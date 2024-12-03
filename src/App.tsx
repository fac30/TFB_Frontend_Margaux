import { Box } from 'native-base';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PWAInstallPrompt from './components/PWAInstallPrompt';

function App() {
  return (
    <Box flex={1} bg="white">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
      <PWAInstallPrompt />
    </Box>
  );
}

export default App;
