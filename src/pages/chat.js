import React, { Component } from "react";
import axios from "axios";
import * as _ from "underscore";
import Moment from "moment";


import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
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
      text: "Chart.js Bar Chart",
    },
  },
};

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newcontent: [],
    };
  }
  componentDidMount = async () => {
    const instance = axios.create({
      baseURL: "https://superappbot.development.techforce.ai/ecs/analytics/",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const newcontent = await instance.post(`newcontent`, {
      start_date: "2022-01-11",
      end_date:  Moment().format("YYYY-MM-DD"),
    });
    if (newcontent.status) {
      this.setState({
        newcontent: newcontent.data.data,
      });
    }

    console.log("cost data2", this.state.newcontent);
  };
  render() {
    let labelList = [];
    let helper_skill_count = [];
    let notes_count = [];
    let automation_skill_count = [];
    if (this.state.newcontent && this.state.newcontent.length > 0) {
      labelList = _.pluck(this.state.newcontent, "created_month");
      helper_skill_count = _.pluck(this.state.newcontent, "helper_skill_count");
      notes_count = _.pluck(this.state.newcontent, "notes_count");
      automation_skill_count = _.pluck(
        this.state.newcontent,
        "automation_skill_count"
      );
    }
    const labels = labelList;
    const data = {
      labels,
      datasets: [
        {
          label: "Automation Skill",
          data: automation_skill_count,
          backgroundColor: "#8a7967",
        },
        {
          label: "Notes",
          data: notes_count,
          backgroundColor: "#00a4e4",
        },
        {
          label: "Helper Skill",
          data: helper_skill_count,
          backgroundColor: "#f47721",
        },
      ],
    };
    return <Bar options={options} data={data} />;
  }
}
export default Chat;
