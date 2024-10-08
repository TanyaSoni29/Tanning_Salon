import UserTables from "layouts/user-tables";
import ProductTables from "layouts/product-tables";
import ServiceTables from "layouts/service-tables";
import CustomerTable from "layouts/customers-tables";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
// Other imports remain the same
import Dashboard from "layouts/dashboard";
import Profile from "layouts/profile";
import Location from "layouts/location";
// @mui icons
import Icon from "@mui/material/Icon";
import Transaction from "layouts/Transactions";

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
    name: "Location",
    key: "locations",
    icon: <Icon fontSize="small">place</Icon>,
    route: "/locations",
    component: <Location />,
    protected: true,
  },
  {
    type: "collapse",
    name: "Products",
    key: "product-tables",
    icon: <Icon fontSize="small">shopping_cart</Icon>,
    route: "/product-tables",
    component: <ProductTables />,
    protected: true,
  },
  {
    type: "collapse",
    name: "Services",
    key: "service-tables",
    icon: <Icon fontSize="small">build</Icon>,
    route: "/service-tables",
    component: <ServiceTables />,
    protected: true,
  },
  {
    type: "collapse",
    name: "Users",
    key: "user-tables",
    icon: <Icon fontSize="small">people</Icon>,
    route: "/user-tables",
    component: <UserTables />,
    protected: true,
  },
  {
    type: "collapse",
    name: "Customers",
    key: "customers-tables",
    icon: <Icon fontSize="small">people</Icon>,
    route: "/customers-tables",
    component: <CustomerTable />,
    protected: true,
  },
  {
    type: "collapse",
    name: "Transactions",
    key: "transactions",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/transactions",
    component: <Transaction />,
    protected: true,
  },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
    protected: true,
  },
  {
    type: "collapse",
    name: "SignIn",
    key: "SignIn",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
    protected: false,
  },
  {
    type: "collapse",
    name: "SignUp",
    key: "SignUp",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />,
    protected: false,
  },
];

export default routes;
