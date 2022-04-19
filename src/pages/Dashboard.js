/* eslint-disable no-useless-constructor */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import axios from "axios";
import Chat from "./chat";
import LineGraph from "./Utilisation";
import CostGraph from "./cost";
import Header from "./header";
import { NavLink } from "react-router-dom";
import Moment from "moment";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topMetrics: [],
      topcreatorsList: [],
      efforts: [],
      newcontent: [],
      utilization: [],
      processFlowData:[]
    };
  }

  componentDidMount = async () => {
    const instance = axios.create({
      baseURL: "https://superappbot.development.techforce.ai/ecs/analytics/",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const dashboardCards = await instance.post(`topmetrics`, {
      start_date: "2022-01-11",
      end_date: Moment().format("YYYY-MM-DD"),
    });
    const topcreatorsList = await instance.post(`topcreators`, {
      start_date: "2022-01-11",
      end_date: Moment().format("YYYY-MM-DD"),
    });

    console.log("data", dashboardCards.data.data);
    if (dashboardCards.status) {
      this.setState({
        topMetrics: dashboardCards.data.data,
      });
    } else {
      this.setState({
        topMetrics: [],
      });
    }
    if (topcreatorsList.status) {
      this.setState({
        topcreatorsList: topcreatorsList.data.data,
      });
    }
    const instance2 = axios.create({
      baseURL: "http://localhost:5000/analytics/",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const efforts = await instance2.post(`processFlowDetails`, {
      start_date: "2022-01-11",
      end_date: "2022-03-15",
    });

    if (efforts.status) {
      sessionStorage.setItem("flowData", JSON.stringify(efforts.data.data));
      this.setState({
        processFlowData: efforts.data.data,
      });
    } else {
      this.setState({
        processFlowData: [],
      });
    }

    // console.log("final data", this.state.topMetrics);
    // console.log("final data1", this.state.topcreatorsList);
    // console.log("final data2", this.state.efforts);
    // console.log("final data3", this.state.newcontent);
    // console.log("final data4", this.state.utilization);
  };

  render() {
    return (
      <div className="wrapper dbnew">
        <div className="wrap bg1">
          <Header></Header>
          <div className="dbNewleftside">
            <div className="sidelogo">
              <a href="#">
                <img src="/assets/img/greenlogo.png" width="25" />
              </a>
            </div>
            <div className="scrollbar">
              <div className="newsideLeftInner">
                <div className="sidemenu">
                  <ul>
                    <li className="active">
                      <a href="#">
                        <span>
                          <img src="/assets/img/home.png" width="20" />
                        </span>{" "}
                        Home
                      </a>
                    </li>

                    <li>
                      <NavLink to={`/view`}>
                        <a href="#">
                          <span>
                            <img src="/assets/img/super.png" width="40" />
                          </span>{" "}
                          Super
                        </a>
                      </NavLink>
                    </li>
                    <li>
                      <a href="#">
                        <span>
                          <img src="/assets/img/Skills.png" width="16" />
                        </span>{" "}
                        My Skills
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span>
                          <img src="/assets/img/Task.png" width="16" />
                        </span>{" "}
                        My Task
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span>
                          <img src="/assets/img/Notes.png" width="17" />
                        </span>{" "}
                        My Notes
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="sidemenu footsideMenu">
                  <ul>
                    <li>
                      <a href="#">
                        <span>
                          <img src="/assets/img/store.png" width="20" />
                        </span>{" "}
                        Super Store
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span>
                          <img src="/assets/img/bell.png" width="16" />
                        </span>
                        <i></i>
                      </a>
                    </li>
                    <li className="active">
                      <a href="#">
                        <span>
                          <img src="/assets/img/super1.png" width="40" />
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="contentarea">
            <div className="topTitleArea">
              <h2>
                Dashboard <span>6 Months</span>
              </h2>
            </div>
            <div className="spinner">
              <i className="fa fa-cog"></i>
            </div>
            <div className="scrollbar">
              <div className="scrollbarInner">
                <div className="listboxSec">
                  <div className="lbCol">
                    <img src="/assets/img/c-icon-1.png" />
                    <div className="lbcolInner">
                      <h1>
                        {this.state.topMetrics &&
                        this.state.topMetrics.length > 0
                          ? this.state.topMetrics[0].automation_skill_count
                          : 0}
                      </h1>
                      <p>On Boarded Skills</p>
                    </div>
                  </div>
                  <div className="lbCol">
                    <img src="/assets/img/c-icon-2.png" />
                    <div className="lbcolInner">
                      <h1>
                        {this.state.topMetrics &&
                        this.state.topMetrics.length > 0
                          ? this.state.topMetrics[0].helper_skill_count
                          : 0}
                      </h1>

                      <p>Helper Skills Referred </p>
                    </div>
                  </div>
                  <div className="lbCol">
                    <img src="/assets/img/c-icon-3.png" />
                    <div className="lbcolInner">
                      <h1>
                        {this.state.topMetrics &&
                        this.state.topMetrics.length > 0
                          ? this.state.topMetrics[0].notes_count
                          : 0}
                      </h1>

                      <p>Notes Referred </p>
                    </div>
                  </div>
                  <div className="lbCol">
                    <img src="/assets/img/c-icon-4.png" />
                    <div className="lbcolInner">
                      <h1>
                        {this.state.topMetrics &&
                        this.state.topMetrics.length > 0
                          ? this.state.topMetrics[0].creator_count
                          : 0}
                      </h1>

                      <p>Creators</p>
                    </div>
                  </div>

                  <div className="lbCol hoursave">
                    <div className="lbcolInner">
                      <h1>500K</h1>
                      <p>Hours Saved</p>
                    </div>
                  </div>
                </div>
                <div className="boxsecN">
                  <div className="boxW75 boxbg">
                    <div className="titleB">
                      <h2>New Content Created</h2>
                    </div>
                    <div className="grapcol">
                      <Chat></Chat>
                      {/* <img src="/assets/img/grap1.jpg" width="100%" /> */}
                    </div>
                  </div>
                  <div className="boxW25 boxbg">
                    <div className="titleB">
                      <h2>
                        <img
                          src="/assets/img/topicon.png"
                          width="16"
                          height="16"
                        />{" "}
                        &nbsp;Top Creators
                      </h2>
                    </div>

                    <div className="toplist">
                      <div className="scrollbar">
                        {this.state.topcreatorsList &&
                        this.state.topcreatorsList.length > 0 ? (
                          <ul>
                            {this.state.topcreatorsList &&
                              this.state.topcreatorsList.map((item) => (
                                <li ky={item.rn}>
                                  <div className="tcimg">
                                    <img
                                      src={`${item.profile_img}`}
                                      width="30"
                                      height="30"
                                    />
                                    <h3>{item.user_name}</h3>
                                  </div>

                                  <div className="tcaction">
                                    <span>{item.skill_count}</span>
                                    <i>{item.rn}</i>

                                    <img
                                      src="/assets/img/tc-mark-1.png"
                                      width="13"
                                      height="17"
                                    />
                                  </div>
                                </li>
                              ))}
                          </ul>
                        ) : (
                          <h5 className="text-center">No Data Found</h5>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="boxsecN">
                  <div className="boxW50 boxbg">
                    <div className="titleB">
                      <h2>Utilisation</h2>
                    </div>
                    <div className="grapcol">
                      <LineGraph></LineGraph>

                      {/* <Utilisation></Utilisation> */}
                      {/* <img src="/assets/img/grap2.jpg" width="100%" /> */}
                    </div>
                  </div>
                  <div className="boxW50 boxbg rt">
                    <div className="titleB">
                      <h2>Efforts & Cost Saved</h2>
                    </div>
                    <div className="grapcol">
                      <CostGraph></CostGraph>

                      {/* <img src="/assets/img/grap3.jpg" width="100%" /> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
