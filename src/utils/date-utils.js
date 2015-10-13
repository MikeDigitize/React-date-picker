/*
    Take the initial config object of shortdates and date description
    e.g. { 20151025 : "Sunday" }
    fill in any gaps (some dates maybe missing) and return the object
 */

export function fillInGaps(config) {

    var tempDaysArray = [];
    var tempDaysObject = {};
    var totalDiff, totalDaysInMonth, a, b, i, j;

    tempDaysArray = Object.keys(config).map(date => date);

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

/*
    Pass in a shortdate, return an object of stats based on that date
 */
export function getNextDate(date) {

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

export function getDaysInMonth(m, y) {
    return /8|3|5|10/.test(--m) ? 30 : m == 1 ? (!(y % 4) && y % 100) || !(y % 400) ? 29 : 28 : 31;
}

/*
    Create an array of formatted date objects with details of each delivery date
 */
export function formatDates(dates) {

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return Object.keys(dates).map(date => {
        let datearr = date.split("");
        let year = datearr.slice(0,4).reduce((a,b) => a + b);
        let month = datearr.slice(4,6).slice(0,2).reduce((a,b) => a + b);
        let day = datearr[6] === "0" ? datearr[7] : datearr.slice(6,8).reduce((a,b) => a + b);
        let datestring = new Date(year + "/" + month + "/" + day);
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

/*
    Get the correct date suffix
 */

export function suffix(i) {

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

/*
    Bolt on the day charge for each object in the dates array
 */

export function includeDayTypeCharges(dates, charges) {
    return dates.map(date => {
        return Object.assign({}, date, { dayTypeCharge : date.desc === "N/A" ? 0 : charges[date.desc].charge });
    });
}