import React, { useState } from "react";
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
  Checkbox,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const KenaikanKelulusanTable = (props) => {
  const [selectedSiswa, setSelectedSiswa] = useState([]);

  const handleClick = (method, siswa) => {
    props?.setMethod(method);
    props?.setSiswaEdit(siswa);
    props?.setOpen(false);
    setTimeout(() => {
      props?.setOpen(true);
    }, 0);
  };

  const handleSelect = (siswa) => {
    const selectedIndex = selectedSiswa.indexOf(siswa);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedSiswa, siswa);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedSiswa.slice(1));
    } else if (selectedIndex === selectedSiswa.length - 1) {
      newSelected = newSelected.concat(selectedSiswa.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedSiswa.slice(0, selectedIndex),
        selectedSiswa.slice(selectedIndex + 1)
      );
    }

    setSelectedSiswa(newSelected);
    let data = newSelected.map((sis) => ({
      id: sis.id,
      tingkatan: sis.tingkatan,
    }));
    props.setSiswas([...data]);
  };

  const isSelected = (siswa) => selectedSiswa.indexOf(siswa) !== -1;

  const handleSelectAll = () => {
    if (selectedSiswa.length === props.Siswa.length) {
      setSelectedSiswa([]);
      props.setSiswas([]);
    } else {
      setSelectedSiswa([...props.Siswa]);
      let data = props.Siswa.map((sis) => ({
        id: sis.id,
        tingkatan: sis.tingkatan,
      }));
      props.setSiswas([...data]);
    }
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
            <Checkbox
              indeterminate={
                selectedSiswa.length > 0 &&
                selectedSiswa.length < props.Siswa.length
              }
              checked={selectedSiswa.length === props.Siswa.length}
              onChange={handleSelectAll}
              inputProps={{ "aria-label": "select all siswa" }}
            />
          </TableCell>
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
        </TableRow>
      </TableHead>
      <TableBody>
        {props.Siswa.map((siswa, no) => (
          <TableRow key={no}>
            <TableCell>
              <Checkbox
                checked={isSelected(siswa)}
                onChange={() => handleSelect(siswa)}
                inputProps={{ "aria-label": `select siswa ${no + 1}` }}
              />
            </TableCell>
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
                {siswa.nama}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                {siswa.nisn}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                {siswa.tingkatan} {siswa.jurusan.nama} {siswa.no_kelas}
              </Typography>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default KenaikanKelulusanTable;
