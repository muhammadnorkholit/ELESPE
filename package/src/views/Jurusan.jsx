import React, { useEffect, useState } from "react";

import { Card, CardContent, Box, Typography, Button } from "@mui/material";
import JurusanTable from "../components/tables/JurusanTable";
import Api from "../Api";
import JurusanForm from "../components/Forms/Jurusan";
import Toast from "../components/Toast/Toast";
import JurusanImport from "../components/import/JurusanImport";
import { Add, Upload } from "@mui/icons-material";
import Delete from "../components/Confirm/delete";

const Jurusan = () => {
  const [Jurusan, setJurusan] = useState([]);
  const [JurusanEdit, setJurusanEdit] = useState({});
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
        let data = await Api.get("/jurusan");
        setJurusan(data?.data?.data);
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
      <JurusanForm
        setOpen={setOpen}
        Open={Open}
        JurusanEdit={JurusanEdit}
        Method={Method}
        setRefreshData={setRefreshData}
        RefreshData={RefreshData}
        setJurusanEdit={setJurusanEdit}
      />
      <JurusanImport
        setRefresh={setRefreshData}
        isImport={IsImport}
        onClose={setIsImport}
      />
      <Delete
        url="jurusan"
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
              Data Jurusan
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
            <JurusanTable
              setJurusanEdit={setJurusanEdit}
              setMethod={setMethod}
              Jurusan={Jurusan}
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

export default Jurusan;
