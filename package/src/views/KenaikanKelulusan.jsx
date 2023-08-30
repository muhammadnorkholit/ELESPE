import React, { useEffect, useState } from "react";

import { Card, CardContent, Box, Typography, Button } from "@mui/material";

import KenaikanKelulusanFilter from "../components/Filter/KenaikanKelulusanFilter";
import KenaikanKelulusanTable from "../components/tables/KenaikanKelulusanTable";
import { Save } from "@mui/icons-material";
import KenaikanKelulusanModal from "../components/modal/KonfirmasiKenaikanKelulusan";

const KenaikanKelulusan = () => {
  const [Siswa, setSiswa] = useState([]);
  const [SiswaEdit, setSiswaEdit] = useState({});
  const [Method, setMethod] = useState(undefined);
  const [Open, setOpen] = useState(false);
  const [RefreshData, setRefreshData] = useState(false);
  const [Display, setDisplay] = useState(false);
  const [IsImport, setIsImport] = useState(false);
  const [Siswas, setSiswas] = useState([]);
  const [Jenis, setJenis] = useState(null);
  const [KonfirmasiOpen, setKonfirmasiOpen] = useState(false);
  return (
    <Box>
      <KenaikanKelulusanFilter setJenis={setJenis} Callback={setSiswa} />
      <KenaikanKelulusanModal
        KonfirmasiOpen={KonfirmasiOpen}
        setKonfirmasiOpen={setKonfirmasiOpen}
        data={Siswas}
        setdata={setSiswas}
        Jenis={Jenis}
      />
      <Card variant="elevation">
        <CardContent>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Typography variant="h3">Data Siswa </Typography>
            <Box display={"flex"} justifyContent={"end"}>
              {Siswas.length != 0 && (
                <Button
                  variant="contained"
                  onClick={() => {
                    setKonfirmasiOpen(true);
                  }}
                  color="success"
                  startIcon={<Save />}
                >
                  Simpan
                </Button>
              )}
            </Box>
          </Box>
          <Box
            sx={{
              overflow: {
                xs: "auto",
                sm: "unset",
              },
            }}
          >
            <KenaikanKelulusanTable
              Siswa={Siswa}
              setSiswaEdit={setSiswaEdit}
              setMethod={setMethod}
              setOpen={setOpen}
              setSiswas={setSiswas}
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default KenaikanKelulusan;
