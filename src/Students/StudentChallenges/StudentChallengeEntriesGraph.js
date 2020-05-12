import React, { Component } from "react";
import { Redirect, withRouter } from "react-router-dom";
import { CONVERT_TIME } from "../../Utilities/UtilityFunctions";
import Chart from "chart.js";

class ChallengeHistoryGraph extends Component {
  state = {
    chart: null,
    redirectUrl: "",
  };

  chartRef = React.createRef();

  componentDidMount() {
    const chart = this.renderChart();
    this.setState({ chart });
  }

  renderChart() {
    const myChartRef = this.chartRef.current.getContext("2d");
    if (myChartRef) {
      return new Chart(myChartRef, {
        props: this.getProps(),
        type: "line",
        data: {
          IDs: this.getIDs(),
          labels: this.getLabels(),
          datasets: [
            {
              data: this.getData(),
              pointBackgroundColor: "#0b800d",
              fill: false,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          legend: {
            display: false,
          },
          hover: {
            onHover: function (e) {
              var point = this.getElementAtEvent(e);
              if (point.length) e.target.style.cursor = "pointer";
              else e.target.style.cursor = "default";
            },
          },
          title: {
            display: false,
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  callback: function (value) {
                    const { units } = this.chart.config.props.challengeType;
                    return units === "seconds" ? CONVERT_TIME(value) : value;
                  },
                },
              },
            ],
          },
          tooltips: {
            callbacks: {
              label: function (tooltipItem) {
                const {
                  units,
                } = this._chart.chart.chart.config.props.challengeType;
                return units === "seconds"
                  ? CONVERT_TIME(tooltipItem.yLabel)
                  : `${tooltipItem.yLabel} ${units}`;
              },
            },
          },
        },
      });
    }
  }

  getProps() {
    return this.props;
  }

  getIDs() {
    return this.props.challengeEntries.map((challenge) => {
      return challenge.challenge_entry_id;
    });
  }

  getLabels() {
    return this.props.challengeEntries.map((challenge) => {
      return challenge.entry_date;
    });
  }

  getData() {
    return this.props.challengeEntries.map((challenge) => {
      return challenge.record;
    });
  }

  handleClick(e, ref) {
      const chartElement = this.state.chart.getElementsAtEvent(e)[0]
      return chartElement ? this.setRedirect(chartElement) : null 
  }

  setRedirect(chartElement){
    var index = chartElement["_index"];
    const challengeEntryId = this.state.chart.data.IDs[index];
    const redirectUrl = `/students/${this.props.match.params.rowId}/challenge-entries/${challengeEntryId}`;
    this.setState({ redirectUrl });
  }

  render() {
    return (
      <>
        {this.state.redirectUrl.length > 0 ? (
          <Redirect to={this.state.redirectUrl} />
        ) : null}

        <div className="student-challenge-entries-graph">
          <canvas ref={this.chartRef} onClick={(e) => this.handleClick(e)} />
        </div>
      </>
    );
  }
}

export default withRouter(ChallengeHistoryGraph)
