import { Box, ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/common/header.jsx";
import Footer from "./components/common/footer.jsx";
import AppRoutes from "./routes/AppRoutes.js";
import "./assets/css/global.css";

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Box className="App">
          <Header />
          <main>
            <AppRoutes />
          </main>
          <Footer />
        </Box>
      </Router>
    </ChakraProvider>
  );
}

export default App;
