/* eslint-disable no-useless-constructor */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import axios from "axios";
import * as _ from "underscore";
// import Flow from '../flow.tsx'

import OverviewFlow from "./overviewFlow";
class Overview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      finalData: [],
      processFlowData: [],
      condition: false,
      countData: [],
    };
  }
  componentDidMount = async () => {
    const instance = axios.create({
      baseURL: "http://localhost:5000/analytics/",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const efforts = await instance.post(`processFlowDetails`, {
      start_date: "2022-01-11",
      end_date: "2022-03-15",
    });
    if (efforts.status) {
      sessionStorage.setItem("flowData", JSON.stringify(efforts.data.data));
      this.setState({
        // finalData: efforts.data.data,
        processFlowData: efforts.data.data,
        countData: _.uniq(_.pluck(efforts.data.data, "conf_lvl")),
      });
    } else {
      this.setState({
        processFlowData: [],
      });
    }
    console.log("processFlowData", this.state.processFlowData);
  };

  filterData = (event) => {
    this.setState({
      condition: false,
    });

    setTimeout(() => {
      const temp = _.filter(
        this.state.processFlowData,
        (item) =>
          parseInt(item.conf_lvl, 10) === parseInt(event.target.value, 10)
      );
      console.log("temp", temp);

      this.setState({
        condition: true,
        finalData: temp,
      });
    }, 2000);

    // setTimeout(() => {
    //   this.setState({
    //     condition: false,
    //   });
    // }, 5000);
  };

  forceUpdate = () => {
    <OverviewFlow flowData={this.state.finalData} />;
  };
  render() {
    const { condition } = this.state;

    return (
      <div className="wrapper">
        <div className="wl">
          <nav id="website-wrapper">
            <div className="toparea">
              <h3>01 - Open Chrome</h3>
              <a id="close-website" href="#" className="" title="back">
                <img src="/assets/img/back-arrow.png" />
              </a>
            </div>
            <div className="sideinner">
              <div className="opensitebtn">
                <ul>
                  <li>
                    <a href="#">
                      <img src="/assets/img/iconrefresh.png" width="13" />{" "}
                      Retrain Step
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img src="/assets/img/delete-hov.png" /> Remove
                    </a>
                  </li>
                </ul>
              </div>
              <div className="scrollbar">
                <div className="siteinput">
                  <ul>
                    <li>
                      <div className="iconcol">
                        <img src="/assets/img/icon-op1.png" />
                      </div>
                      <span>Open Chrome</span>
                      <input name="" type="text" placeholder="Text" />
                    </li>
                    <li>
                      <div className="iconcol">
                        <img src="/assets/img/icon-op2.png" />
                      </div>
                      <span>Input Text</span>
                      <input name="" type="text" placeholder="Text" />
                    </li>
                    <li>
                      <div className="iconcol">
                        <img src="/assets/img/icon-op3.png" />
                      </div>
                      <span>Keyboard Tab</span>
                      <input name="" type="text" placeholder="Text" />
                    </li>
                    <li>
                      <div className="iconcol">
                        <img src="/assets/img/icon-op4.png" />
                      </div>
                      <span>Mouse</span>
                      <input name="" type="text" placeholder="Text" />
                    </li>
                    <li>
                      <div className="iconcol">
                        <img src="/assets/img/icon-op5.png" />
                      </div>
                      <span>Loop</span>
                      <input name="" type="text" placeholder="Text" />
                    </li>

                    <li>
                      <div className="iconcol">
                        <img src="/assets/img/icon-op1.png" />
                      </div>
                      <span>Open Chrome</span>
                      <input name="" type="text" placeholder="Text" />
                    </li>
                    <li>
                      <div className="iconcol">
                        <img src="/assets/img/icon-op2.png" />
                      </div>
                      <span>Input Text</span>
                      <input name="" type="text" placeholder="Text" />
                    </li>
                    <li>
                      <div className="iconcol">
                        <img src="/assets/img/icon-op3.png" />
                      </div>
                      <span>Keyboard Tab</span>
                      <input name="" type="text" placeholder="Text" />
                    </li>
                    <li>
                      <div className="iconcol">
                        <img src="/assets/img/icon-op4.png" />
                      </div>
                      <span>Mouse</span>
                      <input name="" type="text" placeholder="Text" />
                    </li>
                    <li>
                      <div className="iconcol">
                        <img src="/assets/img/icon-op5.png" />
                      </div>
                      <span>Loop</span>
                      <input name="" type="text" placeholder="Text" />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </nav>
        </div>
        <header>
          <div className="wrap">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-12 rrcol">
                  <div className="backlink">
                    <NavLink to={`/Dashboard`}>
                      <img src="/assets/img/back-arrow.png" />
                    </NavLink>
                  </div>
                  <h3>Recording Review</h3>
                  <div className="actionbox">
                    <ul>
                      <li className="play">
                        <a href="#">Play</a>
                      </li>
                      <li className="retrain">
                        <a href="#">Retrain</a>
                      </li>
                      <li className="cancel">
                        <a href="#">Cancel</a>
                      </li>
                    </ul>
                  </div>

                  <div className="publishlist">
                    <ul>
                      <li>
                        <a href="#">Publish</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        <div className="row">
          <div className="col-md-3">
            <select className="form-control" onChange={this.filterData}>
              <option value="">Select Count</option>
              {this.state.countData.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-4">
            {/* <button onClick={this.forceUpdate}>Click to re-render</button> */}
          </div>
        </div>
        {condition === true ? (
          <OverviewFlow flowData={this.state.finalData} />
        ) : (
          <div>
            {this.state.finalData.length === 0 && !condition ? (
              <div>
                <h4 style={{ textAlign: "center" }}>No Data found</h4>
              </div>
            ) : (
              <img
                src="https://c.tenor.com/gJLmlIn6EvEAAAAC/loading-gif.gif"
                // width="30"
                style={{ display: "flex", margin: "auto" }}
              />
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Overview;
