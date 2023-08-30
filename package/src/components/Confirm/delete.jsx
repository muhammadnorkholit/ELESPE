import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import Api from "../../Api";
import Toast from "../Toast/Toast";

const Delete = (props) => {
  console.log("s");
  const handleClose = () => {
    props.setOpenHapus(false);
  };

  const handleConfirm = async () => {
    try {
      await Api.delete(`/${props.url}/${props.Id}`);
    } catch (error) {
      Toast({ message: "Terjadi kesalahan dengan server", type: "error" });
    } finally {
      Toast({
        message: "Data Berhasil Di Hapus",
        type: "success",
      });
      props.setRefreshData(!props.RefreshData);
      props.setOpenHapus(false);
    }
  };
  return (
    <div>
      <Dialog open={props.OpenHapus} onClose={handleClose}>
        <DialogTitle>
          {" "}
          <Typography variant="h2">Pemberitahuan! </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="h5">Anda yakin ingin menghapus? </Typography>
          <Typography variant="h5">
            Item yang dihapus tidak dapat dikembalikan.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Batal</Button>
          <Button color="error" onClick={handleConfirm}>
            Hapus
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Delete;
