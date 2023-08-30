import React, { useEffect, useState } from "react";

import { Card, CardContent, Box, Typography, Button } from "@mui/material";
import SiswaTable from "../components/tables/SiswaTable";
import SiswaFilter from "../components/Filter/SiswaFilter";
import Api from "../Api";
import SiswaForm from "../components/Forms/Siswa";
import SiswaImport from "../components/import/SiswaImport";
import AddIcon from "@mui/icons-material/Add";
import Upload from "@mui/icons-material/Upload";
import AlumniTable from "../components/tables/AlumniTable";

const Alumni = () => {
  const [Siswa, setSiswa] = useState([]);
  const [SiswaEdit, setSiswaEdit] = useState({});
  const [Method, setMethod] = useState(undefined);
  const [Open, setOpen] = useState(false);

  useEffect(() => {
    (async () => {
      let alumni = await Api.get("/siswa/alumni");
      console.log(alumni);
      setSiswa(alumni.data.data);
    })();
  }, []);
  console.log(Siswa);

  return (
    <Box>
      <Card variant="elevation">
        <CardContent>
          <Box display={"flex"} justifyContent={"space-between"}>
            {" "}
            <Typography variant="h3">Data Alumni </Typography>
          </Box>
          <Box
            sx={{
              overflow: {
                xs: "auto",
                sm: "unset",
              },
            }}
          >
            <AlumniTable
              Siswa={Siswa}
              setSiswaEdit={setSiswaEdit}
              setMethod={setMethod}
              setOpen={setOpen}
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Alumni;
