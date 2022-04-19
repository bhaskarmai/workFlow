import React, { Component } from "react";
import axios from "axios";
import * as _ from "underscore";

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
import Moment from "moment";

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

class CostGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      efforts: [],
    };
  }
  componentDidMount = async () => {
    const instance = axios.create({
      baseURL: "https://superappbot.development.techforce.ai/ecs/analytics/",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const efforts = await instance.post(`efforts`, {
      start_date: "2022-01-11",
      end_date: Moment().format("YYYY-MM-DD"),
    });

    if (efforts.status) {
      this.setState({
        efforts: efforts.data.data,
      });
    } else {
      this.setState({
        efforts: []
      });
    }

    console.log("cost data2", this.state.efforts);
  };
  render() {
    let labelList = [];
    let cost_saved = [];
    let hours_saved = [];
    // console.log("cost data2", this.state.efforts);
    if (this.state.efforts && this.state.efforts.length > 0) {
      labelList = _.pluck(this.state.efforts, "used_month");
      cost_saved = _.pluck(this.state.efforts, "cost_saved");
      hours_saved = _.pluck(this.state.efforts, "hours_saved");
    }

    const labels = labelList;

    const data = {
      labels,
      datasets: [
        {
          label: "Cost Saved",
          data: cost_saved,
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
          label: "Hours Saved",
          data: hours_saved,
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
      ],
    };

    // console.log("cost", this.props.cost);
    return <Line options={options} data={data} />;
  }
}
export default CostGraph;
