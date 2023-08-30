import React from "react";
import {
  Card,
  CardContent,
  Divider,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Collapse,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import Api from "../../../Api";
import Toast from "../../Toast/Toast";

const JurusanForm = (props) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    let nama = e.target.nama.value;
    let kode = e.target.kode.value;
    let id = props.JurusanEdit?.id;

    try {
      if (props.Method === "Edit")
        await Api.put(`/jurusan/${id}`, { nama, kode });
      if (props.Method === "Tambah") await Api.post(`/jurusan`, { nama, kode });
      Toast({
        message: `Data Jurusan berhasil di ${props.Method} `,
        type: "success",
      });
      props.setOpen(false);
      props.setRefreshData(!props?.RefreshData);
      props?.setJurusanEdit({});
    } catch (error) {
      switch (error?.response?.status) {
        case 400:
          Toast({ message: "Validasi Error, Field Required", type: "error" });
          break;
        default:
          break;
      }
    }
  };

  const handleFormClose = () => {
    props.setOpen(false);
    props.setJurusanEdit({});
  };

  return (
    <Dialog maxWidth="xl" open={props?.Open} onClose={handleFormClose}>
      <DialogTitle>
        <Typography>Form {props?.Method}</Typography>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Grid
            container
            spacing={1}
            sx={{ display: "flex", alignItems: "stretch" }}
          >
            <Grid xs={12} item lg={12} sm={12}>
              <TextField
                required
                defaultValue={props.JurusanEdit?.nama}
                id="default-value"
                label="Nama Jurusan"
                variant="outlined"
                fullWidth
                name="nama"
                size="small"
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid xs={12} lg={12} item sm={12}>
              <TextField
                required
                defaultValue={props.JurusanEdit?.kode}
                id="email-text"
                label="Kode Jurusan"
                type="text"
                variant="outlined"
                fullWidth
                name="kode"
                size="small"
                sx={{ mb: 2 }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleFormClose}>
            Batal
          </Button>
          <Button color="primary" type="submit">
            {props.Method}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
  return (
    <Collapse in={props.Open}>
      <Card variant="outlined" sx={{ p: 0 }}>
        <Box sx={{ padding: "15px 30px" }} display="flex" alignItems="center">
          <Box flexGrow={1} justifyContent={"space-between"} display={"flex"}>
            <Typography sx={{ fontSize: "18px", fontWeight: "500" }}>
              Form {props?.Method}
            </Typography>
            <IconButton size="small" onClick={handleFormClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
        <Divider />
        <CardContent sx={{ padding: "30px" }}>
          {props.Open && (
            <form onSubmit={handleSubmit}>
              <Grid
                container
                spacing={1}
                sx={{ display: "flex", alignItems: "stretch" }}
              >
                <Grid xs={12} item lg={6} sm={6}>
                  <TextField
                    defaultValue={props.JurusanEdit?.nama}
                    id="default-value"
                    label="Nama Jurusan"
                    variant="outlined"
                    fullWidth
                    name="nama"
                    size="small"
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid xs={12} lg={6} item sm={6}>
                  <TextField
                    defaultValue={props.JurusanEdit?.kode}
                    id="email-text"
                    label="Kode Jurusan"
                    type="text"
                    variant="outlined"
                    fullWidth
                    name="kode"
                    size="small"
                    sx={{ mb: 2 }}
                  />
                </Grid>
              </Grid>
              <div>
                <Button type="submit" color="primary" variant="contained">
                  {props.Method}
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </Collapse>
  );
};

export default JurusanForm;
