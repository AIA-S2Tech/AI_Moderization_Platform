import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "../components/common/ProtectedRoute";
import { isAuthenticated } from "../utils/auth";
import { ROUTES, PRIVATE_PAGES } from "../config/routes";

// Public pages
import SignIn from "../pages/SignIn";
import ContactUsPage from "../pages/ContactUsPage";
import ForgotPassword from "../pages/ForgotPassword";
import UserRegister from "../pages/UserRegister";

// Private pages
import PlaceholderPage from "../pages/PlaceholderPage";
import CertifiedRepositoryPage from "../pages/repositories/CertifiedRepositoryPage";
import NotFoundPage from "../pages/NotFoundPage";
import ArtifactRepositoryPage from "../pages/repositories/ArtifactRepositoryPage";
import UiKitPage from "../pages/dev/ui-kit/UiKitPage";
import EvidenceRepositoryPage from "../pages/repositories/EvidenceRepositoryPage";
import LegacyDiscoveryWorkspacePage from "../pages/workspaces/LegacyDiscoveryWorkspacePage";

// Real page components are registered here as they land; anything not listed
// renders the PlaceholderPage with the title from config/routes.js.
const PAGE_COMPONENTS = {
  [ROUTES.CERTIFIED_REPOSITORY]: CertifiedRepositoryPage, // T-64
  // [ROUTES.DASHBOARD]: ProjectDashboard,   // T-29
  [ROUTES.ARTIFACT_REPOSITORY]: ArtifactRepositoryPage, // T-63
  [ROUTES.DEV_UI_KIT]: UiKitPage, // T-07
  [ROUTES.EVIDENCE_REPOSITORY]: EvidenceRepositoryPage, // T-61
  [ROUTES.LEGACY_DISCOVERY]: LegacyDiscoveryWorkspacePage, // T-21
};

const Private = ({ children }) => <ProtectedRoute>{children}</ProtectedRoute>;

const AppRoutes = () => (
  <Routes>
    {/* Home → dashboard */}
    <Route path={ROUTES.ROOT} element={<Navigate to={ROUTES.DASHBOARD} replace />} />

    {/* Private pages (9 pages + repositories hub + nav placeholders) */}
    {PRIVATE_PAGES.map(({ path, title }) => {
      const Page = PAGE_COMPONENTS[path];
      return (
        <Route
          key={path}
          path={path}
          element={<Private>{Page ? <Page /> : <PlaceholderPage title={title} />}</Private>}
        />
      );
    })}

    {/* Public routes */}
    <Route
      path={ROUTES.SIGN_IN}
      element={isAuthenticated() ? <Navigate to={ROUTES.DASHBOARD} replace /> : <SignIn />}
    />
    <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
    <Route path={ROUTES.CONTACT_US} element={<ContactUsPage />} />
    <Route path={ROUTES.SIGN_UP} element={<UserRegister />} />

    {/* 404 */}
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default AppRoutes;
