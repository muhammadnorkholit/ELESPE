import React from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const SiswaTable = (props) => {
  const handleClick = (method, siswa) => {
    props?.setMethod(method);
    props?.setSiswaEdit(siswa);
    props?.setOpen(false);
    setTimeout(() => {
      props?.setOpen(true);
    }, 0);
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
              Nama Siswa
            </Typography>
          </TableCell>
          <TableCell>
            <Typography color="textSecondary" variant="h6">
              NISN
            </Typography>
          </TableCell>
          <TableCell>
            <Typography color="textSecondary" variant="h6">
              Kelas
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
        {props?.Siswa.map((siswa, no) => (
          <TableRow key={no}>
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
                {siswa?.nama}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                {siswa?.nisn}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                {siswa?.tingkatan} {siswa?.jurusan?.nama} {siswa?.no_kelas}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                <IconButton
                  onClick={() => handleClick("Edit", siswa)}
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

export default SiswaTable;
