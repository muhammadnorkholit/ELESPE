import { Typography } from "@mui/material";
import React from "react";

export default function HapusModal(props) {
  function handleFormClose() {
    props?.OpenHapus;
  }
  return (
    <Dialog maxWidth="xl" open={props?.OpenHapus} onClose={handleFormClose}>
      <DialogTitle>
        <Typography>Hapus Data</Typography>
      </DialogTitle>
      <DialogContent></DialogContent>
      <DialogActions>
        <Typography>Apakah anda yakin menghapus data ?</Typography>
        <Button onClick={handleFormClose}>Batal</Button>
        <Button type="submit" color="error">
          Hapus
        </Button>
      </DialogActions>
    </Dialog>
  );
}
