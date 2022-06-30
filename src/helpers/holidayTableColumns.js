const setTableColumns = (getTableData, Checkbox, moment) => {
  return [
    {
      name: "firstworkentryDateTime",
      label: "Name",
      options: {
        filter: false,
        sort: false,
        customBodyRenderLite: (dataIndex) => {
          return getTableData[dataIndex].name;
        },
      },
    },
    {
      name: "startDate",
      label: "Start Date",
      options: {
        filter: false,
        sort: true,
        customBodyRenderLite: (dataIndex) => {
          if (getTableData[dataIndex].startDate != undefined) {
            let val = getTableData[dataIndex].startDate;
            return moment(val).format("DD-MM-YYYY hh:mm A");
          }
        },
      },
    },
    {
      name: "endDate",
      label: "End Date",
      options: {
        filter: false,
        sort: false,
        customBodyRenderLite: (dataIndex) => {
          let val = moment(getTableData[dataIndex].endDate).format(
            "DD-MM-YYYY hh:mm A",
          );
          return val;
        },
      },
    },
    {
      name: "type",
      label: "Type of holiday",
      options: {
        filter: false,
        sort: false,
        customBodyRenderLite: (dataIndex) => {
          return getTableData[dataIndex].type;
        },
      },
    },
    {
      name: "updatedAt",
      label: "Updated At",
      options: {
        filter: false,
        sort: false,
        customBodyRenderLite: (dataIndex) => {
          return moment(getTableData[dataIndex].updatedDate).format(
            "DD-MM-YYYY hh:mm A",
          );
        },
      },
    },
  ];
};

export default setTableColumns;
