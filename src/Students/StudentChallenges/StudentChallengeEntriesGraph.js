import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {CONVERT_TIME} from '../../Utilities/UtilityFunctions'
import Chart from 'chart.js'

export default class ChallengeHistoryGraph extends Component{
    state = {
        chart: null, 
        chartRef: null,
        redirectUrl: ''
    }
    
    chartRef = React.createRef()
    
    componentDidMount() {
        const chartRef = this.chartRef
        const chart = this.renderChart()

        // const chart = this.renderChart()
        // this.setState({chart})

        // const chartRef = this.chartRef
        // this.setState({chartRef})

        // const chart = this.renderChart()
        // this.setState({chart})
    }

    // componentDidUpdate(prevProps){
    //   if(prevProps.challenges !== this.props.challenges){
    //     this.renderChart()
    //   }
    // }

    renderChart(){
        const myChartRef = this.chartRef.current.getContext("2d")
        return new Chart(myChartRef, {
            props: this.getProps(),
            type: "line",
            data: {
                IDs: this.getIDs(), 
                labels: this.getLabels(),
                datasets: [
                    {
                        data: this.getData(),
                        pointBackgroundColor: '#0b800d',
                        fill: false,
                    }
                ]
                },
            options: {
                responsive: true,
                maintainAspectRatio: true, 
                legend: {
                    display: false
                },
                hover: {
                    onHover: function(e) {
                    var point = this.getElementAtEvent(e);
                    if (point.length) e.target.style.cursor = 'pointer';
                    else e.target.style.cursor = 'default';
                    }
                },
                title: {
                display: false, 
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            callback: function(value) {
                                const {units} = this.chart.config.props.challengeType
                                return units === 'seconds' ? CONVERT_TIME(value) : value
                            }
                        }
                    }]
                },
                tooltips: {
                    callbacks: {
                    label: function(tooltipItem) {
                        const {units} = this._chart.chart.chart.config.props.challengeType
                        return units === 'seconds' ? CONVERT_TIME(tooltipItem.yLabel) : `${tooltipItem.yLabel} ${units}`
                    }
                    }
                }
            }
        })
        }  

    getProps(){
        return this.props
    }

    getIDs(){
        return this.props.challengeEntries.map(challenge => {
            return challenge.challenge_entry_id
        })    
    }

    getLabels(){
        return this.props.challengeEntries.map(challenge => {
            return challenge.entry_date
        })
    }

    getData(){
        return this.props.challengeEntries.map(challenge => {
            return challenge.record
        })
    }

    handleClick(e, ref){
        var index = this.state.chart.getElementsAtEvent(e)[0]["_index"];
        const challengeEntryId = this.state.chart.data.IDs[index]
        const redirectUrl = `/challenge-entries/${challengeEntryId}`
        this.setState({redirectUrl})
    }

    render() {
        return (
          <>
          {this.state.redirectUrl.length > 0 ? <Redirect to={this.state.redirectUrl}/> : null}
          
          <div className='student-challenge-entries-graph'>
                <canvas
                    ref={this.chartRef}
                    onClick={(e) => this.handleClick(e)}
                />
            </div>
            </>
        )
    }
}
