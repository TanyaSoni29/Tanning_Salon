import { useState, useEffect } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";

import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

import theme from "assets/theme";
import themeDark from "assets/theme-dark";
import routes from "routes";
import ProtectedRoute from "utils/Protect";
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context";

// Images
import brandWhite from "assets/images/Tanning_temporary.png";
import brandDark from "assets/images/Tanning_temporary.png";
import LogoutModal from "./components/Modal";
import LogOut from "../src/layouts/authentication/log-out";
import { getMe, logout } from "./service/operations/authApi";
import sideNavRoutes from "sidenavRoutes";
import { useDispatch, useSelector } from "react-redux";

export default function App() {
  const [controller, dispatch] = useMaterialUIController();
  const appDispatch = useDispatch();
  const navigate = useNavigate();
  const {
    miniSidenav,
    direction,
    layout,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const { pathname } = useLocation();
  const [openLogoutModal, setOpenLogoutModal] = useState(false);
  const { token, isAuth } = useSelector((state) => state.auth);

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // useEffect(() => {
  //   if (token) {
  //     appDispatch(getMe(token));
  //   }
  // }, [token, appDispatch]);
  // useEffect(() => {
  //   // Check if the user is authenticated
  //   if (!isAuth) {
  //     // Redirect to the sign-in page if not authenticated
  //     navigate("/authentication/sign-in");
  //   } else {
  //     // If authenticated, you might want to fetch user data
  //     appDispatch(getMe(navigate, token));
  //   }
  // }, [token, navigate, appDispatch]);
  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const handleLogoutClick = () => {
    setOpenLogoutModal(true);
  };
  const handleLogout = () => {
    appDispatch(logout(navigate));
    setOpenLogoutModal(false);
  };

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return (
          <Route
            exact
            path={route.route}
            element={
              route.protected ? <ProtectedRoute>{route.component}</ProtectedRoute> : route.component
            }
            key={route.key}
          />
        );
      }

      return null;
    });

  const configsButton = (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.25rem"
      height="3.25rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="small" color="inherit">
        settings
      </Icon>
    </MDBox>
  );

  return (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <CssBaseline />
      {layout === "dashboard" && (
        <>
          <Sidenav
            color={sidenavColor}
            brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
            brandName="SALON"
            routes={sideNavRoutes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
            onLogoutClick={handleLogoutClick}
          />
          <Configurator />
          {configsButton}
        </>
      )}
      {layout === "vr" && <Configurator />}
      <LogoutModal open={openLogoutModal} setOpen={setOpenLogoutModal}>
        <LogOut handleLogout={handleLogout} open={openLogoutModal} setOpen={setOpenLogoutModal} />
      </LogoutModal>
      <Routes>
        {getRoutes(routes)}
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </ThemeProvider>
  );
}
