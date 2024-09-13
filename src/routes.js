import UserTables from "layouts/user-tables";
import ProductTables from "layouts/product-tables";
import ServiceTables from "layouts/service-tables";
import CustomerTable from "layouts/customers-tables";
import SignIn from "layouts/authentication/sign-in";
// Other imports remain the same
import Dashboard from "layouts/dashboard";
import Billing from "layouts/billing";
import Profile from "layouts/profile";

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
    name: "Products",
    key: "product-tables",
    icon: <Icon fontSize="small">shopping_cart</Icon>,
    route: "/product-tables",
    component: <ProductTables />,
  },
  {
    type: "collapse",
    name: "Services",
    key: "service-tables",
    icon: <Icon fontSize="small">build</Icon>,
    route: "/service-tables",
    component: <ServiceTables />,
  },
  {
    type: "collapse",
    name: "Users",
    key: "user-tables",
    icon: <Icon fontSize="small">people</Icon>,
    route: "/user-tables",
    component: <UserTables />,
  },
  {
    type: "collapse",
    name: "Customers",
    key: "customers-tables",
    icon: <Icon fontSize="small">people</Icon>,
    route: "/customers-tables",
    component: <CustomerTable />,
  },
  {
    type: "collapse",
    name: "Transactions",
    key: "billing",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/billing",
    component: <Billing />,
  },
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
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
];

export default routes;
