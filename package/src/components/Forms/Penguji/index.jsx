import React, { useEffect, useState } from "react";
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
  Autocomplete,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import Api from "../../../Api";
import Toast from "../../Toast/Toast";

const PengujiForm = (props) => {
  const [Jurusan, setJurusan] = useState([]);
  const [JurusanId, setJurusanId] = useState(props?.PengujiEdit?.id_jurusan);
  let display = true;
  useEffect(() => {
    (async () => {
      try {
        let jurusanRes = await Api.get("/jurusan");
        setJurusan(jurusanRes?.data?.data);
      } catch (error) {
        if (display) {
          display = false;
          // props?.setDisplay(props.Display);
        }
      }
      if (props.PengujiEdit.id_jurusan) {
        setJurusanId(props.PengujiEdit.id_jurusan);
      }
    })();
  }, [props.PengujiEdit.id_jurusan]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    let nama = e.target.nama.value;
    let username = e.target.username.value;
    let password = e.target?.password?.value;
    let id_jurusan = JurusanId;
    let id = props.PengujiEdit?.id;
    try {
      if (props.Method === "Edit")
        await Api.put(`/penguji/${id}`, { nama, id_jurusan, username });
      if (props.Method === "Tambah")
        await Api.post(`/penguji`, { nama, id_jurusan, username, password });
      Toast({
        message: `Data Penguji berhasil di ${props.Method} `,
        type: "success",
      });
      props.setOpen(false);
      props.setRefreshData(!props?.RefreshData);
      props?.setPengujiEdit({});
    } catch (error) {
      console.log(error);
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
    props.setPengujiEdit({});
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
                defaultValue={props.PengujiEdit?.nama}
                id="default-value"
                label="Nama Penguji"
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
                defaultValue={props.PengujiEdit?.username}
                id="email-text"
                label="Username"
                type="email"
                variant="outlined"
                fullWidth
                name="username"
                size="small"
                sx={{ mb: 2 }}
              />
            </Grid>
            {props.Method == "Tambah" && (
              <Grid xs={12} lg={12} item sm={12}>
                <TextField
                  required
                  id="email-text"
                  label="Password"
                  type="text"
                  variant="outlined"
                  fullWidth
                  name="password"
                  size="small"
                  sx={{ mb: 2 }}
                />
              </Grid>
            )}
          </Grid>
          <Grid xs={12} lg={12} item sm={12}>
            <Autocomplete
              sx={{ mb: 2 }}
              size="small"
              value={Jurusan?.find(
                (m) => m.id === props?.PengujiEdit?.id_jurusan
              )}
              disablePortal
              options={Jurusan}
              fullWidth
              getOptionLabel={(s) => s?.nama}
              onChange={(e, d) => setJurusanId(d?.id)} // Handle onChange event
              renderInput={(params) => {
                return (
                  <TextField
                    {...params}
                    required
                    name="id_jurusan"
                    label={"Jurusan"}
                  />
                );
              }}
            />
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

export default PengujiForm;
