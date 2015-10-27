module.exports = {
    sortDates : sortDates,
    numOfWeeksInConfig : numOfWeeksInConfig,
    createDateRanges : createDateRanges,
    createTableHeadData : createTableHeadData,
    createTableBodyData : createTableBodyData
};

var dates;
var daysToDisplay = 7;

/*
    Take the initial config object of shortdates and date description
    e.g. { 20151025 : "Sunday" }
    fill in any gaps (some dates maybe missing) and return the object
 */

function sortDates(config, dateConfig) {
    var days = config.calendarConfiguration.availableDays;
    var charges = config.calendarConfiguration.chargeConfigurationCollection;
    dates = fillInGaps(days);
    dates = padLastWeek(dates);
    dates = formatDates(dates);
    dates = includeDayTypeCharges(charges, config.calendarConfiguration.availableDays);
    return dates;
}

function fillInGaps(config) {

    var tempDaysArray = [];
    var tempDaysObject = {};
    var totalDiff, totalDaysInMonth, a, b, i, j;

    tempDaysArray = Object.keys(config).map(function(date){ return date; });

    for (i = 0; i < tempDaysArray.length; i++) {

        if (i < tempDaysArray.length - 1) {

            // create an object key for shortdate
            tempDaysObject[tempDaysArray[i]] = config[tempDaysArray[i]];

            // get the next date and the next date after that
            a = getNextDate(tempDaysArray[i]);
            b = getNextDate(tempDaysArray[i + 1]);

            // if the next shortdate is not the expected shortdate there is a gap that needs to be filled!
            if (a.nextDay !== b.today) {

                // work out the difference between the two dates
                if (a.nextDay > b.today) {

                    totalDaysInMonth = getDaysInMonth(a.month, a.year);
                    totalDiff = (totalDaysInMonth - Number(a.nextDay)) + Number(b.today);

                }
                else {
                    totalDiff = b.today - a.nextDay;
                }

                // loop through the gap in dates and create a N/A record for each unavailable date
                for (j = 0; j < totalDiff; j++) {

                    // use N/A as a flag to determine later whether to render as a valid selectable date
                    tempDaysObject[a.nextDayShortDate] = "N/A";
                    a = getNextDate(a.nextDayShortDate);

                }

            }

        }
        else {
            tempDaysObject[tempDaysArray[i]] = config[tempDaysArray[i]];
        }
    }

    return tempDaysObject;

}

function padLastWeek(tempDaysObject) {
    var keys = Object.keys(tempDaysObject);

    if(keys.length % daysToDisplay !== 0) {
        var diff = daysToDisplay - keys.length % daysToDisplay;
        var lastdate = keys[keys.length -1];
        var shortdate = lastdate.substr(0,4) + "-" + lastdate.substr(4,2) + "-" + lastdate.substr(6,2);
        var result = new Date(shortdate);
        result.setDate(result.getDate() + diff);
        var month = String(result.getMonth() + 1);
        if(month.length === 1) {
            month = "0" + month;
        }
        var day = String(result.getDate());
        if(day.length === 1) {
            day = "0" + day;
        }
        var correctLastDate = result.getFullYear() + month + day;
        tempDaysObject[correctLastDate] = "N/A";
        return fillInGaps(tempDaysObject);
    }
    else {
        return tempDaysObject;
    }
}

function getNextDate(date) {

    var shortdate = date.split("");
    var year = shortdate[0] + shortdate[1] + shortdate[2] + shortdate[3];
    var month = shortdate[4] + shortdate[5];
    var day = shortdate[6] + shortdate[7];
    var daysInCurrentMonth = getDaysInMonth(month, year);
    var nextDay, nextMonth, nextYear;

    if (day == daysInCurrentMonth) {

        nextDay = "01";

        if (month === "12") {

            nextMonth = "01";
            nextYear = Number(year) + 1;

        }
        else {

            nextMonth = String(Number(month) + 1);
            nextYear = String(Number(year));

            if (nextMonth.length === 1) {
                nextMonth = "0" + nextMonth;
            }

        }

    }
    else {

        nextDay = String(Number(day) + 1);

        if (nextDay.length === 1) {
            nextDay = "0" + nextDay;
        }

        nextMonth = month;
        nextYear = year;

    }

    return {
        today: day,
        nextDay: nextDay,
        year: year,
        nextYear: nextYear,
        month: month,
        nextMonth: nextMonth,
        totalDays: daysInCurrentMonth,
        todayShortDate: date,
        nextDayShortDate: nextYear + nextMonth + nextDay
    };

}

function getDaysInMonth(m, y) {
    return /8|3|5|10/.test(--m) ? 30 : m == 1 ? (!(y % 4) && y % 100) || !(y % 400) ? 29 : 28 : 31;
}

function formatDates(dates) {

    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return Object.keys(dates).map(date => {
        var datearr = date.split("");
        var year = datearr.slice(0,4).reduce((a,b) => a + b);
        var month = datearr.slice(4,6).slice(0,2).reduce((a,b) => a + b);
        var day = datearr[6] === "0" ? datearr[7] : datearr.slice(6,8).reduce((a,b) => a + b);
        var datestring = new Date(year + "/" + month + "/" + day);
        return {
            year: year,
            month: months[datestring.getMonth()],
            day: days[datestring.getDay()],
            dayOfWeek : datestring.getDay(),
            date: day,
            dateSuffix: suffix(day),
            desc: dates[date],
            shortdate: date
        };
    });

}

function suffix(i) {
    var j = i % 10, k = i % 100;
    if (j == 1 && k != 11) {
        return "st";
    }
    if (j == 2 && k != 12) {
        return "nd";
    }
    if (j == 3 && k != 13) {
        return "rd";
    }
    return "th";
}

function numOfWeeksInConfig() {
    return dates.length % daysToDisplay === 0 ? dates.length / daysToDisplay : Math.floor(dates.length / daysToDisplay) + 1;
}

function includeDayTypeCharges(charges, config) {
    return dates.map(date => {
        return Object.assign({}, date, { dayTypeCharge : date.desc === "N/A" ? 0 : charges[date.desc].charge });
    });
}

function createDateRanges(totalAmountOfWeeks) {

    var amountOfDays = dates.length;
    var datesArray = [];
    var endOfWeek;

    for (var i = 0; i < totalAmountOfWeeks; i++) {

        // if not the last week
        if (i < totalAmountOfWeeks - 1) {
            endOfWeek = 6;
        }

        // if the days in the last week is not exactly the weeksToDisplay value, use the remainder after dividing days by weeksToDisplay (minus 1 as index based)
        else {
            endOfWeek = amountOfDays % daysToDisplay === 0 ? 6 : amountOfDays % daysToDisplay - 1;
        }

        // construct date range
        // if only day in the date range i.e. aug 5 - aug 5, only show one date
        if (dates[i * daysToDisplay].month + " " + dates[i * daysToDisplay].date === dates[(i * daysToDisplay) + endOfWeek].month + " " + dates[(i * daysToDisplay) + endOfWeek].date) {
            var month = dates[i * daysToDisplay].month;
            var date = dates[i * daysToDisplay].date;
            datesArray.push(month + date);
        }
        else {
            var fromMonth = dates[i * daysToDisplay].month;
            var fromDate = dates[i * daysToDisplay].date;
            var toMonth = dates[(i * daysToDisplay) + endOfWeek].month;
            var toDate = dates[(i * daysToDisplay) + endOfWeek].date;
            datesArray.push(fromMonth + fromDate + " - " + toMonth + toDate);
        }
    }

    return datesArray;

}

function createArrayOfConfigs(config, size) {
    return [].concat.apply([],
        config.map(function(_,i) {
            return i % size ? [] : [config.slice(i, i+size)];
        })
    );
}

function createTableHeadData() {
    var daysConfig = dates.map(date => {
        return {
            desc : date.desc,
            day : date.day,
            date : date.date
        };
    });
    return createArrayOfConfigs(daysConfig, daysToDisplay);
}

function createTableBodyData(dateCharges) {
    var sameDayDesc = ["SameDay", "Anytime", "Morning", "Lunch", "Afternoon", "Evening"],
        normalDesc = ["Anytime", "Morning", "Lunch", "Afternoon", "Evening"];

    var timeslots = dates.map(function (slot) {
        var timeslotDescriptions = slot.desc === "SameDay" ? sameDayDesc : normalDesc;
        return createColumn(timeslotDescriptions, slot, dateCharges);
    });

    timeslots = createArrayOfConfigs(timeslots, daysToDisplay);
    timeslots = padOutSameDayWeek(timeslots);
    return timeslots;
}

function createColumn(rows, details, dateCharges) {
    var chargeConfig = dateCharges[details.shortdate];
    return rows.map(function (row) {
        var config = {
            description: row,
            hasTimeslot: !!chargeConfig,
            shortdate: details.shortdate
        };
        if (config.hasTimeslot) {
            var charge = chargeConfig.filter(function(charges){
                return charges.WebDescription === row;
            });
            if(!charge.length) {
                config.hasTimeslot = false;
            }
            else {
                config.charge = details.dayTypeCharge + charge[0].ChargeIncVat;
            }
        }
        return config;
    });
}

function padOutSameDayWeek(timeslots) {
    return timeslots.map(function (slots, i) {
        if (slots[0][0].description === "SameDay") {
            var shortdate = slots[0][0].shortdate;
            return slots.map(function (slot) {
                if (slot[0].shortdate !== shortdate) {
                    slot.unshift({
                        description: "SameDay",
                        hasTimelot: false,
                        shortdate: slot[i].shortdate
                    });
                }
                return slot;
            });
        }
        return slots;
    });
}



