import React, { useState, useEffect } from "react";
import { Grid, Button } from "@material-ui/core";
import moment from "moment";
// import { useTheme } from "@material-ui/styles";

// styles
import useStyles from "./styles";

// components
import Widget from "../../components/Widget";
import PageTitle from "../../components/PageTitle";
import { Typography } from "../../components/Wrappers";

//services
import handleTimeApi from "../../services/handleTimeApi";

//constants
import constants from "../../constants";

import { useUserDispatch, signOut } from "../../context/UserContext";

export default function Dashboard(props) {
  var classes = useStyles();
  var userDispatch = useUserDispatch();

  const [counttodaybreak, setCountTodayBreak] = useState("00:00:00");
  const [counttodaywork, setCountTodayWork] = useState("00:00:00");
  const [countmonthbreak, setCountMonthBreak] = useState("00:00:00");
  const [countmonthwork, setCountMonthWork] = useState("00:00:00");
  const [countweekbreak, setCountWeekBreak] = useState("00:00:00");
  const [countweekwork, setCountWeekWork] = useState("00:00:00");
  const [isButtonBreak, setButtonbreak] = useState(false);
  const [isBreak, setBreak] = useState(false);
  const [isButtonWork, setButtonwork] = useState(true);
  const [isWork, setWork] = useState(true);
  const [userId, setUserId] = useState(localStorage.getItem("id_token"));

  const handleTime = async (e, body) => {
    e.preventDefault();
    Object.assign(body, { userId });
    const data = await handleTimeApi(body);
    if (data.status) {
      setButtonbreak(data.data.isButtonBreak);
      setBreak(data.data.isBreak);
      setButtonwork(data.data.isButtonWork);
      setWork(data.data.isWork);
    }
  };

  useEffect(() => {
    // Update the document title using the browser API
    initLoadData();
  }, [isButtonBreak, isBreak, isButtonWork, isWork]);

  /**
   *
   * Enter : Init Data Show
   */
  async function initLoadData() {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("id_token"),
      },
      body: JSON.stringify({ userId: localStorage.getItem("id_token") }),
    };
    const response = await fetch(
      `${constants.apiUrl}/dashboard`,
      requestOptions,
    );
    if (response.status == 403) {
      signOut(userDispatch, props.history);
    }
    const data = await response.json();
    if (data.status) {
      // if(data.data.breakdifferenceInSeconds.length == )
      setCountTodayBreak(data.data.breakdifferenceInSeconds);
      setCountTodayWork(data.data.workdifferenceInSeconds);
      setButtonbreak(data.data.isButtonBreak);
      setBreak(data.data.isBreak);
      setButtonwork(data.data.isButtonWork);
      setWork(data.data.isWork);
    } else {
      setCountTodayBreak("00:00:00");
      setCountTodayWork("00:00:00");
    }
    const responseMonth = await fetch(
      `${constants.apiUrl}/dashboard/month`,
      requestOptions,
    );
    const dataMonth = await responseMonth.json();
    if (dataMonth.status) {
      setCountMonthBreak(dataMonth.data.breakdifferenceInSeconds);
      setCountMonthWork(dataMonth.data.workdifferenceInSeconds);
    } else {
      setCountMonthBreak("00:00:00");
      setCountMonthWork("00:00:00");
    }

    const responseWeek = await fetch(
      `${constants.apiUrl}/dashboard/week`,
      requestOptions,
    );
    const dataWeek = await responseWeek.json();
    if (dataWeek.status) {
      setCountWeekBreak(dataWeek.data.breakdifferenceInSeconds);
      setCountWeekWork(dataWeek.data.workdifferenceInSeconds);
    } else {
      setCountWeekBreak("00:00:00");
      setCountWeekWork("00:00:00");
    }
  }

  /**
   *
   * Exit : Init Data Show
   */
  return (
    <>
      <PageTitle title="Dashboard" />
      <Grid container spacing={4}>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Widget
            title="Time Clock Per Day"
            upperTitle
            className={classes.card}
          >
            <div className={classes.visitsNumberContainer}>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  {!isButtonBreak && !isButtonWork && (
                    <Typography size="xxl" className={classes.nocard}>
                      Closed Time
                    </Typography>
                  )}
                  {isButtonWork && !isWork && (
                    <Button
                      type="button"
                      variant="contained"
                      className={classes.success}
                      onClick={(e) =>
                        handleTime(e, {
                          isWork: isWork,
                          isButtonWork: isButtonWork,
                          isBreak: isBreak,
                          isButtonBreak: isButtonBreak,
                        })
                      }
                    >
                      Work In
                    </Button>
                  )}
                  {isWork && (
                    <Button
                      type="button"
                      variant="contained"
                      className={classes.danger}
                      onClick={(e) =>
                        handleTime(e, {
                          isWork: false,
                          isButtonWork: isButtonWork,
                          isBreak: false,
                          isButtonBreak: isButtonBreak,
                        })
                      }
                    >
                      Work Out
                    </Button>
                  )}
                </Grid>
              </Grid>
            </div>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid item lg={6} md={6} sm={12} xs={12}>
                {isWork && isBreak && (
                  <Button
                    type="button"
                    className={classes.warning}
                    variant="contained"
                    onClick={(e) =>
                      handleTime(e, {
                        isWork: true,
                        isButtonWork: isButtonWork,
                        isBreak: false,
                        isButtonBreak: isButtonBreak,
                      })
                    }
                  >
                    Break Out
                  </Button>
                )}
                {isWork && !isBreak && (
                  <Button
                    type="button"
                    className={classes.warning}
                    variant="contained"
                    onClick={(e) =>
                      handleTime(e, {
                        isWork: true,
                        isButtonWork,
                        isBreak: true,
                        isButtonBreak,
                      })
                    }
                  >
                    Break In
                  </Button>
                )}
              </Grid>
            </Grid>
          </Widget>
        </Grid>

        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Widget
            title="Today Time"
            upperTitle
            className={classes.card}
            bodyClass={classes.fullHeightBody}
            justify="center"
          >
            <Grid
              lg={12}
              xs={12}
              style={{
                textAlign: "center",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Grid
                item
                lg={6}
                md={6}
                sm={12}
                xs={12}
                className={classes.bordergrid}
              >
                <Typography
                  size="md"
                  color="text"
                  colorBrightness="secondary"
                  className={classes.progressSectionTitle}
                >
                  Today Break
                </Typography>

                <Typography
                  size="xxl"
                  color="text"
                  colorBrightness="primary"
                  className={classes.progressSectionTitle}
                >
                  {counttodaybreak}
                </Typography>
              </Grid>
              <Grid
                item
                lg={6}
                md={6}
                sm={12}
                xs={12}
                className={classes.bordergrid}
              >
                <Typography
                  size="md"
                  color="text"
                  colorBrightness="secondary"
                  className={classes.progressSectionTitle}
                >
                  Today Work
                </Typography>

                <Typography
                  size="xxl"
                  color="text"
                  colorBrightness="primary"
                  className={classes.progressSectionTitle}
                >
                  {counttodaywork}
                </Typography>
              </Grid>
            </Grid>
          </Widget>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Widget
            title="Week Report Card"
            upperTitle
            className={classes.card}
            bodyClass={classes.fullHeightBody}
          >
            <Grid
              lg={12}
              xs={12}
              style={{
                textAlign: "center",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Grid
                item
                lg={6}
                md={6}
                sm={12}
                xs={12}
                className={classes.bordergrid}
              >
                <Typography
                  size="md"
                  color="text"
                  colorBrightness="secondary"
                  className={classes.progressSectionTitle}
                >
                  Work Time
                </Typography>
                <Typography
                  size="xxl"
                  color="text"
                  colorBrightness="primary"
                  className={classes.progressSectionTitle}
                >
                  {countweekwork}
                </Typography>
              </Grid>
              <Grid
                item
                lg={6}
                md={6}
                sm={12}
                xs={12}
                className={classes.bordergrid}
              >
                <Typography
                  size="md"
                  color="text"
                  colorBrightness="secondary"
                  className={classes.progressSectionTitle}
                >
                  Break Time
                </Typography>
                <Typography
                  size="xxl"
                  color="text"
                  colorBrightness="primary"
                  className={classes.progressSectionTitle}
                >
                  {countweekbreak}
                </Typography>
              </Grid>
            </Grid>
          </Widget>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Widget
            title="Month Report Card"
            upperTitle
            className={classes.card}
            bodyClass={classes.fullHeightBody}
          >
            <Grid
              lg={12}
              xs={12}
              style={{
                textAlign: "center",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Grid
                item
                lg={6}
                md={6}
                sm={12}
                xs={12}
                className={classes.bordergrid}
              >
                <Typography
                  size="md"
                  color="text"
                  colorBrightness="secondary"
                  className={classes.progressSectionTitle}
                >
                  Work Time
                </Typography>
                <Typography
                  size="xxl"
                  color="text"
                  colorBrightness="primary"
                  className={classes.progressSectionTitle}
                >
                  {countmonthwork}
                </Typography>
              </Grid>
              <Grid
                item
                lg={6}
                md={6}
                sm={12}
                xs={12}
                className={classes.bordergrid}
              >
                <Typography
                  size="md"
                  color="text"
                  colorBrightness="secondary"
                  className={classes.progressSectionTitle}
                >
                  Break Time
                </Typography>
                <Typography
                  size="xxl"
                  color="text"
                  colorBrightness="primary"
                  className={classes.progressSectionTitle}
                >
                  {countmonthbreak}
                </Typography>
              </Grid>
            </Grid>
          </Widget>
        </Grid>
      </Grid>
    </>
  );
}
