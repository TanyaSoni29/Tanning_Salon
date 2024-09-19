/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
// // @mui material components
// import { MenuItem } from "@mui/material";
// import Card from "@mui/material/Card";
// import Icon from "@mui/material/Icon";

// // Material Dashboard 2 React components
// import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";

// // Material Dashboard 2 React example components
// import TimelineItem from "examples/Timeline/TimelineItem";
// import { useSelector } from "react-redux";

// function OrdersOverview() {
//   const { users } = useSelector((state) => state.profile);
//   return (
//     <Card sx={{ height: "100%" }}>
//       <MDBox pt={3} px={3}>
//         <MDTypography variant="h6" fontWeight="medium">
//           Customer overview
//         </MDTypography>
//         <MDBox mt={0} mb={2}>
//           {users
//             .filter((user) => user.role === "customer")
//             .map((user) => (
//               <>
//                 <MenuItem>
//                   {user.firstName}
//                   <MDTypography></MDTypography>
//                 </MenuItem>
//               </>
//             ))}
//         </MDBox>
//       </MDBox>
//     </Card>
//   );
// }

// export default OrdersOverview;

// @mui material components
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  Button,
} from "@mui/material";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// React and Redux
import { useSelector } from "react-redux";

function CustomerOverview({ searchQuery }) {
  const { users } = useSelector((state) => state.profile);

  // Filter customers based on the search query
  const filteredUsers = users.filter(
    (user) =>
      user.role === "customer" &&
      (user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.mobileNumber.includes(searchQuery))
  );

  return (
    <Card sx={{ height: "100%" }}>
      <MDBox pt={3} px={3}>
        <MDTypography variant="h6" fontWeight="medium">
          Customer Overview
        </MDTypography>
        <MDBox mt={3} mb={2}>
          {/* Table structure */}
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Mobile No.</TableCell>
                  <TableCell>Gender</TableCell>
                  <TableCell>Last Service Usage</TableCell>
                  <TableCell>Select</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>{`${user.firstName} ${user.lastName}`}</TableCell>
                    <TableCell>{user.mobileNumber}</TableCell>
                    <TableCell>{user.gender}</TableCell>
                    <TableCell>{user.lastServiceUsage || "N/A"}</TableCell>
                    <TableCell>
                      <Button
                        sx={{
                          backgroundColor: "#328BED",
                          color: "#fff",
                          margingBottom: "8px",
                          "&:hover": {
                            backgroundColor: "#63A0F5",
                            color: "#fff",
                          },
                          "&:focus": {
                            color: "#fff",
                          },
                          "&:active": {
                            color: "#fff",
                          },
                          "&:disabled": {
                            backgroundColor: "#D3D3D3",
                            color: "#fff",
                          },
                        }}
                        size="small"
                      >
                        Select
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default CustomerOverview;
