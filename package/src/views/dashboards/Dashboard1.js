import React, { useEffect, useState } from "react";
import { Grid, Box, Button } from "@mui/material";

import { BlogCard } from "./dashboard1-components";
import CardInfoTotalData from "../../components/cardDashboard";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import Api from "../../Api";
import {
  GroupAddTwoTone,
  School,
  Star,
  StarBorderOutlined,
} from "@mui/icons-material";
const Dashboard1 = () => {
  const [Count, setCount] = useState({ jurusan: 0, siswa: 0, klaster: 0 });

  useEffect(() => {
    getDataCount();
  }, []);

  const getDataCount = async () => {
    try {
      const count = await Api.get("/count", {
        withCredentials: true,
      });
      setCount(count?.data);
    } catch (error) {
      Error(error?.response);
    }
  };
  return (
    <Box>
      <Grid container spacing={0}>
        {/* ------------------------- row 1 ------------------------- */}
        <Grid item xs={12} lg={3}>
          <CardInfoTotalData
            url={"/siswa"}
            title="Total Siswa"
            count={Count?.siswa}
            bg={{ background: "#fc4b6c" }}
            iconColor={{ background: "#fc4b6c" }}
            icon={
              <PeopleOutlineOutlinedIcon
                style={{ fontSize: 30, color: "white" }}
              />
            }
          />
        </Grid>
        {/* ------------------------- row 2 ------------------------- */}
        <Grid item xs={12} lg={3}>
          <CardInfoTotalData
            url={"/jurusan"}
            title="Total Jurusan"
            count={Count?.jurusan}
            bg={{ background: "#1a97f5" }}
            iconColor={{ background: "#3498db" }}
            icon={<School style={{ fontSize: 30, color: "white" }} />}
          />
        </Grid>

        <Grid item xs={12} lg={3}>
          <CardInfoTotalData
            url={"/klaster"}
            title="Total Klaster"
            count={Count?.klaster}
            iconColor={{ background: "#39cb7f" }}
            bg={{ background: "#39cb7f" }}
            icon={
              <StarBorderOutlined style={{ fontSize: 30, color: "white" }} />
            }
          />
        </Grid>
        <Grid item xs={12} lg={3}>
          <CardInfoTotalData
            url={"/penguji"}
            title="Total Penguji"
            count={Count?.penguji}
            iconColor={{ background: "#fdd43f" }}
            bg={{ background: "#39cb7f" }}
            icon={<GroupAddTwoTone style={{ fontSize: 30, color: "white" }} />}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard1;
