/*
    Run from command line: node json-creator.js `path-to-config.json` `path-to-dates.json` `name-to-output-to`
 */

var fs = require("fs");
require("./Object-assign-polyfill");
var utils = require("./node-utils");
var args = process.argv.splice(2, process.argv.length);
var pickerData = {};

if(args.length !== 3) {
    throw new Error("You need to pass in first the calendar config, then the dates object then the file name to output to.")
}

var loadCalendarConfig = new Promise(function(res, rej) {
    fs.readFile("../data/" + args[0], function(e, data) { e ? console.log(e) : res(data); });
});

var loadDatesConfig = new Promise(function(res, rej) {
    fs.readFile("../data/" + args[1], function(e, data) { e ? console.log(e) : res(data); });
});

var filename = args[2];

Promise.all([loadCalendarConfig, loadDatesConfig]).then(function(data) {
    if(data.length === 2) {
        startParsingData(JSON.parse(data[0]), JSON.parse(data[1]));
    }
    else {
        console.log("not loaded!");
    }
});

function startParsingData(config, dayConfigs) {
    pickerData.basketTotal = config.orderTotals.OverallTotalNumber;
    pickerData.state = config.calendarConfiguration.dataState;
    pickerData.dates = utils.sortDates(config, dayConfigs);
    pickerData.hasDeliveryDates = !!pickerData.dates.length;
    pickerData.weeksInConfig = utils.numOfWeeksInConfig();
    pickerData.dateRanges = utils.createDateRanges(pickerData.weeksInConfig);
    pickerData.tableHeadData = utils.createTableHeadData();
    pickerData.tableBodyData = utils.createTableBodyData(dayConfigs, config);
    fs.writeFile("../../build/data/" + filename + ".json", JSON.stringify(pickerData, null, 4), function (err) {
        if (err) return console.log(err);
    });
}