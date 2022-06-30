import { Fragment } from "react";
import { Grid } from "@material-ui/core";

//Components
import PageTitle from "../../components/PageTitle/PageTitle";
import Widget from "../../components/Widget/Widget";
import Leave from "../../components/Table/Leave";

// styles
import useStyles from "./styles";

export default function NewUser() {
  const classes = useStyles();
  return (
    <Fragment>
      <PageTitle title="Leave" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Leave />
        </Grid>
      </Grid>
    </Fragment>
  );
}
