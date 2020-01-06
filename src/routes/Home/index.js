import React, { Component } from "react";
import style from "./style.less";
import { getReport, getQuestionsReport } from "@/services/home";
import ReactEcharts from "echarts-for-react";

class Home extends Component {
  state = {
    report: [],
    type_scale: [],
    subject_scale: [],
    exam_scale: []
  };
  init() {
    getReport().then(res => {
      this.setState({
        report: res.report
      });
    });
    getQuestionsReport().then(res => {
      this.setState({
        type_scale: res.type_scale,
        subject_scale: res.subject_scale,
        exam_scale: res.exam_scale
      });
    });
  }
  getOption(data, title) {
    return {
      title: {
        text: title,
        x: "left"
      },
      series: [
        {
          name: "题目类型",
          type: "pie",
          radius: ["50%", "70%"],
          data: data,
          color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80"]
        }
      ],
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      legend: {
        x: "left",
        y: "bottom",
        data: data.map(item => item.name)
      }
    };
  }
  getHistogram() {
    const data_x = this.state.subject_scale.map(item => item.subject_text);
    const data = this.state.subject_scale.map(item => item.num);
    return {
      title: {
        text: "课程类型统计",
        x: "left"
      },
      color: ["#3398DB"],
      tooltip: {
        trigger: "axis",
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true
      },
      xAxis: [
        {
          type: "category",
          data: data_x,
          axisTick: {
            alignWithLabel: true
          },
          axisLabel: {
            rotate: -30
          }
        }
      ],
      yAxis: [
        {
          type: "value"
        }
      ],
      series: [
        {
          name: "题目数量",
          type: "bar",
          barWidth: "60%",
          data: data
        }
      ]
    };
  }
  componentDidMount() {
    this.init();
  }
  get type_data() {
    return this.state.type_scale.map(item => {
      return { value: item.num, name: item.questions_type_text };
    });
  }
  get exam_data() {
    return this.state.exam_scale.map(item => {
      return { value: item.num, name: item.exam_name };
    });
  }
  render() {
    return (
      <div>
        <div className={style.report}>
          {this.state.report.map((item, index) => (
            <div className={style.reportItem} key={index}>
              <span>{item.label}</span>
              <p>{item.num}</p>
            </div>
          ))}
        </div>
        <div className={style.canvasWrap}>
          <ReactEcharts
            option={this.getOption(this.type_data, "题目类型统计")}
            notMerge={true}
            lazyUpdate={true}
            theme={"theme_name"}
            className={style.canvas}
          />
          <ReactEcharts
            option={this.getOption(this.exam_data, "考试类型统计")}
            notMerge={true}
            lazyUpdate={true}
            theme={"theme_name"}
            className={style.canvas}
          />
        </div>
        <ReactEcharts
          option={this.getHistogram()}
          notMerge={true}
          lazyUpdate={true}
          theme={"theme_name"}
          className={style.histogram}
        />
      </div>
    );
  }
}

export default Home;
