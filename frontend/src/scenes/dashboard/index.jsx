import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
//import Filters from "./Filters"; // Import your Filters component
import Chart from "../../components/Chart"; // Import your Chart component
import ChartJSComponent from "../../components/ChartJsComponent"; // Import your ChartJSComponent component
import DataFilter from "../../components/DataFilter"; // Import your DataFilter component

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    endYear: null,
    year: null,
    topics: null,
    sector: null,
    region: null,
    pest: null,
    source: null,
    swot: null,
    // Add more filters as needed
  });

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/data', {
          params: filters,
        });
        setData(response.data);
        console.log("ff", response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [filters]);

  const handleFilterChange = (filter, value) => {
    setFilters({ ...filters, [filter]: value });
  };

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">

        <div className="header">
          <Typography variant="h2">DASHBOARD</Typography>
          <Typography variant="h5">Welcome to your dashboard</Typography>
        </div>

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >

            Download Reports
          </Button>
        </Box>
      </Box>

      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >

        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >

          <Box
            mt="25px"
            p="0 10px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Revenue Generated
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                $59,342.32
              </Typography>
            </Box>
            <Box>
              <IconButton>
                {/* Your existing DownloadOutlinedIcon */}
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            {/* Your existing LineChart component */}
            <Chart isDashboard={true} />
          </Box>
        </Box>
        {/* ... */}

        {/* ROW 3 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          {/* Your existing Campaign component */}
          <Typography variant="h5" fontWeight="600">
            Campaign
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            {/* Your existing ProgressCircle component */}
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              $48,352 revenue generated
            </Typography>
            <Typography>Includes extra misc expenditures and costs</Typography>
          </Box>
        </Box>
        {/* ... */}

      </Box>
      <div className="sidebar">
        {/* Your Logo */}
      </div>
      <div className="main-content">
        {/* Your existing Chart component */}
        <Chart data={data} />
        {/* Your existing ChartJSComponent component */}
        <ChartJSComponent data={data} />
        {/* Your existing DataFilter component */}
        <DataFilter />
      </div>
    </Box>
  );
};

export default Dashboard;
