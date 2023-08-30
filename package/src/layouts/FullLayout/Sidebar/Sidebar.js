import React from "react";
import { useLocation } from "react-router";
import { Link, NavLink } from "react-router-dom";
import {
  Box,
  Drawer,
  useMediaQuery,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { SidebarWidth } from "../../../assets/global/Theme-variable";
import LogoIcon from "../Logo/LogoIcon";
import Menuitems from "./data";
import { useEffect } from "react";
import Api from "../../../Api";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import styled from "@emotion/styled";

const Sidebar = (props) => {
  const [open, setOpen] = React.useState(true);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const { pathname } = useLocation();
  const pathDirect = pathname;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  useEffect(() => {
    (async () => {
      try {
        const data = await Api.get("/user");
        setIsAdmin(data?.data?.user?.isAdmin);
        //  if (!data?.data?.isLoggedIn) navigate("/login");
      } catch (error) {
        //  navigate("/error");
      }
    })();
  }, []);
  const handleClick = (index) => {
    if (open === index) {
      setOpen((prevopen) => !prevopen);
    } else {
      setOpen(index);
    }
  };
  const renderSubMenu = (submenuItems) => {
    return (
      <List disablePadding>
        {submenuItems.map((item) => (
          <ListItem
            key={item.title}
            button
            component={NavLink}
            to={item.href}
            selected={pathDirect === item.href}
            sx={{
              pl: 4,
              mb: 1,
              ...(pathDirect === item.href && {
                color: "white",
                backgroundColor: (theme) =>
                  `${theme.palette.primary.main}!important`,
              }),
            }}
          >
            <ListItemIcon
              sx={{
                ...(pathDirect === item.href
                  ? { color: "white" }
                  : { color: "#525457" }),
              }}
            >
              <item.icon width="20" height="20" />
            </ListItemIcon>
            <ListItemText>{item.title}</ListItemText>
          </ListItem>
        ))}
      </List>
    );
  };
  const ArrowDropUpIcon = styled(ArrowDropDownIcon)({
    transform: "rotate(180deg)",
  });

  const SidebarContent = (
    <Box sx={{ p: 3, height: "calc(100vh )", backgroundColor: "#233044" }}>
      <Link to="/">
        <Box sx={{ display: "flex", alignItems: "Center" }}>
          <LogoIcon
            style={{ filter: "hue-rotate(0deg) saturate(0) brightness(1000%)" }}
          />
        </Box>
      </Link>

      <Box>
        <List sx={{ mt: 4 }}>
          {Menuitems.map((item, index) => {
            if (isAdmin === false && item.onlyAdmin === true) return null;

            return (
              <List
                component="li"
                sx={{
                  color: "white",
                }}
                disablePadding
                key={item.title}
              >
                {item.submenu ? (
                  <>
                    <ListItem
                      onClick={() => handleClick(index)}
                      button
                      sx={{
                        mb: 1,
                        color: "white",
                      }}
                    >
                      <ListItemIcon>
                        <item.icon
                          sx={{ color: "white" }}
                          width="20"
                          height="20"
                        />
                      </ListItemIcon>
                      <ListItemText>{item.title}</ListItemText>
                      {/* Show the dropdown icon */}
                      {open === index ? (
                        <ArrowDropUpIcon
                          color="#333b47"
                          sx={{ fontSize: 16 }}
                        />
                      ) : (
                        item.hasSub && (
                          <ArrowDropDownIcon sx={{ fontSize: 16 }} />
                        )
                      )}
                    </ListItem>
                    {open === index && renderSubMenu(item.submenu)}
                  </>
                ) : (
                  <ListItem
                    onClick={() => handleClick(index)}
                    button
                    component={NavLink}
                    to={item.href}
                    selected={pathDirect === item.href}
                    sx={{
                      mb: 1,
                      ...(pathDirect === item.href && {
                        color: "white",
                        backgroundColor: (theme) =>
                          `${theme.palette.primary.main}!important`,
                      }),
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        ...(pathDirect === item.href && { color: "white" }),
                      }}
                    >
                      <item.icon
                        sx={{ color: "white" }}
                        width="20"
                        height="20"
                      />
                    </ListItemIcon>
                    <ListItemText>{item.title}</ListItemText>
                  </ListItem>
                )}
              </List>
            );
          })}
        </List>
      </Box>
    </Box>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open={props.isSidebarOpen}
        variant="persistent"
        PaperProps={{
          sx: {
            width: SidebarWidth,
          },
        }}
      >
        {SidebarContent}
      </Drawer>
    );
  }
  return (
    <Drawer
      anchor="left"
      open={props.isMobileSidebarOpen}
      onClose={props.onSidebarClose}
      PaperProps={{
        sx: {
          width: SidebarWidth,
        },
      }}
      variant="temporary"
    >
      {SidebarContent}
    </Drawer>
  );
};

export default Sidebar;
