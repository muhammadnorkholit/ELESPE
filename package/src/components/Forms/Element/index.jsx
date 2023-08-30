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

const ElementForm = (props) => {
  const [Klaster, setKlaster] = useState([]);
  const [KlasterId, setKlasterId] = useState(props.ElementEdit.id_klaster);
  useEffect(() => {
    (async () => {
      try {
        let klasterRes = await Api.get("/klaster");
        setKlaster(klasterRes?.data?.data);
      } catch (error) {
        Toast({ message: "Terjadi Kesalahan Dengan Server", type: "error" });
      }
      if (props.ElementEdit.id_klaster) {
        setKlasterId(props.ElementEdit.id_klaster);
      }
    })();
  }, [props.ElementEdit.id_klaster]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let nama = e.target.nama.value;
    let kode_unit = e.target.kode_unit.value;
    let id_klaster = KlasterId;
    let id = props.ElementEdit?.id;
    try {
      if (props.Method === "Edit")
        await Api.put(`/element/${id}`, { nama, kode_unit, id_klaster });
      if (props.Method === "Tambah")
        await Api.post(`/element`, { nama, kode_unit, id_klaster });
      Toast({
        message: `Data element berhasil di ${props.Method}`,
        type: "success",
      });
      props.setOpen(false);
      props.setRefreshData(!props?.RefreshData);
      props?.setElementEdit({});
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
    props.setElementEdit({});
  };

  return (
    <Dialog open={props.Open} onClose={handleFormClose}>
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
            <Grid xs={12} item lg={12} sm={6}>
              <TextField
                required
                defaultValue={props.ElementEdit?.nama}
                id="default-value"
                label="Nama"
                variant="outlined"
                fullWidth
                name="nama"
                size="small"
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid xs={12} lg={6} item sm={6}>
              <TextField
                required
                defaultValue={props.ElementEdit?.kode_unit}
                id="email-text"
                label="Kode Unit"
                type="text"
                variant="outlined"
                fullWidth
                name="kode_unit"
                size="small"
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid xs={12} lg={6} item sm={6}>
              <Autocomplete
                size="small"
                value={Klaster?.find(
                  (m) => m.id === props?.ElementEdit?.id_klaster
                )}
                disablePortal
                options={Klaster}
                fullWidth
                getOptionLabel={(s) => s?.kompetensi_keahlian}
                onChange={(e, d) => setKlasterId(d?.id)}
                renderInput={(params) => {
                  return (
                    <TextField
                      {...params}
                      required
                      name="id_klaster"
                      label={"Klaster"}
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
          <Button color="primary" type="submit">
            {props.Method}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ElementForm;
