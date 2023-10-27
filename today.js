let today = new Date();
let thMonth = [
  "มกราคม",
  "กุมภาพันธ์",
  "มีนาคม",
  "เมษายน",
  "พฤษภาคม",
  "มิถุนายน",
  "กรกฏาคม",
  "สิงหาคม",
  "กันยายน",
  "ตุลาคม",
  "พฤศจิกายน",
  "ธันวาคม",
];
date = today.getDate() + " " + thMonth[today.getMonth()] + " " + parseInt(today.getFullYear() + 543);

// New Export in node v14 or newer (dev on v16)
module.exports = date


// export {date} cannot use 