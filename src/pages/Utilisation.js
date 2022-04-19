import React, { Component } from "react";
import axios from "axios";
import * as _ from "underscore";
import Moment from "moment";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: false,
      text: "Chart.js Line Chart",
    },
  },
};

class LineGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      utilization: [],
    };
  }
  componentDidMount = async () => {
    const instance = axios.create({
      baseURL: "https://superappbot.development.techforce.ai/ecs/analytics/",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const utilization = await instance.post(`utilization`, {
      start_date: "2022-01-11",
      end_date: Moment().format("YYYY-MM-DD"),
    });

    if (utilization.status) {
      this.setState({
        utilization: utilization.data.data,
      });
    } else {
      this.setState({
        utilization: [],
      });
    }

    console.log("utilization", this.state.utilization);
  };
  render() {
    let labelList = [];
    let use_count = [];
    // let hours_saved = [];
    if (this.state.utilization && this.state.utilization.length > 0) {
      labelList = _.pluck(this.state.utilization, "used_month");
      use_count = _.pluck(this.state.utilization, "use_count");
      //   hours_saved = _.pluck(this.state.efforts, "hours_saved");
    }

    const labels = labelList;

    const data = {
      labels,
      datasets: [
        {
          label: "Automation Skill",
          data: use_count,
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        // {
        //   label: "Dataset 2",
        //   data: [14, 33, 52, 61, 71, 81, 39],
        //   borderColor: "rgb(53, 162, 235)",
        //   backgroundColor: "rgba(53, 162, 235, 0.5)",
        // },
        // {
        //   label: "Dataset 3",
        //   data: [34, 33, 52, 61, 71, 85, 29],
        //   borderColor: "rgb(53, 162, 235)",
        //   backgroundColor: "rgba(53, 162, 235, 0.5)",
        // },
      ],
    };

    return <Line options={options} data={data} />;
  }
}
export default LineGraph;
