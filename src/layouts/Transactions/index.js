// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import serviceTransactionTableData from "layouts/tables/data/serviceTransactionTableData";
import productTransactionTableData from "layouts/tables/data/productTransactionTableData";
import transactionTableData from "layouts/tables/data/transactionTableData";
import MDInput from "components/MDInput";
import { useRef, useState } from "react";
import { TextField } from "@mui/material";

function Tables() {
  const [combinedTransactions, setCombinedTransactions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState([null, null]);
  const searchRef = useRef(null);

  const handleStartDateChange = (e) => {
    setDateRange([e.target.value ? new Date(e.target.value) : null, dateRange[1]]);
  };

  const handleEndDateChange = (e) => {
    setDateRange([dateRange[0], e.target.value ? new Date(e.target.value) : null]);
  };

  const handleSearch = async () => {
    console.log(searchQuery);
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
      searchRef.current.blur();
    }
  };
  // console.log(combinedTransactions);
  const filteredTransaction = combinedTransactions.filter(
    (transaction) => {
      const transactionDate = new Date(transaction.createdAt); // Assuming 'created_at' is the date field
      const isInRange =
        dateRange[0] && dateRange[1]
          ? transactionDate >= dateRange[0] && transactionDate <= dateRange[1]
          : true;
      const matchesSearchQuery =
        (transaction.userName &&
          transaction.userName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (transaction.location &&
          transaction.location.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (transaction.productName &&
          transaction.productName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (transaction.type && transaction.type.toLowerCase().includes(searchQuery.toLowerCase()));
      return isInRange && matchesSearchQuery;
    }
    // Assuming 'name' is the field to search
  );

  // const { columns: sColumns, rows: sRows } = serviceTransactionTableData();
  // const { columns, rows } = productTransactionTableData();
  // const { columns: col, rows: row } = serviceTransactionTableData();
  const { columns: tcols, rows: trows } = transactionTableData(
    filteredTransaction,
    combinedTransactions,
    setCombinedTransactions
  );
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12} display="flex" justifyContent="start">
            <MDBox pr={1} sx={{ flex: 1 }}>
              <TextField
                label="Start Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={dateRange[0] ? dateRange[0].toISOString().slice(0, 10) : ""}
                onChange={handleStartDateChange}
                sx={{ marginRight: "4px" }}
              />
              <TextField
                label="End Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={dateRange[1] ? dateRange[1].toISOString().slice(0, 10) : ""}
                onChange={handleEndDateChange}
                sx={{ marginRight: "4px" }}
              />
              <MDInput
                label="Search Transactions"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                inputProps={{
                  ref: searchRef,
                  onFocus: (event) => event.target.select(),
                }}
                // sx={{ width: "20%" }}
              />
            </MDBox>
          </Grid>
          {/* <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Service Transactions
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns: col, rows: row }}
                  isSorted={true}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Product Transactions
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={true}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid> */}
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Transactions
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns: tcols, rows: trows }}
                  isSorted={true}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
