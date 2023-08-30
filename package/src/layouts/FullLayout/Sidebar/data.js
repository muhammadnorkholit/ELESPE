import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import { Group, Remove, Update } from "@mui/icons-material";
import { ListAltOutlined, School, Assignment, Star } from "@mui/icons-material";

const Menuitems = [
  {
    title: "Dashboard",
    icon: DashboardOutlinedIcon,
    href: "/dashboards",
    onlyAdmin: false,
    hasSub: false,
  },
  {
    title: "Penilaian Siswa",
    icon: Assignment,
    href: "/penilaian",
    onlyAdmin: false,
    hasSub: false,
  },
  {
    title: "Jurusan",
    icon: School,
    href: "/jurusan",
    onlyAdmin: true,
    hasSub: false,
  },
  {
    title: "Klaster",
    icon: Star,
    href: "/klaster",
    onlyAdmin: true,
    hasSub: false,
  },
  {
    title: "Element",
    icon: ListAltOutlined,
    href: "/element",
    onlyAdmin: true,
    hasSub: false,
  },
  {
    title: "Siswa",
    icon: Group,
    href: "/",
    onlyAdmin: true,
    hasSub: true,
    submenu: [
      {
        title: "Data Siswa",
        href: "/siswa",
        icon: Remove,
      },

      {
        title: "Kenaikan dan kelulusan Siswa",
        href: "/kenaikankelulusan",
        icon: Remove,
      },
      {
        title: "Alumni",
        href: "/alumni",
        icon: Remove,
      },

      // Add more submenu items as needed
    ],
  },
  {
    title: "Penguji",
    icon: ListAltOutlined,
    href: "/penguji",
    onlyAdmin: true,
    hasSub: false,
  },
  // {
  //   title: "Autocomplete",
  //   icon: AddToPhotosOutlinedIcon,
  //   href: "/form-elements/autocomplete",
  // },
  // {
  //   title: "Buttons",
  //   icon: AspectRatioOutlinedIcon,
  //   href: "/form-elements/button",
  // },
  // {
  //   title: "Checkbox",
  //   icon: AssignmentTurnedInOutlinedIcon,
  //   href: "/form-elements/checkbox",
  // },
  // {
  //   title: "Radio",
  //   icon: AlbumOutlinedIcon,
  //   href: "/form-elements/radio",
  // },
  // {
  //   title: "Slider",
  //   icon: SwitchCameraOutlinedIcon,
  //   href: "/form-elements/slider",
  // },
  // {
  //   title: "Switch",
  //   icon: SwitchLeftOutlinedIcon,
  //   href: "/form-elements/switch",
  // },
  // {
  //   title: "Form",
  //   icon: DescriptionOutlinedIcon,
  //   href: "/form-layouts/form-layouts",
  // },
  // {
  //   title: "Table",
  //   icon: AutoAwesomeMosaicOutlinedIcon,
  //   href: "/tables/basic-table",
  // },
];

export default Menuitems;
