import React from "react"
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'
import PropTypes from "prop-types"

const GameNightPieChart = ({ title, votes }) => {
    const voteMap = getVoteMap(votes)
    const data = getData(votes, voteMap)
    const options = getOptions(title, data)
    return <div>
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
        />
    </div>
}

const getVoteMap = (votes) => {
    return votes.reduce(function(map, vote) {
        const existingVotes = map[vote.option]
        if (existingVotes) {
            existingVotes.push(vote.username)
            map[vote.option] = existingVotes
        } else {
            map[vote.option] = [vote.username]
        }
        return map
    }, {})
}

const getData = (votes, voteMap) => {
    const data = []
    const total = votes.length
    for (var key in voteMap){
        const gameNightVotes = voteMap[key]
        const y = gameNightVotes.length/total
        data.push({name: key,  y})
    } 
    return data
}

const getOptions = (title, data) => {
    return {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: title
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                }
            }
        },
        series: [{
            name: 'Brands',
            colorByPoint: true,
            data: data
        }]
    }
}

GameNightPieChart.propTypes = {
    title: PropTypes.string.isRequired,
    votes: PropTypes.array.isRequired
};

export default GameNightPieChart