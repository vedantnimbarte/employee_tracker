import React, { useState, useEffect } from "react";
import {
  Grid,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
  Paper,
  InputLabel,
  Box,
  Snackbar,
} from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import moment from "moment";
import {
  Create as EditIcon,
  Search as SearchIcon,
  Close as ClearIcon,
} from "@material-ui/icons";
import momentDurationFormatSetup from "moment-duration-format";

// components
import PageTitle from "../../components/PageTitle";
import constants from "../../constants";

momentDurationFormatSetup(moment);

export default function Tables() {
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbar] = useState(false);
  const [getTableData, setTableData] = useState();
  const [work, setWork] = useState();
  const [totalCount, setTotalCount] = useState();
  const [page, setPage] = useState(0);
  const [startDate, setStartDate] = useState(
    moment(new Date()).startOf("month").format("YYYY-MM-DD"),
  );
  const [endDate, setEndDate] = useState(
    moment(new Date()).endOf("month").format("YYYY-MM-DD"),
  );
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const [requestBody, setRequestBody] = useState({
    pageNumber: page,
    pageSize: 10,
    startDate,
    endDate,
    searchEmail: email,
  });
  const [uniqueId, setId] = useState("");

  async function onUpdateWork() {
    console.log(uniqueId);
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("id_token"),
      },
      body: JSON.stringify({ notes: work }),
    };
    const response = await fetch(
      `${constants.apiUrl}/admin/dashboard/${uniqueId}`,
      requestOptions,
    );
    const data = await response.json();
    if (data.status) {
      setId("");
      setOpen(!open);
      setSnackbar(true);
    }
  }

  const handleClickOpen = (id) => {
    setId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const columns = [
    {
      name: "firstworkentryDateTime",
      label: "Entry Date",
      options: {
        filter: false,
        sort: true,
        customBodyRenderLite: (dataIndex) => {
          let val = getTableData[dataIndex].firstworkentryDateTime;
          return moment(new Date(val)).format("DD-MM-YYYY hh:mm A");
        },
      },
    },
    {
      name: "exitDateTime",
      label: "Exit Date",
      options: {
        filter: false,
        sort: true,
        customBodyRenderLite: (dataIndex) => {
          if (getTableData[dataIndex].exitDateTime != undefined) {
            let val = getTableData[dataIndex].exitDateTime;
            return moment(new Date(val)).format("DD-MM-YYYY hh:mm A");
          }
        },
      },
    },
    {
      name: "workdifferenceInSeconds",
      label: "Work Time",
      options: {
        filter: false,
        sort: true,
        customBodyRenderLite: (dataIndex) => {
          let val = moment
            .duration(
              getTableData[dataIndex].workdifferenceInSeconds,
              "seconds",
            )
            .format("hh:mm:ss", { trim: false });
          return val;
        },
      },
    },
    {
      name: "breakdifferenceInSeconds",
      label: "Break Time",
      options: {
        filter: false,
        sort: true,
        customBodyRenderLite: (dataIndex) => {
          let val = moment
            .duration(
              getTableData[dataIndex].breakdifferenceInSeconds,
              "seconds",
            )
            .format("hh:mm:ss", { trim: false });
          return val;
        },
      },
    },
    {
      name: "break",
      label: "Total Break",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "action",
      label: "Actions",
      options: {
        filter: false,
        sort: false,
        customBodyRenderLite: (dataIndex) => {
          const val = (
            <IconButton
              onClick={() => handleClickOpen(getTableData[dataIndex]._id)}
              style={{ margin: 0, padding: 0 }}
            >
              <EditIcon />
            </IconButton>
          );
          if (
            parseInt(
              moment(new Date()).diff(
                new Date(getTableData[dataIndex].firstworkentryDateTime),
                "days",
              ),
            ) === 0
          ) {
            return val;
          }
        },
      },
    },
  ];

  // function print

  async function handleTableData() {
    console.log(requestBody);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("id_token"),
      },
      body: JSON.stringify(requestBody),
    };
    const response = await fetch(
      `${constants.apiUrl}/admin/dashboard`,
      requestOptions,
    );
    const data = await response.json();
    if (data.status) {
      setTotalCount(data.data.totalRows);
      setTableData(data.data.users);
    }
  }

  function onSearch() {
    setRequestBody({
      pageNumber: page,
      pageSize: 10,
      searchEmail: email,
      startDate,
      endDate,
    });
  }

  function onClear() {
    setPage(0);
    setStartDate(moment(new Date()).startOf("month").format("YYYY-MM-DD"));
    setEndDate(moment(new Date()).startOf("month").format("YYYY-MM-DD"));
    setRequestBody({
      pageNumber: page,
      pageSize: 10,
      searchEmail: email,
      startDate: moment(new Date()).startOf("month").format("YYYY-MM-DD"),
      endDate: moment(new Date()).endOf("month").format("YYYY-MM-DD"),
    });
    setTotalCount();
  }

  const options = {
    filter: false,
    print: false,
    rowsPerPage: 10,
    rowsPerPageOptions: [10],
    count: totalCount,
    download: false,
    search: false,
    selectableRows: false,
    pagination: true,
    serverSide: true,
    onTableChange: (action, tableState) => {
      if (action === "changePage") {
        setRequestBody({
          pageNumber: tableState.page,
          pageSize: 10,
          startDate,
          endDate,
          searchEmail: email,
        });
        setPage(tableState.page);
      }
    },
  };

  function handleSnackbar() {
    setSnackbar(!Snackbar);
  }

  useEffect(() => {
    handleTableData();
  }, [page, requestBody]);

  return (
    <>
      <PageTitle title="Work Time" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Paper
            style={{
              padding: 10,
              display: "flex",
              // justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <Box>
              <InputLabel>Start Date: </InputLabel>
              <TextField
                type="date"
                value={startDate}
                variant="outlined"
                size="small"
                onChange={(e) => setStartDate(e.target.value)}
              />
            </Box>
            <Box>
              <InputLabel>End Date: </InputLabel>
              <TextField
                type="date"
                value={endDate}
                variant="outlined"
                size="small"
                onChange={(e) => setEndDate(e.target.value)}
              />
            </Box>
            <Box>
              <IconButton onClick={onSearch}>
                <SearchIcon />
              </IconButton>
              <IconButton onClick={onClear}>
                <ClearIcon />
              </IconButton>
            </Box>
          </Paper>
          <MUIDataTable
            title={"Work Time"}
            data={getTableData}
            columns={columns}
            options={options}
          />
        </Grid>
      </Grid>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">
          Update your today's work
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <TextField
              multiline
              rows={5}
              columns={20}
              variant="outlined"
              value={work}
              onChange={(e) => setWork(e.target.value)}
              style={{ width: "100%" }}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={onUpdateWork} color="primary" autoFocus>
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbar}
        message="Your today's work added successfully"
      />
    </>
  );
}
