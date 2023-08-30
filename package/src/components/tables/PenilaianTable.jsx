import React, { memo, useEffect, useState } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Checkbox,
  FormControlLabel,
  TextField,
  Radio,
  RadioGroup,
  Button,
} from "@mui/material";
import CheckBoxOutlineBlankOutlinedIcon from "@mui/icons-material/CheckBoxOutlineBlankOutlined";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import Toast from "../Toast/Toast";
import Api from "../../Api";

const PenilaianTable = ({
  Penilaian,
  Loading,
  setLoading,
  AllKompeten,
  AllTdkKompeten,
  setAllTdkKompeten,
  setAllKompeten,
  setPenilaian,
}) => {
  const [selectedValues, setSelectedValues] = useState(false);

  const updateStatus = async (status, id) => {
    try {
      await Api.put("/penilaian/" + id, { status });
      let params = JSON.parse(sessionStorage.getItem("filter"));
      let dataPenilaian = await Api.get("/penilaian", { params });
      setPenilaian(dataPenilaian?.data?.data);
      setAllKompeten(dataPenilaian?.data?.checkedAll);
      setAllTdkKompeten(dataPenilaian?.data?.unCheckedAll);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      Toast({ message: "Terjadi kesalahan pada server", type: "error" });
    }
  };
  const updateStatusAll = async (e) => {
    setLoading(true);
    const { name, value, id } = e.target;
    let status = value;
    let params = JSON.parse(sessionStorage.getItem("filter"));

    try {
      let data = {
        status,
        ...params,
      };
      // setPenilaianAll(status);
      await Api.put("/penilaian/updateAll/status", data);
      let dataPenilaian = await Api.get("/penilaian", { params });
      setPenilaian(dataPenilaian?.data?.data);
      setAllKompeten(dataPenilaian?.data?.checkedAll);
      setAllTdkKompeten(dataPenilaian?.data?.unCheckedAll);
      setLoading(false);
      setSelectedValues({});
    } catch (error) {
      setLoading(false);
      console.log(error);
      Toast({ message: "Terjadi kesalahan pada server", type: "error" });
    }
  };

  const updateCatatan = async (e) => {
    setLoading(true);
    const { name, value } = e.target;
    let id = name.replace("catatan", "");
    try {
      await Api.put("/penilaian/" + id, { catatan: value });
      let params = JSON.parse(sessionStorage.getItem("filter"));
      let dataPenilaian = await Api.get("/penilaian", { params });
      setPenilaian(dataPenilaian?.data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      Toast({ message: "Terjadi kesalahan pada server", type: "error" });
    }
  };

  const handleCheckboxChange = (id, value, index, index2) => {
    // setSelectedValues((prevSelectedValues) => ({
    //   ...prevSelectedValues,
    //   [id]: value,
    // }));
    let status = value === "competent" ? 1 : 0;
    let data = [...Penilaian];
    data[index].penilaians[index2].status = status;
    setPenilaian(data);
    updateStatus(status, id);
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
          <TableCell width={"20%"}>
            <Typography color="textSecondary" variant="h6">
              Nama
            </Typography>
          </TableCell>
          <TableCell>
            <Typography color="textSecondary" variant="h6">
              Unit Kompetensi{" "}
            </Typography>
          </TableCell>
          <TableCell>
            <FormControlLabel
              control={
                <Checkbox
                  icon={<CheckBoxOutlineBlankOutlinedIcon />}
                  checkedIcon={<CheckBoxOutlinedIcon />}
                  name={"kompeten"}
                  value={1}
                  onChange={updateStatusAll}
                  checked={AllKompeten}
                  disabled={!Penilaian?.length}
                />
              }
              label="Kompeten"
            />
          </TableCell>
          <TableCell>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={updateStatusAll}
                  icon={<CheckBoxOutlineBlankOutlinedIcon />}
                  checkedIcon={<CheckBoxOutlinedIcon />}
                  name={"tdkkompeten"}
                  value={0}
                  checked={AllTdkKompeten}
                  disabled={!Penilaian?.length}
                />
              }
              label="Tidak Kompeten"
            />
          </TableCell>
          <TableCell width={"15%"}>
            <Typography color="textSecondary" variant="h6">
              Catatan
            </Typography>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {Penilaian?.map((penilaian, no) =>
          penilaian?.penilaians?.map((penilaian2, no2) => {
            return (
              <TableRow key={penilaian?.id + penilaian2.id}>
                {no2 == 0 ? (
                  <>
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
                        {penilaian?.nama}
                      </Typography>
                    </TableCell>
                  </>
                ) : (
                  <>
                    <TableCell>
                      <Typography
                        sx={{
                          fontSize: "15px",
                          fontWeight: "500",
                        }}
                      ></Typography>
                    </TableCell>

                    <TableCell>
                      <Typography
                        color="textSecondary"
                        variant="h6"
                      ></Typography>
                    </TableCell>
                  </>
                )}
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    {penilaian2?.element_uji?.nama}
                  </Typography>
                </TableCell>
                <DataItem
                  index1={no}
                  index2={no2}
                  key={penilaian2.id}
                  data={penilaian2}
                  selectedValue={
                    penilaian2?.status == 1
                      ? "competent"
                      : penilaian2?.status == 0
                      ? "incompetent"
                      : ""
                  }
                  onChange={handleCheckboxChange}
                />

                <TableCell>
                  <TextField
                    id="outlined-multiline-static"
                    label="Catatan"
                    multiline
                    rows={2}
                    variant="outlined"
                    fullWidth
                    value={penilaian2?.element_uji?.catatan}
                    name={`catatan${penilaian2?.id}`}
                    onBlur={updateCatatan}
                    sx={{
                      mb: 2,
                    }}
                  />
                </TableCell>
              </TableRow>
            );
          })
        )}
      </TableBody>
    </Table>
  );
};

const DataItem = memo(({ data, selectedValue, onChange, index1, index2 }) => (
  <>
    <TableCell>
      <Typography color="textSecondary" variant="h6">
        <FormControlLabel
          control={
            <Checkbox
              icon={<CheckBoxOutlineBlankOutlinedIcon />}
              checkedIcon={<CheckBoxOutlinedIcon />}
              value={1}
              checked={selectedValue === "competent"}
              onChange={() => onChange(data.id, "competent", index1, index2)}
            />
          }
          label="Kompeten"
        />
      </Typography>
    </TableCell>
    <TableCell>
      <Typography color="textSecondary" variant="h6">
        <FormControlLabel
          control={
            <Checkbox
              icon={<CheckBoxOutlineBlankOutlinedIcon />}
              checkedIcon={<CheckBoxOutlinedIcon />}
              checked={selectedValue === "incompetent"}
              onChange={() => onChange(data.id, "incompetent", index1, index2)}
              value={0}
            />
          }
          label="Tidak Kompeten"
        />
      </Typography>
    </TableCell>
  </>
));

export default PenilaianTable;
