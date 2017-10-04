const users  = require('../database');
const _ = require('lodash');

module.exports = {
  users: (req, res) => {
    const untilDate = req.params.untilDate;
    /**
     * 한국 시간으로 변환 했을 timezone에 맞게 변형해 준다.
     * ex) 2017-9-27을 getTime을 통해 unixtime을 얻으면 UTC의 2017-9-27일이고
     * 한국 timezone으로 변환하면 2017-09-27 +9시가 돤다.
     * 때문에 실제 한국 timezone으로 변환 했을 때 2017-9-21이 되는 시간을 얻으려면 9시간을 빼주어야 한다.
     */
    const finishDateTS = new Date(untilDate).getTime() - 9 * 3600000 + 12 * 3600000;
    const startDateTS = finishDateTS - 3600000 * 24 * 7;

    const filterPeriod = user => user.date >= startDateTS && user.date <= finishDateTS;
    /* 가입시간을 시간단위로 자르는 함수 */
    const roundDownToHour = (user) => {
      const dateObj = new Date(user.date);
      const year = dateObj.getFullYear();
      const month = dateObj.getMonth() + 1;
      const date = dateObj.getDate();
      const hours = dateObj.getHours();
      return `${year}-${month}-${date}-${hours}`;
    };

    const makeUserPerHourObj = (users, key) => {
      const [androidUsers, iosUsers] = _.partition(users, user => _.includes(user.device, "Android"));
      const [year, month, date, hours] = key.split("-");
      return {
        "date": `${year}-${month}-${date}`,
        "time": `${hours}`,
        "totalUserCnt": users.length,
        "androidUserCnt": androidUsers.length,
        "iosUserCnt": iosUsers.length
      }
    };

    const filteredUsers = _(users)
    .filter(filterPeriod)
    .groupBy(roundDownToHour)
    .map(makeUserPerHourObj);
    res.json(filteredUsers);
  }
};

