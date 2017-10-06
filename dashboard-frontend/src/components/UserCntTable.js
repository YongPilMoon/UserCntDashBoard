import React from 'react';
import _ from 'lodash';

const UserCntTable = ({users}) => {
  const usersJS = users.toJS();
  const usersForTable = _(usersJS)
  .groupBy(user => user.date)
  .toArray()
  .value();
  return (
      <section id="user-cnt-table-wrapper">
        { usersForTable.length === 0 ? null :
            <table>
              <caption id="user-cnt-table-capture">시간당 사용자 수 표</caption>
              <thead>
              <tr>
                <th>시간</th>
                <th>12AM</th>
                <th>1AM</th>
                <th>2AM</th>
                <th>3AM</th>
                <th>4AM</th>
                <th>5AM</th>
                <th>6AM</th>
                <th>7AM</th>
                <th>8AM</th>
                <th>9AM</th>
                <th>10AM</th>
                <th>11AM</th>
                <th>12PM</th>
                <th>1PM</th>
                <th>2PM</th>
                <th>3PM</th>
                <th>4PM</th>
                <th>5PM</th>
                <th>6PM</th>
                <th>7PM</th>
                <th>8PM</th>
                <th>9PM</th>
                <th>10PM</th>
                <th>11PM</th>
              </tr>
              </thead>
              <tbody>
              { _.map(usersForTable, (usersPerHour, index) =>
                  <tr key={index}>
                    <td className="date-row">{ usersPerHour[0].date }</td>
                    { index === 0 ? _.range(12).map(i => <td key={i}> </td>) :  null }
                    { usersPerHour.map(user =>
                        <td key={user.date + user.time}>{
                          <div>
                            <span className="total-user-cnt">{ user.totalUserCnt }</span>
                            <span className="device-cnt">
                              <br/>And {user.androidUserCnt}
                              <br/>iOS {user.iosUserCnt}
                            </span>
                          </div>
                        }
                        </td>) }
                  </tr>
              )}
              </tbody>
            </table>
        }
      </section>
  );
};

export default UserCntTable;