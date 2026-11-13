import { Box } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/common/header.jsx";
import Footer from "./components/common/footer.jsx";
import AppRoutes from "./routes/AppRoutes.js";
import "./assets/css/global.css";

function App() {
  return (
    // ChakraProvider (with the S2Tech theme) lives in index.js – don't add a second one here,
    // it would reset the theme to Chakra's defaults.
    <Router>
      <Box className="App">
        <Header />
        <main>
          <AppRoutes />
        </main>
        <Footer />
      </Box>
    </Router>
  );
}

export default App;
