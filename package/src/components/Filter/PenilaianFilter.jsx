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
import { saveAs } from "file-saver";
import Spinner from "../../views/Spinner/Spinner";
import {
  Download,
  DownloadDone,
  FilterList,
  GetApp,
} from "@mui/icons-material";

export default function PenilaianFilter({
  Callback,
  setAllKompeten,
  setAllTdkKompeten,
}) {
  const [JurusanId, setJurusanId] = useState(null);
  const [KlasterId, setKlasterId] = useState(null);
  const [PengujiId, setPengujiId] = useState(null);
  const [Jurusan, setJurusan] = useState([]);
  const [Klaster, setKlaster] = useState([]);
  const [Penguji, setPenguji] = useState([]);
  const [IsAdmin, setIsAdmin] = useState(false);
  const [Mode, setMode] = useState("filter");
  const [Loading, setLoading] = useState(false);

  let display = false;
  useEffect(() => {
    (async () => {})();
    (async () => {
      try {
        let jurusan = await Api.get("/jurusan");
        let klaster = await Api.get("/klaster");
        let penguji = await Api.get("/penguji");
        const user = await Api.get("/user");
        setIsAdmin(user?.data?.user?.isAdmin);
        setJurusan(jurusan?.data?.data);
        setKlaster(klaster?.data?.data);
        setPenguji(penguji?.data?.data);
      } catch (error) {
        console.log(error);
        if (!display) {
          Toast({ message: "Terjadi Kesalahan Pada Server", type: "error" });
          display = true;
        }
      }
    })();
  }, []);
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const { tingkatan, no_kelas } = e.target;
    let tingkatanData = tingkatan.value;
    let no_kelasData = no_kelas.value;
    let jurusanData = JurusanId;
    let klasterData = KlasterId;
    let pengujiData = PengujiId;

    let params = {
      tingkatan: tingkatanData,
      id_jurusan: jurusanData,
      id_klaster: klasterData,
      no_kelas: no_kelasData,
      id_penguji: pengujiData,
    };
    sessionStorage.setItem("filter", JSON.stringify(params));
    try {
      if (Mode == "filter") filter(params);
      if (Mode == "excel" || Mode == "pdf") exportData(params);
    } catch (error) {
      setLoading(false);
      Toast({ message: "terjadi error", type: "error" });
      console.log(error);
    }
  };

  const filter = async (params) => {
    try {
      await Api.post("/penilaian/siapkan", params);
      await getData(params);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const exportData = async (params) => {
    let bool = await getData(params);
    if (bool) return;
    try {
      let pdf = await Api.post(
        "/penilaian/export",
        {
          ...params,
          mode: Mode,
        },
        { responseType: "blob" }
      );

      setLoading(false);
      let fileName = Jurusan.find((l) => l.id == params?.id_jurusan)?.nama;
      console.log(pdf);
      saveAs(pdf.data, fileName);
      setLoading(false);

      // if (Mode == "pdf") return saveAs(pdf.data, fileName);
      // const download = await Api.get("/penilaian/download-excel", {
      //   responseType: "blob",
      // });
      // saveAs(download.data, fileName);
    } catch (error) {
      console.log(error);
    }
  };

  const getData = async (params) => {
    setLoading(true);
    let penilaianRes = await Api.get("/penilaian", { params });
    console.log(penilaianRes);
    if (penilaianRes?.data?.data.length === 0) {
      setLoading(false);
      Toast({
        message: `Data ${
          Mode == "pdf" || Mode == "excel" ? "export" : "siswa"
        } tidak ditemukan`,
        type: "error",
      });
      return true;
    }
    Callback(penilaianRes?.data?.data);
    setAllKompeten(penilaianRes?.data?.checkedAll);
    setAllTdkKompeten(penilaianRes?.data?.unCheckedAll);
    Toast({
      message: `Data berhasil ${
        Mode == "pdf" || Mode == "excel" ? "diexport" : "difilter"
      }`,
      type: "success",
    });
    return false;
  };
  return (
    <Card variant="elevation">
      <CardContent>
        <Typography variant="h4" sx={{ mb: "5px" }}>
          Filter Penilaian
        </Typography>

        {Loading && <Spinner />}

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
              lg={3}
              sm={4}
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Autocomplete
                size="small"
                disablePortal
                options={Klaster}
                fullWidth
                getOptionLabel={(s) => s?.kompetensi_keahlian}
                onChange={(e, d) => setKlasterId(d?.id)} // Handle onChange event
                renderInput={(params) => {
                  return (
                    <TextField
                      {...params}
                      // error={true}
                      // helperText={true && "This field is required"}
                      requiredname="id_klaster"
                      label={"Klaster"}
                      required
                    />
                  );
                }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              lg={3}
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
              lg={3}
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
              lg={3}
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
                      required
                      {...params}
                      name="tingkatan"
                      label={"Tingkatan Kelas"}
                    />
                  );
                }}
              />
            </Grid>
            {IsAdmin && (
              <Grid
                item
                xs={12}
                lg={3}
                sm={4}
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Autocomplete
                  size="small"
                  disablePortal
                  options={Penguji}
                  fullWidth
                  getOptionLabel={(s) => s?.nama}
                  onChange={(e, d) => setPengujiId(d?.id)} // Handle onChange event
                  renderInput={(params) => {
                    return (
                      <TextField
                        {...params}
                        required
                        name="id_penguji"
                        label={"Penguji"}
                      />
                    );
                  }}
                />
              </Grid>
            )}

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
                style={{ height: "100%", paddingInline: "20px" }}
                type="submit"
                variant="contained"
                color="success"
                onClick={() => setMode("filter")}
                startIcon={<FilterList />}
              >
                Filter
              </Button>
              <Button
                style={{
                  height: "100%",
                  paddingInline: "20px",
                  marginLeft: "10px",
                }}
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<GetApp />}
                onClick={() => {
                  setMode("excel");
                }}
              >
                EXCEL
              </Button>
              <Button
                style={{
                  height: "100%",
                  paddingInline: "20px",
                  marginLeft: "10px",
                }}
                startIcon={<GetApp />}
                type="submit"
                variant="contained"
                color="primary"
                onClick={() => setMode("pdf")}
              >
                PDF
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
}
