import Dashboard from "views/app-view/Dashboard.js";

import Classroom from "views/app-view/Classroom/Classroom";
import CreateClassroom from "views/app-view/Classroom/CreateClassroom";
import ViewClassroom from "views/app-view/Classroom/ViewClassroom";
import EditClassroom from "views/app-view/Classroom/EditClassroom";

import ViewModule from "views/app-view/Classroom/ViewModule"

import TableList from "views/app-view/TableList.js";
import TestAntDesign from "./views/app-view/TestAntDesign";
import UserProfileTest from "views/app-view/UserProfileTest";
import UserProfile from "views/app-view/UserProfileTest";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin",
    renderSidebar: true,
    isExact: false,
  },
  {
    path: "/classroom",
    name: "Classroom",
    icon: "nc-icon nc-notes",
    component: Classroom,
    layout: "/admin",
    renderSidebar: true,
    isExact: true,
  },
  {
    path: "/classroom/create-new",
    name: "New Classroom",
    icon: "",
    component: CreateClassroom,
    layout: "/admin",
    renderSidebar: false,
    isExact: false,
  },
  {
    path: "/classroom/:class_code",
    name: "View Classroom",
    icon: "",
    component: ViewClassroom,
    layout: "/admin",
    renderSidebar: false,
    isExact: true,
  },
  {
    path: "/classroom/edit/:id",
    name: "Classroom",
    icon: "nc-icon nc-notes",
    component: EditClassroom,
    layout: "/admin",
    renderSidebar: false,
    isExact: false,
  },
  {
    path: "/classroom/:class_code/:module_id",
    name: "View Module",
    icon: "",
    component: ViewModule,
    layout: "/admin",
    renderSidebar: false,
    isExact: true,
  },
  {
    path: "/user",
    name: "User Profile",
    icon: "nc-icon nc-circle-09",
    component: UserProfileTest,
    layout: "/admin",
    renderSidebar: false,
    isExact: true,
  },
  {
    path: "/user/1",
    name: "User Profile",
    icon: "nc-icon nc-circle-09",
    component: UserProfile,
    layout: "/admin",
    renderSidebar: false,
    isExact: false,
  },
];

export default dashboardRoutes;
