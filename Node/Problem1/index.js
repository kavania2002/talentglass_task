const reader = require("xlsx");
const fs = require("fs");

const file = reader.readFile("./kepler_data.xlsx");

// reference from GeeksforGeeks
function writingOutput(file) {
  const sheets = file.SheetNames;

  // All the data of the excel file
  let data = [];

  for (let i = 0; i < sheets.length; i++) {
    const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
    temp.forEach((res) => {
      data.push(res);
      //   console.log(res);
    });
  }

  // Printing data
  // console.log(data)

  // file created to refer the JSONObjects
  fs.writeFile("./output.js", JSON.stringify(data), (err) => {
    if (err) console.log(err);
  });
}

// writingOutput(file);

const keplerData = require('./output.js');

/*
Reference for each column
koi_disposition = __EMPTY_2    should be confirmed
koi_insol = __EMPTY_30         shoule be between .36 and 1.11
koi_prad = __EMPTY_24          should be less than 1.6
kepler_name = __EMPTY_1
*/
const n = keplerData.length;
let result = []

for (let i = 51; i<n; i++) {
  let ithData = keplerData[i];
  // console.log(ithData);
  if (ithData.__EMPTY_2 == 'CONFIRMED' && (ithData.__EMPTY_30  >= 0.36 && ithData.__EMPTY_30  <= 1.11) && ithData.__EMPTY_24 < 1.6) {
    result.push(ithData.__EMPTY_1);
  }
}

console.log(result);