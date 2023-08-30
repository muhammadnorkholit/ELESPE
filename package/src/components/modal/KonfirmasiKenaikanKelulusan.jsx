import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import React from "react";
import Api from "../../Api";

export default function KenaikanKelulusanModal(props) {
  function handleClose() {
    props?.setKonfirmasiOpen(false);
  }
  async function submit() {
    let datas = props.data;
    await Api.post(`/siswa/${props.Jenis == 1 ? "kenaikan" : "kelulusan"}`, {
      datas,
    });
    props?.setKonfirmasiOpen(false);
    props.setdata([]);
  }
  return (
    <div>
      <Dialog open={props.KonfirmasiOpen} onClose={handleClose}>
        <DialogTitle>
          {" "}
          <Typography variant="h2">Pemberitahuan! </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="h5">
            Apakah anda yakin akan{" "}
            {props.Jenis == 1 ? "menaikkan" : "meluluskan"} {props.data?.length}{" "}
            siswa kelas {props.data[0]?.tingkatan}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleClose}>
            Batal
          </Button>
          <Button color="primary" onClick={submit}>
            Naikkan
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
