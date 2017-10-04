import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';

class Chart extends Component{

  static defaultProps = {
    displayTitle:true,
    displayLegend: true,
    legendPosition:'right',
  };

  ChangeDateFormat(_date, time){
    let [year, month, date] = _date.split("-");
    month = month.length === 1 ? '0' + month : month;
    date = date.length === 1 ? '0'+ date : date;
    time = time.length === 1 ? '0'+ time : time;
    return `${year}-${month}-${date}T${time}`
  }

  render() {
    const { ChangeDateFormat } = this;
    const { users } = this.props;
    const usersJS = users.toJS();
    const totalUserCnt = usersJS.map(user => user.totalUserCnt);
    const androidUserCnt = usersJS.map(user => user.androidUserCnt);
    const iosUserCnt = usersJS.map(user => user.iosUserCnt);
    const dates = usersJS.map(user => ChangeDateFormat(user.date,user.time));
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
        <Line
            data={chartData}
            options={{
              title:{
                display:this.props.displayTitle,
                text:'시간당 사용자 수 라인 차트',
                fontSize:25
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
        />
    )
  }
}

export default Chart;