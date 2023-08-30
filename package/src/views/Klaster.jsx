import React, { useEffect, useState } from "react";

import { Card, CardContent, Box, Typography, Button } from "@mui/material";
import KlasterTable from "../components/tables/KlasterTable";
import Api from "../Api";
import Toast from "../components/Toast/Toast";
import KlasterForm from "../components/Forms/Klaster";
import KlasterImport from "../components/import/klasterImport";
import { Add, Upload } from "@mui/icons-material";
import Delete from "../components/Confirm/delete";

const Klaster = () => {
  const [Klaster, setKlaster] = useState([]);
  const [KlasterEdit, setKlasterEdit] = useState({});
  const [Method, setMethod] = useState(undefined);
  const [Open, setOpen] = useState(false);
  const [RefreshData, setRefreshData] = useState(false);
  const [Display, setDisplay] = useState(false);
  const [IsImport, setIsImport] = useState(false);
  const [OpenHapus, setOpenHapus] = useState(false);
  const [Id, setId] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        let data = await Api.get("/klaster");
        setKlaster(data?.data?.data);
      } catch (error) {
        if (!Display) {
          setDisplay(true);
          Toast({
            message: "Terjadi Kesalahan Pada Server Klaster",
            type: "error",
          });
        }
      }
    })();
  }, [RefreshData]);
  console.log(Klaster);
  return (
    <Box>
      <KlasterForm
        setOpen={setOpen}
        Open={Open}
        KlasterEdit={KlasterEdit}
        Method={Method}
        setRefreshData={setRefreshData}
        RefreshData={RefreshData}
        setKlasterEdit={setKlasterEdit}
        setDisplay={setDisplay}
        Display={Display}
      />
      <KlasterImport
        setRefresh={setRefreshData}
        isImport={IsImport}
        onClose={setIsImport}
      />
      <Delete
        url="klaster"
        RefreshData={RefreshData}
        setRefreshData={setRefreshData}
        Id={Id}
        OpenHapus={OpenHapus}
        setOpenHapus={setOpenHapus}
      />
      <Card variant="elevation">
        <CardContent>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Typography variant="h3">Data Klaster </Typography>
            <Box display={"flex"} justifyContent={"end"} gap={"10px"}>
              <Button
                variant="contained"
                onClick={() => {
                  setOpen(true);
                  setMethod("Tambah");
                }}
                color="success"
                startIcon={<Add />}
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
            <KlasterTable
              Klaster={Klaster}
              setKlasterEdit={setKlasterEdit}
              setMethod={setMethod}
              setOpen={setOpen}
              setOpenHapus={setOpenHapus}
              setId={setId}
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Klaster;
