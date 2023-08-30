import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  Collapse,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import { Upload as UploadIcon, Close as CloseIcon } from "@mui/icons-material";
import Api from "../../Api";
import Download from "../download";
import Toast from "../Toast/Toast";

export default function SiswaImport({ isImport, onClose, setRefresh }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isFileSelected, setIsFileSelected] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setIsFileSelected(true);
  };

  const handleImport = async () => {
    if (selectedFile) {
      let formData = new FormData();
      formData.append("excelFile", selectedFile);
      try {
        let res = await Api.post("/siswa/import", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setSelectedFile(null);
        setIsFileSelected(false);
        setRefresh(true);
        onClose(false);
        Toast({ message: "Data siswa berhasil diimport", type: "success" });
      } catch (error) {
        let message = error?.response?.data?.message;
        console.log(message);
        Toast({
          message: `Data element gagal diimport ,\n${message}`,
          type: "error",
        });
      }
    }
  };

  return (
    <Collapse in={isImport}>
      <Card variant="elevation" sx={{ p: 0 }}>
        <Box sx={{ padding: "15px 30px" }} display="flex" alignItems="center">
          <Box flexGrow={1} justifyContent="space-between" display="flex">
            <Typography sx={{ fontSize: "18px", fontWeight: "500" }}>
              Import File Excel
            </Typography>
            <IconButton size="small" onClick={() => onClose(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
        <Divider />
        <CardContent sx={{ padding: "30px" }}>
          <Box
            display={"flex"}
            gap={"10px"}
            justifyContent={"start"}
            alignItems={"start"}
            flexWrap={"wrap"}
          >
            <Download link={"/siswaTemplate.xlsx"} />
            <Box display={"flex"} gap={"10px"}>
              <input
                accept=".xlsx, .xls"
                style={{ display: "none" }}
                id="file-upload"
                type="file"
                onChange={handleFileChange}
              />
              <label htmlFor="file-upload">
                <Button
                  sx={{ whiteSpace: "nowrap" }}
                  variant="contained"
                  component="span"
                  startIcon={<UploadIcon />}
                >
                  Pilih File
                </Button>
              </label>
              {isFileSelected && (
                <Typography
                  sx={{ whiteSpace: "nowrap", color: "green", mt: 1 }}
                  variant="body2"
                >
                  {selectedFile?.name}
                </Typography>
              )}
            </Box>

            {selectedFile && (
              <Button
                variant="contained"
                onClick={handleImport}
                color="success"
              >
                Import
              </Button>
            )}
          </Box>
        </CardContent>
      </Card>
    </Collapse>
  );
}
