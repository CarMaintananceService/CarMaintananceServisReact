/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/** 
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
//import Billing from "layouts/billing";
//import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
//import SignUp from "layouts/authentication/sign-up";
import StockMovements from "layouts/stockMovements";
import RepairActivity from "layouts/repairActivity";

// @mui icons
import Icon from "@mui/material/Icon";
import Vehicles from "layouts/vehicles";
import Units from "layouts/units";
import StockCards from "layouts/stockCards";
import VehicleBrands from "layouts/vehicleBrand";
import StockCardBrands from "layouts/stockCardBrand";
import StockCardUnit from "layouts/stockCardUnit";
import VehicleType from "layouts/vehicleType";
import Manufacturer from "layouts/manufacturer";
import CaseType from "layouts/caseType";
import Firms from "layouts/firms";
import OutSourceLabor from "layouts/outSourceLabor";
import ProductGroup from "layouts/productGroup";
import { TreeView } from "devextreme-react";
import treeview from "layouts/productGroup";
import { Children } from "react";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  // {
  //   type: "collapse",
  //   name: "Tables",
  //   key: "tables",
  //   icon: <Icon fontSize="small">table_view</Icon>,
  //   route: "/tables",
  //   component: <Tables />,
  // },
  {
    type: "collapse",
    name: "Vehicles",
    key: "vehicles",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/vehicles",
    component: <Vehicles />,
    children: [
      {
        name: "Units",
        key: "units",
        route: "/vehicles",
        component: <Vehicles />,
      },
    ],
  },
  {
    type: "collapse",
    name: "VehicleBrands",
    key: "vehicleBrands",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/vehicleBrand",
    component: <VehicleBrands />,
  },
  {
    type: "collapse",
    name: "VehicleType",
    key: "vehicleType",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/vehicleType",
    component: <VehicleType />,
  },
  {
    type: "collapse",
    name: "CaseType",
    key: "caseType",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/caseType",
    component: <CaseType />,
  },
  {
    type: "collapse",
    name: "Units",
    key: "units",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/units",
    component: <Units />,
  },
  {
    type: "collapse",
    name: "StockCards",
    key: "stockCards",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/stockCards",
    component: <StockCards />,
  },
  {
    type: "collapse",
    name: "StockCardUnit",
    key: "stockCardUnit",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/stockCardUnit",
    component: <StockCardUnit />,
  },
  {
    type: "collapse",
    name: "StockCardBrands",
    key: "stockCardBrands",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/stockCardBrand",
    component: <StockCardBrands />,
  },
  {
    type: "collapse",
    name: "StockMovements",
    key: "stockMovements",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/stockMovements",
    component: <StockMovements />,
  },
  {
    type: "collapse",
    name: "Firm",
    key: "firm",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/firms",
    component: <Firms />,
  },
  {
    type: "collapse",
    name: "ProductGroup",
    key: "productGroup",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/productGroup",
    component: <ProductGroup />,
  },
  {
    type: "collapse",
    name: "Manufacturer",
    key: "manufacturer",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/manufacturer",
    component: <Manufacturer />,
  },
  {
    type: "collapse",
    name: "OutSourceLabor",
    key: "outSourceLabor",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/outSourceLabor",
    component: <OutSourceLabor />,
  },
  {
    type: "collapse",
    name: "RepairActivity",
    key: "repairActivity",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/repairActivity",
    component: <RepairActivity />,
  },
  // {
  //   type: "collapse",
  //   name: "Billing",
  //   key: "billing",
  //   icon: <Icon fontSize="small">receipt_long</Icon>,
  //   route: "/billing",
  //   component: <Billing />,
  // },
  // {
  //   type: "collapse",
  //   name: "RTL",
  //   key: "rtl",
  //   icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
  //   route: "/rtl",
  //   component: <RTL />,
  // },
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
    name: "Settings",
    key: "settings",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/settings",
    component: <index />,
  },
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/login",
    component: <SignIn />,
  },
  // {
  //   type: "collapse",
  //   name: "Sign Up",
  //   key: "sign-up",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "/authentication/sign-up",
  //   component: <SignUp />,
  // },
];

export default routes;
