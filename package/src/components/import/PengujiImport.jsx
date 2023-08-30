import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Collapse,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { Upload as UploadIcon, Close as CloseIcon } from "@mui/icons-material";
import Api from "../../Api";
import Download from "../download";
import Toast from "../Toast/Toast";

export default function PengujiImport({ isImport, onClose, setRefresh }) {
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
        await Api.post("/penguji/import", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setSelectedFile(null);
        setIsFileSelected(false);
        setRefresh(true);
        Toast({ message: "Data penguji berhasil diimport", type: "success" });
      } catch (error) {
        Toast({ message: "Data penguji gagal diimport", type: "error" });
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
          <Grid container spacing={1}>
            <Grid item xs={12} display={"flex"} gap={"10px"} sm={6}>
              <Download link={"/pengujiTemplate.xlsx"} />
              <input
                accept=".xlsx, .xls"
                style={{ display: "none" }}
                id="file-upload"
                type="file"
                onChange={handleFileChange}
              />
              <label htmlFor="file-upload">
                <Button
                  variant="contained"
                  component="span"
                  startIcon={<UploadIcon />}
                >
                  Pilih File
                </Button>
              </label>
              {isFileSelected && (
                <Typography variant="body2" sx={{ color: "green", mt: 1 }}>
                  {selectedFile.name}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              {selectedFile && (
                <Button
                  variant="contained"
                  onClick={handleImport}
                  color="success"
                >
                  Import
                </Button>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Collapse>
  );
}
