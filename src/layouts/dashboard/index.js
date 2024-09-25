/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
// import Projects from "layouts/dashboard/components/Projects";
import CustomerOverview from "./components/CustomerOverview";
import { getAllProducts } from "../../service/operations/productAndProductTransaction";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { getAllUserProfiles } from "../../service/operations/userProfileApi";
import { setUsers } from "../../slices/profileSlice";
import { setProducts } from "../../slices/productSlice";
import { setServices } from "../../slices/serviceSlice";
import { getAllServices } from "../../service/operations/serviceAndServiceTransaction";
import { Card, MenuItem } from "@mui/material";
import MDInput from "components/MDInput";
import { Padding } from "@mui/icons-material";
import { getAllLocations } from "service/operations/locationApi";
import { setLocations } from "slices/locationSlice";

function Dashboard() {
  // const { sales, tasks } = reportsLineChartData;
  const { token } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.profile);
  const { locations } = useSelector((state) => state.location);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const searchRef = useRef(null);
  const dispatch = useDispatch();
  const handleSearch = async () => {
    console.log(searchQuery);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
      searchRef.current.blur();
    }
  };

  useEffect(() => {
    async function getAllUserProfile() {
      try {
        const response = await getAllUserProfiles(token);
        dispatch(setUsers(response.data.filter((user) => user.role === "customer" && user.active)));
      } catch (error) {
        console.log("Error getting all userProfiles");
      }
    }
    getAllUserProfile();
  }, [token, dispatch]);

  console.log("users", users);

  useEffect(() => {
    async function getAllLocation() {
      try {
        const response = await getAllLocations(token);
        console.log("getting all getAllLocation....", response.data);
        const sortedLocations = response.data.sort((a, b) => a.name.localeCompare(b.name));
        dispatch(setLocations(sortedLocations));
      } catch (error) {
        console.log("Error getting all getAllServices");
      }
    }
    getAllLocation();
  }, [token, dispatch]);
  // console.log("users", users);
  const filteredUsers = selectedLocation
    ? users.filter((user) => user.preferred_location?._id === selectedLocation)
    : [];
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="Total Users"
                count={filteredUsers.length}
                percentage={{
                  color: "success",
                  label: "Customers",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="person"
                title="Today's Users"
                count={filteredUsers.length}
                percentage={{
                  color: "success",
                  amount: "+3%",
                  label: "than last month",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="Revenue"
                count="34k"
                percentage={{
                  color: "success",
                  amount: "+1%",
                  label: "than yesterday",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4.5} display="flex" justifyContent="center" gap={2}>
          <Card
            sx={{
              width: "100%", // Make the card take full width
              maxWidth: "600px", // Set a maximum width (same as the input)
              padding: "16px", // Add padding for better spacing inside the card
            }}
          >
            <MDInput
              label="Search here"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              inputProps={{
                ref: searchRef,
                onFocus: (event) => event.target.select(),
                style: {
                  fontSize: "16px", // Ensures the font size is consistent with the select
                },
              }}
              sx={{
                width: "100%", // Full width for the input inside the card
                height: "50px", // Same height as before
                fontSize: "16px",
              }}
            />
          </Card>
          <Card display="flex" justifyContent="center" alignItems="center" sx={{ paddingX: 2 }}>
            <select
              id="location"
              className="border border-border rounded-md p-2 w-full bg-input text-foreground focus:ring-primary focus:border-primary m-auto"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              style={{
                fontSize: "14px", // Matches the font size of the MDInput
                height: "45px", // Matches the height of the input
              }}
            >
              <option value="">Select location</option>
              {locations.map((location) => (
                <option key={location._id} value={location._id}>
                  {location.name}
                </option>
              ))}
            </select>
          </Card>
        </MDBox>

        {/* Customer Overview Section */}
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <MDBox mb={3}>
                <CustomerOverview searchQuery={searchQuery} filteredUsers={filteredUsers} />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
