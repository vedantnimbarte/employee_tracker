function setTimeReportTableColumns(
  getTableData,
  moment,
  IconButton,
  handleClickOpen,
  EditIcon,
) {
  return [
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
              onClick={handleClickOpen}
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
}

export default setTimeReportTableColumns;
