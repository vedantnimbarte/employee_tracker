const setLeavesTableColumns = (getTableData, moment, Switch, Checkbox) => {
  return [
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
        sort: true,
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
        sort: true,
        customBodyRenderLite: (dataIndex) => {
          return getTableData[dataIndex].type;
        },
      },
    },
    {
      name: "isAccept",
      label: "Accepted",
      options: {
        filter: false,
        sort: true,
        customBodyRenderLite: (dataIndex) => {
          return (
            <Switch
              style={{ margin: 1 }}
              checked={getTableData[dataIndex].isaccept}
            />
          );
        },
      },
    },
    {
      name: "isPaid",
      label: "Paid",
      options: {
        filter: false,
        sort: true,
        customBodyRenderLite: (dataIndex) => {
          return <Checkbox checked={getTableData[dataIndex].ispaid} />;
        },
      },
    },
    {
      name: "updatedAt",
      label: "Updated At",
      options: {
        filter: false,
        sort: true,
        customBodyRenderLite: (dataIndex) => {
          return moment(getTableData[dataIndex].updatedDate).format(
            "DD-MM-YYYY hh:mm A",
          );
        },
      },
    },
  ];
};

export default setLeavesTableColumns;
