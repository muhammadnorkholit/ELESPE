import React from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  Button,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const KlasterTable = (props) => {
  const handleClick = (method, klaster) => {
    props?.setMethod(method);
    props?.setKlasterEdit(klaster);
    props?.setOpen(false);
    setTimeout(() => {
      props?.setOpen(true);
    }, 0);
  };

  const deleteData = (id) => {
    props.setOpenHapus(true);
    props.setId(id);
  };
  return (
    <Table
      aria-label="simple table"
      sx={{
        mt: 3,
        whiteSpace: "nowrap",
      }}
    >
      <TableHead>
        <TableRow>
          <TableCell>
            <Typography color="textSecondary" variant="h6">
              No
            </Typography>
          </TableCell>
          <TableCell>
            <Typography color="textSecondary" variant="h6">
              Kompetensi Keahlian
            </Typography>
          </TableCell>
          <TableCell>
            <Typography color="textSecondary" variant="h6">
              No Klaster
            </Typography>
          </TableCell>
          <TableCell width={20}>
            <Typography color="textSecondary" variant="h6">
              Opsi
            </Typography>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {props?.Klaster.map((klaster, no) => (
          <TableRow key={klaster?.id}>
            <TableCell>
              <Typography
                sx={{
                  fontSize: "15px",
                  fontWeight: "500",
                }}
              >
                {no + 1}
              </Typography>
            </TableCell>

            <TableCell>
              <Typography color="textSecondary" variant="h6">
                {klaster?.kompetensi_keahlian}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                {klaster?.no_klaster}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                <IconButton
                  onClick={() => handleClick("Edit", klaster)}
                  variant="contained"
                  color="inherit"
                  sx={{
                    mr: 1,
                    mb: 1,
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() => deleteData(klaster?.id)}
                  variant="contained"
                  color="error"
                  sx={{
                    mr: 1,
                    mb: 1,
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Typography>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default KlasterTable;
