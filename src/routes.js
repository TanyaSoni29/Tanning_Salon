import UserTables from "layouts/user-tables";
import ProductTables from "layouts/product-tables";
import ServiceTables from "layouts/service-tables";

// Other imports remain the same
import Dashboard from "layouts/dashboard";
import Billing from "layouts/billing";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

// @mui icons
import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
    protected: true,
  },
  {
    type: "collapse",
    name: "User Tables",
    key: "user-tables",
    icon: <Icon fontSize="small">people</Icon>,
    route: "/user-tables",
    component: <UserTables />,
  },
  {
    type: "collapse",
    name: "Product Tables",
    key: "product-tables",
    icon: <Icon fontSize="small">shopping_cart</Icon>,
    route: "/product-tables",
    component: <ProductTables />,
  },
  {
    type: "collapse",
    name: "Service Tables",
    key: "service-tables",
    icon: <Icon fontSize="small">build</Icon>,
    route: "/service-tables",
    component: <ServiceTables />,
  },
  {
    type: "collapse",
    name: "Transactions",
    key: "billing",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/billing",
    component: <Billing />,
  },
  // {
  //   type: "collapse",
  //   name: "Notifications",
  //   key: "notifications",
  //   icon: <Icon fontSize="small">notifications</Icon>,
  //   route: "/notifications",
  //   component: <Notifications />,
  // },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
  },
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />,
  },
];

export default routes;
