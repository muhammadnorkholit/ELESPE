import React, { memo, useEffect, useState } from "react";

import {
  Card,
  CardContent,
  Box,
  Typography,
  Button,
  Checkbox,
  Radio,
} from "@mui/material";
import PenilaianFilter from "../components/Filter/PenilaianFilter";
import PenilaianTable from "../components/tables/PenilaianTable";
import Spinner from "./Spinner/Spinner";

const Siswa = () => {
  const [Penilaian, setPenilaian] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [AllKompeten, setAllKompeten] = useState(false);
  const [AllTdkKompeten, setAllTdkKompeten] = useState(false);

  return (
    <Box>
      {/* {Loading && <Spinner />} */}

      <PenilaianFilter
        Loading={Loading}
        setLoading={setLoading}
        setAllKompeten={setAllKompeten}
        setAllTdkKompeten={setAllTdkKompeten}
        Callback={setPenilaian}
      />
      <Card variant="elevation">
        <CardContent>
          <Typography variant="h3">Data Penilaian </Typography>
          <Box
            sx={{
              overflow: {
                xs: "auto",
                sm: "unset",
              },
            }}
          >
            <PenilaianTable
              Loading={Loading}
              setLoading={setLoading}
              Penilaian={Penilaian}
              AllKompeten={AllKompeten}
              AllTdkKompeten={AllTdkKompeten}
              setAllKompeten={setAllKompeten}
              setAllTdkKompeten={setAllTdkKompeten}
              setPenilaian={setPenilaian}
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Siswa;
