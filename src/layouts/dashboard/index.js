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

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;
  const { token } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.profile);
  const [searchQuery, setSearchQuery] = useState("");
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
    async function getAllProduct() {
      try {
        const response = await getAllProducts(token);
        dispatch(setProducts(response.data));
      } catch (error) {
        console.log("Error getting all products");
      }
    }
    getAllProduct();
  }, []);

  useEffect(() => {
    async function getAllUserProfile() {
      try {
        const response = await getAllUserProfiles(token);
        dispatch(setUsers(response.data.filter((user) => user.role === "customer")));
      } catch (error) {
        console.log("Error getting all userProfiles");
      }
    }
    getAllUserProfile();
  }, []);

  useEffect(() => {
    async function getAllService() {
      try {
        const response = await getAllServices(token);
        dispatch(setServices(response.data));
      } catch (error) {
        console.log("Error getting all getAllServices");
      }
    }
    getAllService();
  }, []);

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
                count={users.length}
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
                count={users.length}
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
        <MDBox mt={4.5} display="flex" justifyContent="center">
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
              }}
              sx={{
                width: "100%", // Full width for the input inside the card
                height: "50px", // Same height as before
              }}
            />
          </Card>
        </MDBox>

        {/* Customer Overview Section */}
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <MDBox mb={3}>
                <CustomerOverview searchQuery={searchQuery} />
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
