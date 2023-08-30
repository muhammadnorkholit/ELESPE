import React, { useEffect, useState } from "react";

import { Card, CardContent, Box, Typography, Button } from "@mui/material";
import SiswaTable from "../components/tables/SiswaTable";
import SiswaFilter from "../components/Filter/SiswaFilter";
import Api from "../Api";
import SiswaForm from "../components/Forms/Siswa";
import SiswaImport from "../components/import/SiswaImport";
import AddIcon from "@mui/icons-material/Add";
import Upload from "@mui/icons-material/Upload";

const Siswa = () => {
  const [Siswa, setSiswa] = useState([]);
  const [SiswaEdit, setSiswaEdit] = useState({});
  const [Method, setMethod] = useState(undefined);
  const [Open, setOpen] = useState(false);
  const [RefreshData, setRefreshData] = useState(false);
  const [Display, setDisplay] = useState(false);
  const [IsImport, setIsImport] = useState(false);
  return (
    <Box>
      <SiswaFilter Callback={setSiswa} />
      <SiswaForm
        setOpen={setOpen}
        Open={Open}
        SiswaEdit={SiswaEdit}
        Method={Method}
        setRefreshData={setRefreshData}
        RefreshData={RefreshData}
        setSiswaEdit={setSiswaEdit}
        setSiswa={setSiswa}
      />
      <SiswaImport
        setRefresh={setRefreshData}
        isImport={IsImport}
        onClose={setIsImport}
      />
      <Card variant="elevation">
        <CardContent>
          <Box display={"flex"} justifyContent={"space-between"}>
            {" "}
            <Typography variant="h3">Data Siswa </Typography>
            <Box display={"flex"} justifyContent={"end"}>
              <Button
                variant="contained"
                onClick={() => {
                  setOpen(true);
                  setMethod("Tambah");
                }}
                color="success"
                startIcon={<AddIcon />}
              >
                Tambah
              </Button>
              <Button
                sx={{ marginLeft: "10px" }}
                variant="contained"
                onClick={() => {
                  setIsImport(true);
                }}
                color="primary"
                startIcon={<Upload />}
              >
                Import
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              overflow: {
                xs: "auto",
                sm: "unset",
              },
            }}
          >
            <SiswaTable
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

export default Siswa;
