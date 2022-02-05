import Dashboard from "views/app-view/Dashboard.js";
import Icons from "views/app-view/Icons.js";
import Classroom from "views/app-view/Classroom/Classroom";
import CreateClassroom from "views/app-view/Classroom/CreateClassroom";
import ViewClassroom from "views/app-view/Classroom/ViewClassroom";
import EditClassroom from "views/app-view/Classroom/EditClassroom";
import ViewStudent from "views/app-view/Classroom/ViewStudent";
import ModuleStudentsLessonScoreTable from "views/app-view/Classroom/ScoreDataTable/ModuleStudentsLessonScoreTable";

import Module from "./views/app-view/Module/Module";
import CreateMyModule from "./views/app-view/Module/CreateMyModule";
import EditMyModule from "./views/app-view/Module/EditMyModule";
import CreatePresetModule from "./views/app-view/Module/CreatePresetModule";
import EditPresetModule from "./views/app-view/Module/EditPresetModule";

import Quiz from "views/app-view/Quiz/Quiz.js";
import ViewQuiz from "views/app-view/Quiz/ViewQuiz.js";
import CreateQuiz from "views/app-view/Quiz/CreateQuiz.js";
import EditQuiz from "views/app-view/Quiz/EditQuiz";
import AssignQuiz from "views/app-view/Quiz/AssignQuiz";

import ViewModule from "views/app-view/Classroom/ViewModule"
import ModuleStudents from "views/app-view/Classroom/ModuleStudents";

import TableList from "views/app-view/TableList.js";
import TestAntDesign from "./views/app-view/TestAntDesign";
import UserProfile from "views/app-view/UserProfile";

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
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "nc-icon nc-attach-87",
  //   component: Icons,
  //   layout: "/admin",
  //   renderSidebar: true,
  //   isExact: false,
  // },
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
    path: "/classroom/edit/:class_code",
    name: "Classroom",
    icon: "nc-icon nc-notes",
    component: EditClassroom,
    layout: "/admin",
    renderSidebar: false,
    isExact: false,
  },
  {
    path: "/classroom/:class_code/student/:student_enrolled_id",
    name: "View Student",
    icon: "",
    component: ViewStudent,
    layout: "/admin",
    renderSidebar: false,
    isExact: true,
  },
  {
    path: "/classroom/:class_code/module/:module_id",
    name: "View Module",
    icon: "",
    component: ViewModule,
    layout: "/admin",
    renderSidebar: false,
    isExact: true,
  },
  {
    path: "/classroom/:class_code/module/:module_id",
    name: "View Module Student",
    icon: "",
    component: ModuleStudents,
    layout: "/admin",
    renderSidebar: false,
    isExact: true,
  },
  {
    path: "/classroom/:class_code/module/:module_id/lesson/:module_lesson_id",
    name: "View Module Student",
    icon: "",
    component: ModuleStudentsLessonScoreTable,
    layout: "/admin",
    renderSidebar: false,
    isExact: true,
  },
  {
    path: "/module",
    name: "Module",
    icon: "nc-icon nc-paper-2",
    component: Module,
    layout: "/admin",
    renderSidebar: true,
    isExact: true,
  },
  {
    path: "/module/create-my-module",
    name: "My Module",
    icon: "",
    component: CreateMyModule,
    layout: "/admin",
    renderSidebar: false,
    isExact: true,
  },
  {
    path: "/module/edit-my-module/:module_id",
    name: "Edit My Module",
    icon: "",
    component: EditMyModule,
    layout: "/admin",
    renderSidebar: false,
    isExact: true,
  },
  {
    path: "/module/create-preset-module",
    name: "Preset Module",
    icon: "",
    component: CreatePresetModule,
    layout: "/admin",
    renderSidebar: false,
    isExact: true,
  },
  {
    path: "/module/edit-preset-module/:module_id",
    name: "Edit Preset Module",
    icon: "",
    component: EditPresetModule,
    layout: "/admin",
    renderSidebar: false,
    isExact: true,
  },
  {
    path: "/quiz",
    name: "Quiz",
    icon: "nc-icon nc-attach-87",
    component: Quiz,
    layout: "/admin",
    renderSidebar: true,
    isExact: true,
  },
  {
    path: "/quiz/view/:quiz_code",
    name: "View Quiz",
    icon: "nc-icon nc-attach-87",
    component: ViewQuiz,
    layout: "/admin",
    renderSidebar: false,
    isExact: false,
  },
  {
    path: "/quiz/create-new",
    name: "Create Quiz",
    icon: "nc-icon nc-attach-87",
    component: CreateQuiz,
    layout: "/admin",
    renderSidebar: false,
    isExact: false,
  },
  {
    path: "/quiz/edit/:quiz_code",
    name: "Edit Quiz",
    icon: "nc-icon nc-attach-87",
    component: EditQuiz,
    layout: "/admin",
    renderSidebar: false,
    isExact: false,
  },
  {
    path: "/quiz/assign/:Qid",
    name: "Assign Quiz",
    icon: "nc-icon nc-attach-87",
    component: AssignQuiz,
    layout: "/admin",
    renderSidebar: false,
    isExact: false,
  },
  {
    path: "/user",
    name: "User Profile",
    icon: null,
    component: UserProfile,
    layout: "/admin",
    renderSidebar: false,
    isExact: true,
  },
];

export default dashboardRoutes;
