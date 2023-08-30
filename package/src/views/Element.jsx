import React, { useEffect, useState } from "react";

import { Card, CardContent, Box, Typography, Button } from "@mui/material";
import ElementTable from "../components/tables/ElementTable";
import Api from "../Api";
import Toast from "../components/Toast/Toast";
import ElementForm from "../components/Forms/Element";
import ElementImport from "../components/import/elementImport";
import Delete from "../components/Confirm/delete";
import { Add, Upload } from "@mui/icons-material";

const Element = () => {
  const [Element, setElement] = useState([]);
  const [ElementEdit, setElementEdit] = useState({});
  const [Method, setMethod] = useState(undefined);
  const [Open, setOpen] = useState(false);
  const [OpenHapus, setOpenHapus] = useState(false);
  const [Id, setId] = useState(null);
  const [RefreshData, setRefreshData] = useState(false);
  const [IsImport, setIsImport] = useState(false);

  let display = false;
  useEffect(() => {
    (async () => {
      try {
        let data = await Api.get("/element");
        setElement(data?.data?.data);
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
      <ElementForm
        setOpen={setOpen}
        Open={Open}
        ElementEdit={ElementEdit}
        Method={Method}
        setRefreshData={setRefreshData}
        RefreshData={RefreshData}
        setElementEdit={setElementEdit}
      />
      <ElementImport
        setRefresh={setRefreshData}
        isImport={IsImport}
        onClose={setIsImport}
      />

      <Delete
        url="element"
        RefreshData={RefreshData}
        setRefreshData={setRefreshData}
        Id={Id}
        OpenHapus={OpenHapus}
        setOpenHapus={setOpenHapus}
      />
      <Card variant="elevation">
        <CardContent>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Typography variant="h3">Data Element </Typography>
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
            <ElementTable
              Element={Element}
              setElementEdit={setElementEdit}
              setMethod={setMethod}
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

export default Element;
