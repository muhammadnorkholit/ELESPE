import React, { useEffect, useState } from "react";

import { Card, CardContent, Box, Typography, Button } from "@mui/material";
import PengujiTable from "../components/tables/PengujiTable";
import Api from "../Api";
import PengujiForm from "../components/Forms/Penguji";
import Toast from "../components/Toast/Toast";
import PengujiImport from "../components/import/PengujiImport";
import { Add, Upload } from "@mui/icons-material";
import Delete from "../components/Confirm/delete";

const Penguji = () => {
  const [Penguji, setPenguji] = useState([]);
  const [PengujiEdit, setPengujiEdit] = useState({});
  const [Method, setMethod] = useState(undefined);
  const [Open, setOpen] = useState(false);
  const [IsImport, setIsImport] = useState(false);
  const [RefreshData, setRefreshData] = useState(false);
  const [OpenHapus, setOpenHapus] = useState(false);
  const [Id, setId] = useState(null);
  let display = false;
  useEffect(() => {
    (async () => {
      try {
        let data = await Api.get("/penguji");
        setPenguji(data?.data?.data);
      } catch (error) {
        if (!display) {
          Toast({ message: "Terjadi Kesalahan Pada Server", type: "error" });
          display = true;
        }
      }
    })();
  }, [RefreshData]);
  return (
    <Box>
      <PengujiForm
        setOpen={setOpen}
        Open={Open}
        PengujiEdit={PengujiEdit}
        Method={Method}
        setRefreshData={setRefreshData}
        RefreshData={RefreshData}
        setPengujiEdit={setPengujiEdit}
      />
      <PengujiImport
        setRefresh={setRefreshData}
        isImport={IsImport}
        onClose={setIsImport}
      />
      <Delete
        url="penguji"
        RefreshData={RefreshData}
        setRefreshData={setRefreshData}
        Id={Id}
        OpenHapus={OpenHapus}
        setOpenHapus={setOpenHapus}
      />
      <Card variant="elevation">
        <CardContent>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Typography variant="h3" mb={"10px"}>
              Data Penguji
            </Typography>
            <Box display={"flex"} justifyContent={"end"}>
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
            <PengujiTable
              setPengujiEdit={setPengujiEdit}
              setMethod={setMethod}
              Penguji={Penguji}
              setOpen={setOpen}
              setIsImport={setIsImport}
              setOpenHapus={setOpenHapus}
              setId={setId}
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Penguji;
