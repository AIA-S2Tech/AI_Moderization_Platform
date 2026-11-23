import { Box } from "@chakra-ui/react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import Header from "./components/common/header.jsx";
import Footer from "./components/common/footer.jsx";
import AppRoutes from "./routes/AppRoutes.js";
import { ROUTES } from "./config/routes";
import "./assets/css/global.css";

// Pages that render their own public nav and footer (PublicNav / PublicFooter),
// so the global Header and Footer are skipped there.
const PAGES_WITH_OWN_CHROME = [ROUTES.ABOUT];

const Layout = () => {
  const { pathname } = useLocation();
  const cleanPath = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  const hasOwnChrome = PAGES_WITH_OWN_CHROME.includes(cleanPath);

  return (
    <Box className="App">
      {!hasOwnChrome && <Header />}
      <main>
        <AppRoutes />
      </main>
      {!hasOwnChrome && <Footer />}
    </Box>
  );
};

function App() {
  return (
    // ChakraProvider (with the S2Tech theme) lives in index.js – don't add a second one here,
    // it would reset the theme to Chakra's defaults.
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
