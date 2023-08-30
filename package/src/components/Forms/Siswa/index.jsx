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
  Autocomplete,
  IconButton,
  DialogActions,
  DialogTitle,
  Dialog,
  DialogContent,
} from "@mui/material";
import Api from "../../../Api";
import Toast from "../../Toast/Toast";
import { Close as CloseIcon } from "@mui/icons-material";

const SiswaForm = (props) => {
  const [Jurusan, setJurusan] = useState([]);
  const [JurusanId, setJurusanId] = useState(null);
  const [Penguji, setPenguji] = useState([]);
  const [PengujiId, setPengujiId] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        let jurusanRes = await Api.get("/jurusan");
        setJurusan(jurusanRes?.data?.data);
        let pengujiRes = await Api.get("/penguji");
        setPenguji(pengujiRes?.data?.data);
      } catch (error) {
        Toast({ message: "Terjadi Kesalahan Dengan Server", type: "error" });
      }
      if (props.SiswaEdit.id_jurusan) setJurusanId(props.SiswaEdit?.id_jurusan);
      if (props.SiswaEdit.id_penguji) setPengujiId(props.SiswaEdit?.id_penguji);
    })();
  }, [props.SiswaEdit.id_jurusan, props.SiswaEdit.id_penguji]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let nama = e.target.nama.value;
    let nisn = e.target.nisn.value;
    let tingkatan = e.target.tingkatan.value;
    let no_kelas = e.target.no_kelas.value;
    let id_jurusan = JurusanId;
    let id_penguji = PengujiId;
    let id = props.SiswaEdit?.id;
    try {
      if (props.Method == "Edit")
        await Api.put(`/siswa/${id}`, {
          nama,
          nisn,
          id_jurusan,
          id_penguji,
          tingkatan,
          no_kelas,
        });
      if (props.Method == "Tambah")
        await Api.post(`/siswa`, {
          nama,
          nisn,
          id_jurusan,
          id_penguji,
          tingkatan,
          no_kelas,
        });

      props?.setSiswaEdit({});

      props.setOpen(false);

      props.setRefreshData(!props?.RefreshData);

      let params = JSON.parse(sessionStorage.getItem("filter"));

      let siswaRes = await Api.get("/siswa", { params });
      props?.setSiswa(siswaRes?.data?.data);
      Toast({
        message: `Data siswa berhasil di ${props.Method} `,
        type: "success",
      });
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
    props.setSiswaEdit({});
  };

  return (
    <Dialog open={props?.Open} onClose={handleFormClose}>
      <DialogTitle>
        <Typography>Form {props?.Method}</Typography>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Grid
            container
            spacing={1}
            sx={{
              display: "flex",
              alignItems: "stretch",
            }}
          >
            <Grid xs={12} item lg={12} sm={12}>
              <TextField
                required
                defaultValue={props.SiswaEdit?.nama}
                id="default-value"
                label="Nama"
                variant="outlined"
                fullWidth
                name="nama"
                size="small"
                sx={{
                  mb: 2,
                }}
              />
            </Grid>
            <Grid xs={12} lg={12} item sm={12}>
              <TextField
                required
                defaultValue={props.SiswaEdit?.nisn}
                id="email-text"
                label="Nisn"
                type="number"
                variant="outlined"
                fullWidth
                name="nisn"
                size="small"
                sx={{
                  mb: 2,
                }}
              />
            </Grid>
            <Grid xs={12} lg={12} item sm={12}>
              <Autocomplete
                size="small"
                value={props?.SiswaEdit?.tingkatan}
                disablePortal
                options={["X", "XI", "XII"]}
                fullWidth
                getOptionLabel={(s) => s}
                sx={{ marginBottom: "20px" }}
                renderInput={(params) => {
                  return (
                    <TextField
                      {...params}
                      required
                      name="tingkatan"
                      label={"Tingkatan Kelas"}
                    />
                  );
                }}
              />
            </Grid>
            <Grid xs={12} lg={12} item sm={12}>
              <Autocomplete
                size="small"
                value={props?.SiswaEdit?.no_kelas}
                disablePortal
                options={[1, 2, 3, 4, 5, 6]}
                fullWidth
                getOptionLabel={(s) => s}
                sx={{ marginBottom: "20px" }}
                renderInput={(params) => {
                  return (
                    <TextField
                      {...params}
                      required
                      name="no_kelas"
                      label={"Rombel"}
                    />
                  );
                }}
              />
            </Grid>
            <Grid xs={12} lg={12} item sm={12}>
              <Autocomplete
                size="small"
                value={Jurusan?.find(
                  (m) => m.id == props?.SiswaEdit?.id_jurusan
                )}
                disablePortal
                options={Jurusan}
                fullWidth
                getOptionLabel={(s) => s?.nama}
                onChange={(e, d) => setJurusanId(d?.id)}
                sx={{ marginBottom: "20px" }}
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

            <Grid xs={12} lg={12} item sm={12}>
              <Autocomplete
                size="small"
                value={Penguji?.find(
                  (m) => m.id == props?.SiswaEdit?.id_penguji
                )}
                sx={{ marginBottom: "20px" }}
                disablePortal
                options={Penguji}
                fullWidth
                getOptionLabel={(s) => s?.nama}
                onChange={(e, d) => setPengujiId(d?.id)}
                renderInput={(params) => {
                  return (
                    <TextField
                      {...params}
                      required
                      name="id_penguji"
                      label={"Penguji"}
                    />
                  );
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFormClose}>Batal</Button>
          <Button type="submit">{props?.Method}</Button>
        </DialogActions>
      </form>{" "}
    </Dialog>
  );
  return (
    <Collapse in={props.Open}>
      <Card
        variant="outlined"
        sx={{
          p: 0,
        }}
      >
        <Box
          sx={{
            padding: "15px 30px",
          }}
          display="flex"
          alignItems="center"
        >
          <Box flexGrow={1}>
            <Typography sx={{ fontSize: "18px", fontWeight: "500" }}>
              Form {props?.Method}
            </Typography>
          </Box>
          <IconButton
            aria-label="close"
            color="inherit"
            onClick={handleFormClose}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        <CardContent
          sx={{
            padding: "30px",
          }}
        >
          {props.Open && (
            <form onSubmit={handleSubmit}>
              <Grid
                container
                spacing={1}
                sx={{
                  display: "flex",
                  alignItems: "stretch",
                }}
              >
                <Grid xs={12} item lg={4} sm={6}>
                  <TextField
                    defaultValue={props.SiswaEdit?.nama}
                    id="default-value"
                    label="Nama"
                    variant="outlined"
                    fullWidth
                    name="nama"
                    size="small"
                    sx={{
                      mb: 2,
                    }}
                  />
                </Grid>
                <Grid xs={12} lg={12} item sm={12}>
                  <TextField
                    defaultValue={props.SiswaEdit?.nisn}
                    id="email-text"
                    label="Nisn"
                    type="number"
                    variant="outlined"
                    fullWidth
                    name="nisn"
                    size="small"
                    sx={{
                      mb: 2,
                    }}
                  />
                </Grid>
                <Grid xs={12} lg={12} item sm={12}>
                  <Autocomplete
                    size="small"
                    value={props?.SiswaEdit?.tingkatan}
                    disablePortal
                    options={["X", "XI", "XII"]}
                    fullWidth
                    getOptionLabel={(s) => s}
                    sx={{ marginBottom: "20px" }}
                    renderInput={(params) => {
                      return (
                        <TextField
                          {...params}
                          required
                          name="tingkatan"
                          label={"Tingkatan Kelas"}
                        />
                      );
                    }}
                  />
                </Grid>
                <Grid xs={12} lg={12} item sm={12}>
                  <Autocomplete
                    size="small"
                    value={props?.SiswaEdit?.no_kelas}
                    disablePortal
                    options={[1, 2, 3, 4, 5, 6]}
                    fullWidth
                    getOptionLabel={(s) => s}
                    sx={{ marginBottom: "20px" }}
                    renderInput={(params) => {
                      return (
                        <TextField
                          {...params}
                          required
                          name="no_kelas"
                          label={"Rombel"}
                        />
                      );
                    }}
                  />
                </Grid>
                <Grid xs={12} lg={12} item sm={12}>
                  <Autocomplete
                    size="small"
                    value={Jurusan?.find(
                      (m) => m.id == props?.SiswaEdit?.id_jurusan
                    )}
                    disablePortal
                    options={Jurusan}
                    fullWidth
                    getOptionLabel={(s) => s?.nama}
                    onChange={(e, d) => setJurusanId(d?.id)}
                    sx={{ marginBottom: "20px" }}
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

                <Grid xs={12} lg={12} item sm={12}>
                  <Autocomplete
                    size="small"
                    value={Penguji?.find(
                      (m) => m.id == props?.SiswaEdit?.id_penguji
                    )}
                    sx={{ marginBottom: "20px" }}
                    disablePortal
                    options={Penguji}
                    fullWidth
                    getOptionLabel={(s) => s?.nama}
                    onChange={(e, d) => setPengujiId(d?.id)}
                    renderInput={(params) => {
                      return (
                        <TextField
                          {...params}
                          required
                          name="id_penguji"
                          label={"Penguji"}
                        />
                      );
                    }}
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

export default SiswaForm;
