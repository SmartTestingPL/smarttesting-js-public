const now = () => new Date()

const sleep = (millis) => {
    var date = new Date();
    var curDate = null;
    do { curDate = new Date(); }
    while (curDate-date < millis);
}

// human-readable months counted from 1, new Datec months counted from 0
const createDate = (y, m, d) => new Date(y, m-1, d)

module.exports = {
  now,
  sleep,
  createDate,
}
