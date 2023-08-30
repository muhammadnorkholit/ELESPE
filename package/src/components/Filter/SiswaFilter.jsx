import React, { useEffect, useState } from "react";
import BaseCard from "../BaseCard/BaseCard";
import {
  Autocomplete,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Api from "../../Api";
import Toast from "../Toast/Toast";
import { FilterListOutlined } from "@mui/icons-material";

export default function SiswaFilter({ Callback, Penguji }) {
  const [JurusanId, setJurusanId] = useState(null);
  const [Jurusan, setJurusan] = useState([]);
  let display = false;
  useEffect(() => {
    getJurusan();
  }, []);
  const getJurusan = async () => {
    try {
      let data = await Api.get("/jurusan");
      setJurusan(data?.data?.data);
    } catch (error) {
      if (!display) {
        Toast({ message: "Terjadi Kesalahan Pada Server", type: "error" });
        display = true;
      }
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { tingkatan, no_kelas } = e.target;
    let tingkatanData = tingkatan.value;
    let no_kelasData = no_kelas.value;
    let jurusanData = JurusanId;

    let params = {
      tingkatan: tingkatanData,
      id_jurusan: jurusanData,
      no_kelas: no_kelasData,
    };

    try {
      sessionStorage.setItem("filter", JSON.stringify(params));
      let siswaRes = await Api.get("/siswa", { params });
      if (siswaRes?.data?.data.length === 0)
        return Toast({ message: "Data siswa tidak ditemukan", type: "error" });
      Callback(siswaRes?.data?.data);
      Toast({ message: "Data berhasil difilter", type: "success" });
    } catch (error) {
      Toast({ message: "Data siswa tidak ditemukan", type: "error" });
      console.log(error);
    }
  };
  return (
    <Card variant="elevation">
      <CardContent>
        <Typography variant="h4" sx={{ mb: "5px" }}>
          Filter Siswa{" "}
        </Typography>{" "}
        <form onSubmit={handleSubmit}>
          <Grid
            container
            spacing={1}
            sx={{
              display: "flex",
              alignItems: "stretch",
            }}
          >
            <Grid
              item
              xs={12}
              lg={4}
              sm={4}
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Autocomplete
                size="small"
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
            <Grid
              item
              xs={12}
              lg={4}
              sm={4}
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Autocomplete
                size="small"
                disablePortal
                options={[1, 2, 3, 4, 5, 6]}
                fullWidth
                getOptionLabel={(s) => s.toString()}
                renderInput={(params) => {
                  return (
                    <TextField name="no_kelas" {...params} label={"No kelas"} />
                  );
                }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              lg={4}
              sm={4}
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Autocomplete
                size="small"
                disablePortal
                options={["X", "XI", "XII"]}
                fullWidth
                getOptionLabel={(s) => s}
                renderInput={(params) => {
                  return (
                    <TextField
                      {...params}
                      required
                      name="tingkatan"
                      label={"Tingkatan Kelas"}
                    />
                  );
                }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              lg={4}
              sm={4}
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Button
                type="submit"
                variant="contained"
                startIcon={<FilterListOutlined />}
                color="success"
              >
                Filter
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
}
