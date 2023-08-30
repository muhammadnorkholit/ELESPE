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

const PengujiTable = (props) => {
  const handleClick = (method, penguji) => {
    props?.setMethod(method);
    props?.setPengujiEdit(penguji);
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
              Nama penguji
            </Typography>
          </TableCell>
          <TableCell>
            <Typography color="textSecondary" variant="h6">
              Username
            </Typography>
          </TableCell>
          <TableCell>
            <Typography color="textSecondary" variant="h6">
              Jurusan
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
        {props?.Penguji.map((penguji, no) => (
          <TableRow key={penguji?.id}>
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
                {penguji?.nama}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                {penguji?.username}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                {penguji?.jurusan?.nama}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                <IconButton
                  onClick={() => handleClick("Edit", penguji)}
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
                  onClick={() => deleteData(penguji?.id)}
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

export default PengujiTable;
