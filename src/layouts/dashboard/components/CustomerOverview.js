/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import { useState } from "react";
import { useSelector } from "react-redux";
import Modal from "../../../components/Modal";
import QuestionCustomer from "../components/QuestionCustomer";
import ProfileModal from "../components/ProfileModal";
import { Button } from "@mui/material";
import CreateCustomerModal from "components/CustomerActionButton/CreateCustomerModal";
function CustomerOverview({ searchQuery, filteredUsers }) {
  const { users } = useSelector((state) => state.profile);
  const [isQuesModal, setIsQuesModal] = useState(false);
  const [profileModal, setProfileModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const handleCreateModalClose = () => setCreateModalOpen(false);
  const handleCreateNewCustomer = () => {
    setCreateModalOpen(true);
  };
  const handleSelectedProfile = () => {
    setProfileModal(true);
    setIsQuesModal(false);
  };

  const handleCloseSelectedProfile = () => {
    setProfileModal(false);
  };

  const handleSelectButton = (user) => {
    console.log(user);
    setIsQuesModal(true);
    setSelectedUser(user);
  };

  const handleCloseQuesModal = () => {
    setIsQuesModal(false);
  };
  // Filter customers based on the search query
  const filterUsers = filteredUsers.filter(
    (user) =>
      user.role === "customer" &&
      ((user.firstName && user.firstName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (user.lastName && user.lastName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (user.mobileNumber && user.mobileNumber.includes(searchQuery)))
  );
  return (
    <>
      <Modal setOpen={setIsQuesModal} open={isQuesModal}>
        <QuestionCustomer
          onClose={handleCloseQuesModal}
          handleSelectedProfileModal={handleSelectedProfile}
        />
      </Modal>
      <Modal open={createModalOpen} setOpen={setCreateModalOpen}>
        <CreateCustomerModal onClose={handleCreateModalClose} />
      </Modal>
      <Modal setOpen={setProfileModal} open={profileModal}>
        <ProfileModal onClose={handleCloseSelectedProfile} selectedUser={selectedUser} />
      </Modal>
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex justify-between items-center w-full mb-2">
          <h2 className="text-lg font-medium mb-4">Customer Overview</h2>
          <Button
            sx={{
              backgroundColor: "#328BED",
              color: "#fff",
              fontSize: "10px",
              textTransform: "capitalize",
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
            onClick={handleCreateNewCustomer}
          >
            <span style={{ fontSize: "12px", textTransform: "capitalize" }}>
              Register New Customer
            </span>
          </Button>
        </div>

        <div className="overflow-x-auto rounded-lg">
          <table className="min-w-full table-auto border-collapse border border-gray-300 text-[1rem]">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2 text-left font-semibold">Name</th>
                <th className="border border-gray-300 p-2 text-left font-semibold">Phone No.</th>
                <th className="border border-gray-300 p-2 text-left font-semibold">Gender</th>
                <th className="border border-gray-300 p-2 text-left font-semibold">
                  Last Service Usage
                </th>
                <th className="border border-gray-300 p-2 text-center font-semibold">Select</th>
              </tr>
            </thead>
            <tbody>
              {filterUsers.length > 0 ? (
                filterUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50 text-[0.8rem]">
                    <td className="border border-gray-300 p-2">{`${user.firstName} ${user.lastName}`}</td>
                    <td className="border border-gray-300 p-2">{user.phone_number}</td>
                    <td className="border border-gray-300 p-2">{user.gender}</td>
                    <td className="border border-gray-300 p-2">{user.lastServiceUsage || "N/A"}</td>
                    <td className="border border-gray-300 p-2 text-center">
                      {/* <button
                        className="bg-blue-600 text-white px-4 py-1 rounded-lg text-[.8rem] hover:bg-blue-500 focus:outline-none"
                       
                      >
                        Select
                      </button> */}
                      <Button
                        sx={{
                          backgroundColor: "#328BED",
                          color: "#fff",
                          fontSize: "10px",
                          textTransform: "capitalize",
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
                        onClick={() => handleSelectButton(user)}
                      >
                        <span style={{ fontSize: "12px", textTransform: "capitalize" }}>
                          Select
                        </span>
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="border border-gray-300 p-2 text-center" colSpan="5">
                    No customers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default CustomerOverview;
