import { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  InputLabel,
  FormControl,
  Button,
  Box,
  Typography,
  Snackbar,
  Select,
  MenuItem,
} from "@material-ui/core";
import useStyles from "./styles";
import moment from "moment";
import submitLeave from "../../services/submitLeave";
import { useHistory } from "react-router-dom";

export default function LeaveComponent() {
  const [name, setName] = useState(localStorage.getItem("name"));
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const [totalDays, setTotalDays] = useState(0);
  const [reason, setReason] = useState("");
  const [type, setType] = useState("HALF");
  const [snackbarStatus, setSnackbarStatus] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const history = useHistory();

  const calculateTotalDays = () => {
    if (fromDate.length > 0 && toDate.length > 0) {
      setTotalDays(
        parseInt(moment(new Date(toDate)).diff(new Date(fromDate), "days")) + 1,
      );
    } else {
      setTotalDays(0);
    }
  };

  function handleSubmitLeave() {
    const data = submitLeave({ fromDate, toDate, reason, type });
    console.log(data);
    if (data) {
      setSnackbarStatus(true);
      setSnackbarMessage("Your leave submitted successfully.");
      setTimeout(() => {
        history.goBack();
      }, 1000);
    } else {
      setSnackbarStatus(true);
      setSnackbarMessage("Something went wrong. Please try again");
    }
  }

  useEffect(() => {
    calculateTotalDays();
  }, [fromDate, toDate]);

  return (
    <>
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Grid
          xs={12}
          style={{
            padding: 10,
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <Grid xs={12}>
            <TextField
              type="text"
              id="outlined-basic"
              variant="outlined"
              label="Name"
              size="small"
              style={{ width: "100%", margin: 10 }}
              value={name}
              required
            />

            <TextField
              type="email"
              id="email"
              variant="outlined"
              label="Email"
              size="small"
              style={{ width: "100%", margin: 10 }}
              value={email}
              required
            />
            <InputLabel style={{ marginLeft: 10 }}>From Date</InputLabel>
            <TextField
              type="date"
              variant="outlined"
              size="small"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              style={{ width: "100%", margin: 10 }}
            />
            <InputLabel style={{ marginLeft: 10 }}>To Date</InputLabel>
            <TextField
              type="date"
              variant="outlined"
              size="small"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              style={{ width: "100%", margin: 10 }}
            />
            <TextField
              multiline
              rows={4}
              variant="outlined"
              size="small"
              value={reason}
              label="Reason"
              onChange={(e) => setReason(e.target.value)}
              style={{ width: "100%", margin: 10 }}
            />
            <InputLabel style={{ marginLeft: 10 }}>Type</InputLabel>
            <Select
              variant="outlined"
              value={type}
              style={{ width: "100%", margin: 10 }}
              onChange={(e) => setType(e.target.value)}
            >
              <MenuItem value="HALF">Half</MenuItem>
              <MenuItem value="FULL">Full</MenuItem>
            </Select>
            <Box
              style={{
                margin: 5,
                textAlign: "center",
              }}
            >
              <Typography variant="h5">
                Total Days:
                {totalDays}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <FormControl
          style={{
            marginBottom: 10,
            width: "30%",
          }}
        >
          <Button
            variant="outlined"
            color="primary"
            onClick={() => handleSubmitLeave()}
          >
            Submit
          </Button>
        </FormControl>
      </Box>

      <Snackbar
        open={snackbarStatus}
        autoHideDuration={6000}
        onClose={() => setSnackbarStatus(!snackbarStatus)}
        message={snackbarMessage}
      />
    </>
  );
}
