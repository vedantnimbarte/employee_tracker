import React, { useState, useEffect } from "react";
import { Grid, Checkbox } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import moment from "moment";
// components
import PageTitle from "../../components/PageTitle";

//functions
import fetchHolidayData from "../../services/getHolidays";

//helpers
import TableOptions from "../../helpers/tableOptions";
import setTableColumns from "../../helpers/holidayTableColumns";

export default function Tables() {
  const [getTableData, setTableData] = useState();

  const getHolidayData = async () => {
    const holidayData = await fetchHolidayData();
    setTableData(holidayData);
  };

  useEffect(() => {
    getHolidayData();
  }, []);

  return (
    <>
      <PageTitle title="Holidays" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title={"Holidays"}
            data={getTableData}
            columns={setTableColumns(getTableData, Checkbox, moment)}
            options={TableOptions}
          />
        </Grid>
      </Grid>
    </>
  );
}
