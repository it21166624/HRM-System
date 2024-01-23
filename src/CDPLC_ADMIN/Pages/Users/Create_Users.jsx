import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  CardContent,
  Card,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Swal from "sweetalert2";
import {
  addUser,
  getStafflist,
  deleteUser,
  updateUser,
} from "../../../action/CDPLC_ADMIN/CreateUser";
import { GetsectionsList } from "../../../action/CDPLC_STAFF/StaffAddJob";
import {
  AdminGetsectionsList,
  GetAllJobs,
} from "../../../action/CDPLC_ADMIN/AdminAction";
import CustomLoader from "../../Components/Modal/Loader";
import icc from "../../../ASSETS/icc.png";

export default function CreateUsers() {
  const dispatch = useDispatch();
  const createUserState = useSelector((state) => state.addUser);
  const { data } = useSelector((state) => state.adminGetsectionsList);
  const { data: item, loading } = useSelector((state) => state.getStafflist);
  // const { data: update, loading: load } = useSelector(
  //   (state) => state.updateUser
  // );
  const [departmentValue, setDepartmentValue] = useState({
    value: "",
    error: "",
  });
  const [username, setUsername] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [users, setUsers] = useState([]);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [editUserId, setEditUserId] = useState(null);
  useEffect(() => {
    dispatch(getStafflist());
  }, [dispatch]);
  useEffect(() => {
    dispatch(AdminGetsectionsList());
  }, [dispatch]);
  const handledepartmentValueChange = (event) => {
    const text = event.target.value;
    setDepartmentValue({ value: text, error: "" });
  };
  const handleusernameChange = (event) => {
    const text = event.target.value;
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(text)) {
      setUsername({ value: text, error: "Please enter a valid email address" });
    } else {
      setUsername({ value: text, error: "" });
    }
  };
  const handlepasswordChange = (event) => {
    const text = event.target.value;
    setPassword({ value: text, error: "" });
  };
  const handleAddUser = () => {
    console.log(editUserId);
    if (!departmentValue.value || !username.value || !password.value) {
      Swal.fire("Error", "Please fill in all fields", "error");
      return;
    }
    const requestBodyData = new FormData();
    requestBodyData.append("Section_Id", departmentValue.value);
    requestBodyData.append("Email", username.value);
    requestBodyData.append("Password", password.value);
    if (isUpdateMode) {
      dispatch(
        updateUser(
          editUserId,
          departmentValue.value,
          username.value,
          password.value
        )
      );
      Swal.fire("Thank you!", "User has been updated successfully.", "success");
    } else {
      dispatch(addUser(requestBodyData));
      Swal.fire(
        "Thank you!",
        "New user has been added successfully.",
        "success"
      );
    }
    setIsUpdateMode(false);
    setEditUserId(null);
    setDepartmentValue({ value: "", error: "" });
    setUsername({ value: "", error: "" });
    setPassword({ value: "", error: "" });
    window.location.reload();
  };
  const handleEditUser = (userId) => {
    const userToEdit = item.find((user) => user.Reg_user_id === userId);
    if (userToEdit) {
      setIsUpdateMode(true);
      setEditUserId(userId);
      setDepartmentValue({ value: userToEdit.SectionalId, error: "" });
      setUsername({ value: userToEdit.Email, error: "" });
      setPassword({ value: userToEdit.Password, error: "" });
    }
  };
  const handleDeleteUser = (userId) => {
    Swal.fire({
      title: "Do you want to delete this user?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteUser(userId));
        Swal.fire("Deleted!", "User has been deleted.", "success").then(() => {
          window.location.reload();
        });
      } else if (result.isDenied) {
        Swal.fire("Cancel!", "User deletion has been canceled.", "warning");
      }
    });
  };
  return (
    <Box>
      {loading ? (
        <Box>
          <CustomLoader />
          {/* text="Loading..." */}
        </Box>
      ) : (
        <>
          <Card
            sx={{
              margin: "0 auto",
              backgroundColor: "#E1F5FE",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <CardContent>
            <Typography gutterBottom variant="h5">
              Create Users
            </Typography>
            </CardContent>
            <img
              src={icc}
              alt="icon"
              style={{
                width: "8%",
                height: "auto",
              }}
            />
          </Card>
        <Card style={{ padding: "2px 5px", margin: "20px auto 0", }}>
        <Grid container spacing={2} style={{ marginTop: "10px" }}>
            <Grid xs={12} sm={4} item>
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">
                  Department
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="Department"
                  label="Department"
                  value={departmentValue.value}
                  onChange={handledepartmentValueChange}
                  autoComplete="Department"
                  sx={{ height: 55 }}
                >
                  {data.map((item) => (
                    <MenuItem value={item.sectionId}>
                      {item.sectionName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {/* <TextField
            required
            id="Department"
            name="Department"
            label="Department "
            value={departmentValue.value}
            onChange={handledepartmentValueChange}
            fullWidth
            autoComplete="Department"
          /> */}
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                id="username"
                name="username"
                label="User Name"
                value={username.value}
                onChange={handleusernameChange}
                fullWidth
                autoComplete="username"
                error={Boolean(username.error)}
                helperText={username.error}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                id="password"
                name="password"
                label="Password"
                value={password.value}
                onChange={handlepasswordChange}
                fullWidth
                autoComplete="password"
              />
            </Grid>
            <br />
            <Grid item xs={12} sm={4}>
              <Button
                type="button"
                variant="contained"
                color="primary"
                sx={{ width: 150 }}
                disabled={createUserState.loading}
                onClick={() => {
                  Swal.fire({
                    title: isUpdateMode
                      ? "Do you want to update this user?"
                      : "Do you want to add a new user?",
                    showDenyButton: true,
                    showCancelButton: true,
                    confirmButtonText: "Yes",
                    denyButtonText: `No`,
                  }).then((result) => {
                    if (result.isConfirmed) {
                      handleAddUser();
                    } else if (result.isDenied) {
                      Swal.fire(
                        "Cancel!",
                        "Your submission has not been sent.",
                        "warning"
                      );
                    }
                  });
                }}
              >
                {createUserState.loading
                  ? "Updating..."
                  : isUpdateMode
                  ? "Update User"
                  : "Create User"}
              </Button>
            </Grid>
          </Grid>
        </Card>
      


        <TableContainer
            sx={{
              marginTop: "2%",
              // maxwidth: "2%",
              maxHeight: 600,
        
            }}
            component={Paper}
          >
            <Table aria-label="sticky table">
              {" "}
              <TableHead
                style={{
                  backgroundColor: "#4194C4",
                  position: "sticky",
                  top: 0,
                  zIndex: 1,
                }}
              >
                <TableRow>
                  <TableCell align="left">User Email</TableCell>
                  <TableCell align="left">Department</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {item &&
                  item.map((row) => (
                    <TableRow key={item.Reg_user_id}>
                      <TableCell align="left">{row.Email}</TableCell>
                      <TableCell align="left">{row.Section}</TableCell>
                      <TableCell align="center">
                        <IconButton
                          color="primary"
                          aria-label="Edit"
                          onClick={() => handleEditUser(row.Reg_user_id)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="secondary"
                          aria-label="Delete"
                          onClick={() => handleDeleteUser(row.Reg_user_id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Box>
  );
}