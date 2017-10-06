import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';
import EmptyDataPage from './EmptyDataPage';
class Chart extends Component{

  static defaultProps = {
    displayTitle:true,
    displayLegend: true,
    legendPosition:'right',
  };


  render() {
    const { users } = this.props;
    const usersJS = users.toJS();
    const totalUserCnt = usersJS.map(user => user.totalUserCnt);
    const androidUserCnt = usersJS.map(user => user.androidUserCnt);
    const iosUserCnt = usersJS.map(user => user.iosUserCnt);
    const dates = usersJS.map(user => user.date + "T" + user.time);
    const chartData = {
      labels: dates,
      datasets:[
        {
          label: '전체',
          data: totalUserCnt,
          fill: false,
          borderColor: "blue"
        },
        {
          label: '안드로이드',
          data: androidUserCnt,
          fill: false,
          borderColor: "red",
        },
        {
          label: 'iOS',
          data: iosUserCnt,
          fill: false,
          borderColor: "yellow",
        }
      ]
    };

    return (
        <section id="user-cnt-chart-wrapper">
          { dates.length === 0 ? <EmptyDataPage/> : <Line
              data={chartData}
              options={{
                title:{
                  display:this.props.displayTitle,
                  text:'시간당 사용자 수 그래프',
                  fontSize:16
                },
                legend:{
                  display:this.props.displayLegend,
                  position:this.props.legendPosition
                },
                scales: {
                  xAxes: [{
                    type: 'time',
                    time: {
                      unit: 'hour',
                      min: dates[0],
                      max: dates[dates.length - 1],
                      displayFormats: {
                        hour: 'YYYY-MMM-D-hA'
                      }
                    }
                  }
                  ],
                  yAxes: [{
                    scaleLabel: {
                      display: true,
                      labelString: '사용자 수',
                      fontSize: 20
                    }
                  }]
                }
              }}
          /> }
        </section>
    )
  }
}

export default Chart;