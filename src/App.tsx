import { Box } from 'native-base';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home";
import PWAInstallPrompt from './components/PWAInstallPrompt';

function App() {
  return (
    <Box flex={1} bg="white">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer />
      </Router>
      <PWAInstallPrompt />
    </Box>
  );
}

export default App;
