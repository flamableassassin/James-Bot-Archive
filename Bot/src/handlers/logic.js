module.exports = {
  first,
  dateconv,
  nano
}

function first(map) {
  return map.entries().next();
}

function dateconv(timestamp) {
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  var date = new Date(timestamp);
  return `${date.getUTCFullYear()} ${monthNames[date.getUTCMonth()]} ${date.getUTCDate()} ${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()}`;
}

function nano(d) {
  d = Number(d);
  var h = Math.floor(d / 1000000);
  var m = Math.floor(d % 1000000 / 1000);
  var s = Math.floor(d % 1000000 % 1000);

  var hDisplay = h > 0 ? h + "ms " : "";
  var mDisplay = m > 0 ? m + "μs " : "";
  var sDisplay = s > 0 ? s + "ns " : "";
  return hDisplay + mDisplay + sDisplay;
}
