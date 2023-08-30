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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import Api from "../../../Api";
import Toast from "../../Toast/Toast";

const KlasterForm = (props) => {
  const [Jurusan, setJurusan] = useState([]);
  const [JurusanId, setJurusanId] = useState(props.KlasterEdit.id_jurusan);
  let display = true;
  useEffect(() => {
    (async () => {
      try {
        let jurusanRes = await Api.get("/jurusan");
        setJurusan(jurusanRes?.data?.data);
      } catch (error) {
        if (display) {
          display = false;
          props?.setDisplay(props.Display);
        }
      }
      if (props.KlasterEdit.id_jurusan) {
        setJurusanId(props.KlasterEdit.id_jurusan);
      }
    })();
  }, [props.KlasterEdit.id_jurusan]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let kompetensi_keahlian = e.target.kompetensi_keahlian.value;
    let no_klaster = e.target.no_klaster.value;
    let id_jurusan = JurusanId;
    let id = props.KlasterEdit?.id;
    try {
      if (props.Method === "Edit")
        await Api.put(`/klaster/${id}`, {
          kompetensi_keahlian,
          no_klaster,
          id_jurusan,
        });
      if (props.Method === "Tambah")
        await Api.post(`/klaster`, {
          kompetensi_keahlian,
          no_klaster,
          id_jurusan,
        });
      Toast({
        message: `Data klaster berhasil di ${props.Method} `,
        type: "success",
      });
      props.setOpen(false);
      props.setRefreshData(!props?.RefreshData);
      props?.setKlasterEdit({});
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
    props.setKlasterEdit({});
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
            sx={{ display: "flex", alignItems: "stretch" }}
          >
            <Grid xs={12} item lg={12} sm={12}>
              <TextField
                required
                defaultValue={props.KlasterEdit?.kompetensi_keahlian}
                id="default-value"
                label="Nama"
                variant="outlined"
                fullWidth
                name="kompetensi_keahlian"
                size="small"
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid xs={12} lg={12} item sm={12}>
              <TextField
                required
                defaultValue={props.KlasterEdit?.no_klaster}
                id="email-text"
                label="No Klaster"
                type="text"
                variant="outlined"
                fullWidth
                name="no_klaster"
                size="small"
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid xs={12} lg={12} item sm={12}>
              <Autocomplete
                sx={{ mb: 2 }}
                size="small"
                value={Jurusan?.find(
                  (m) => m.id === props?.KlasterEdit?.id_jurusan
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
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleFormClose}>
            Batal
          </Button>
          <Button type="submit">{props?.Method}</Button>
        </DialogActions>
      </form>{" "}
    </Dialog>
  );
};

export default KlasterForm;
