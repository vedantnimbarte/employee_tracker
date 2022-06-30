import React, { useState, useEffect } from "react";
import {
  Grid,
  IconButton,
  Box,
  Fab,
  Switch,
  Checkbox,
} from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import moment from "moment";
import { Add as AddIcon } from "@material-ui/icons";
import { useHistory } from "react-router-dom";

//services
import fetchLeavesData from "../../services/getLeaves";

//helpers
import TableOptions from "../../helpers/tableOptions";
import setLeavesTableColumns from "../../helpers/leaveTableColumns";

export default function Leaves() {
  const history = useHistory();

  const [getTableData, setTableData] = useState();

  const handleLeavesData = async () => {
    const data = await fetchLeavesData();
    setTableData(data);
  };

  useEffect(() => {
    handleLeavesData();
  }, []);

  return (
    <>
      <Grid container spacing={4}>
        <Box
          style={{
            display: "flex",
            justifyContent: "right",
            width: "100%",
            padding: 10,
            marginRight: 10,
          }}
        >
          <IconButton onClick={() => history.push("/app/request_leave")}>
            <Fab color="primary" aria-label="add" size="small">
              <AddIcon />
            </Fab>
          </IconButton>
        </Box>
        <Grid item xs={12}>
          <MUIDataTable
            title="List of your leaves"
            data={getTableData}
            columns={setLeavesTableColumns(
              getTableData,
              moment,
              Switch,
              Checkbox,
            )}
            options={TableOptions}
          />
        </Grid>
      </Grid>
    </>
  );
}
