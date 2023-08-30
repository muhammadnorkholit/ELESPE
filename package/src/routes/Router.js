import { lazy } from "react";
import { Navigate } from "react-router-dom";
import Jurusan from "../views/Jurusan.jsx";
import Siswa from "../views/Siswa.jsx";
import Element from "../views/Element.jsx";
import Klaster from "../views/Klaster.jsx";
import Penilaian from "../views/Penilaian.jsx";
import Login from "../views/Login.jsx";
import ServerErrorPage from "../views/errors/500.jsx";
import KenaikanKelulusan from "../views/KenaikanKelulusan.jsx";
import Alumni from "../views/Alumni.jsx";
import Api from "../Api.js";
import Penguji from "../views/Penguji.jsx";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout/FullLayout.js"));
/****End Layouts*****/

/*****Pages******/
const Dashboard1 = lazy(() => import("../views/dashboards/Dashboard1.js"));

/*****Tables******/
const BasicTable = lazy(() => import("../views/tables/BasicTable.js"));

// form elements
const ExAutoComplete = lazy(() =>
  import("../views/FormElements/ExAutoComplete.js")
);
const ExButton = lazy(() => import("../views/FormElements/ExButton.js"));
const ExCheckbox = lazy(() => import("../views/FormElements/ExCheckbox.js"));
const ExRadio = lazy(() => import("../views/FormElements/ExRadio.js"));
const ExSlider = lazy(() => import("../views/FormElements/ExSlider.js"));
const ExSwitch = lazy(() => import("../views/FormElements/ExSwitch.js"));
// form layouts
const FormLayouts = lazy(() => import("../views/FormLayouts/FormLayouts.js"));

/*****Routes******/

let isAdmin = JSON.parse(sessionStorage.getItem("user"))?.isAdmin | false;
const previousUrl = document.referrer;
const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="login" /> },
      { path: "/dashboards", exact: true, element: <Dashboard1 /> },
      {
        path: "/jurusan",
        element: <Jurusan />,
      },
      {
        path: "/siswa",
        element: <Siswa />,
      },
      {
        path: "/element",
        element: <Element />,
      },
      {
        path: "/klaster",
        element: <Klaster />,
      },
      { path: "/penilaian", element: <Penilaian /> },
      {
        path: "/kenaikankelulusan",
        element: <KenaikanKelulusan />,
      },
      {
        path: "/alumni",
        element: <Alumni />,
      },
      {
        path: "/penguji",
        element: <Penguji />,
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/error", element: <ServerErrorPage /> },
];

export default ThemeRoutes;
