// ReSharper disable InconsistentNaming

var AOCalendar = (function (settings) {

    "use strict";

    var NORTHERN_IRELAND_MESSAGE = "We're unable to display an exact delivery date as we use a delivery partner for Northern Ireland, due to this we charge &pound;15 for delivery. Continue with your order and we'll ring you within 48 hours to arrange a date to suit you.";
    var NO_AVAILABLE_DATES_MESSAGE = DRLJs.Localization.Checkout.AoDeliveryDateTimePicker.NoAvailableDatesMessage;

    /*
	 *	Timeslot template - a row is created for each of these in the delivery table
	 */

    var timeslots = {
        "TimeSlots": [
            {
                "Description": "07:00 - 19:00",
                "WebDescription": "Anytime"
            },
            {
                "Description": "07:00 - 12:00",
                "WebDescription": "Morning"
            },
            {
                "Description": "10:00 - 14:00",
                "WebDescription": "Lunch"
            },
            {
                "Description": "12:00 - 17:00",
                "WebDescription": "Afternoon"
            },
            {
                "Description": "18:00 - 22:00",
                "WebDescription": "Evening"
            }]
    };


    /*
	 *	Will hold the delivery dates and timeslots configs that the calendar uses.
	 *	The calendar can handle as many consecutive / non-consecutive delivery dates as needed 
	 *  but the amount of timeslots MUST match the amount of delivery dates
	 */

    // the delivery dates and timeslots returned from the AJAX calls - these will be formatted and assigned to new variables
    var deliveryDates;
    var deliveryTimeslots;

    /*
	 *	DOM elements
	 */

    var container = document.querySelector("#aoCalendarHolder");
    var showHideBtn = document.querySelector(".aoCalendarShowTimeslotsBtn");
    var deliveryCharge = document.querySelector("#aoDeliveryCharge");
    var deliverySummary = document.querySelector("#aoCalendarDeliverySummary");
    var deliveryTotal = document.querySelector("#aoDeliveryTotal");
    var tableTemplate = document.querySelector(".aoCalendarTable");
    var dateRangeLeft = document.querySelector("#aoCalendarLeft");
    var dateRangeRight = document.querySelector("#aoCalendarRight");
    var calendarDisabledCover = document.querySelector(".aoCalendarDisabledCover");
    var calendarDisabledMessage = document.querySelector(".aoCalendarDisabledCoverMessage");
    
    /*
	 *	Arrays of days and months for formatting calendar config delivery dates
	 */

    var days = DRLJs.Localization.Common.Dates.ShortDayNames;
    var months = _(DRLJs.Localization.Common.Dates.ShortMonthNames).map(DRLJs.string.toSentenceCase);

    var availableDates = [];                // an array of available dates
    var currentWeek = 0;				    // the current (index based) week being displayed 
    var dateRanges = [];				    // date ranges taken from the calendar config
    var showTimeSlotsState = false;		    // flag to show if timeslots are displayed or hidden
    var enabled = true;					    // if calendar is enabled
    var thIndex = 0;					    // an index to keep count of the table head cells when creating tables and to marry up dates array with cells
    var tdIndex = 0;					    // an index to keep count of the table data cells when creating tables and to marry up dates array with cells
    var orderTotalExcludingDelivery = 0;    // the order total we keep track of as it could update whilst in the checkout if quantities are increased etc.

    var showHideBtnEventsAdded = false;	    // if the calendar is re-initialised in a different format / different weeks displayed etc these flags prevent
    var weekSelectEventsAdded = false;      // event listeners being re-added for the controls and the exteranl events the calendar responds to
    var eventsListenersAdded = false;
    var onlyGotDefaultTimeslots = false;

    var calendarState;					    // holds the calendar "state" inc selected times, costs etc
    var availableDays;					    // object that holds consecutive dates in config	
    var totalAmountOfWeeks;				    // total amount of weeks in a config	
    var amountOfWeeksToShow;			    // amount of weeks to show. if not specified defaults to amount of weeks in config
    var tables;							    // an array of all calendar tables
    var timeSlotRows;					    // nodelist of table rows
    var tableDataCells;					    // nodelist of selectable table cells
    var selectedRow;					    // the row that contains the selected table cell (selected date / timeslot)
    var dateRange;						    // the p element that displays the current date range  

    // Subscribe to these events before the call to init().
    $.subscribe("SHOW_DELIVERY_DATES_SPINNER", function () {
        showLoadingSpinner();
    });

    $.subscribe("HIDE_DELIVERY_DATES_SPINNER", function () {
        removeLoadingSpinner(false /* shouldHideCover */);
    });

    /*
	 *	    Initialise the calendar. Takes a config object that can be passed any number of the following key / value pairs:
	 *  	
	 *		config - the delivery dates object returned from the AJAX call in SingleCheckoutCalendar.js REQUIRED!
	 *		weeksToDisplay - a number of weeks to display (default 3)
	 *  	restore - an object with a timeslotid and shortdate key / value which will marry up with a selected date / table cell
	 *		testmode - set to true to expose internal functions and properties
	 *  	format - a string of either "tabs" for tabbed view or "weekSelect" for the single week select view	
	 *
	 */

    function init(setup) {

        establishListeners();

        // override settings that were passed in when the AOCalendar function is invoked - see end of file
        for (var i in setup) {
            settings[i] = setup[i];
        }

        // set testmode to off if not explicitly set
        if (setup && !setup.testmode) {
            settings.testmode = false;
        }

        if (setup && setup.config) {

            setCalendarConfig(setup.config);

            // check for third party delivery flag (e.g. Northern Ireland) - hide the calendar and display the third party delivery message
            if (deliveryDates.calendarConfiguration.dataState === "ThirdParty") {

                // hide calendar and show third party message	
                displayMessage(NORTHERN_IRELAND_MESSAGE);
                return;

            }
            
            var retrieveDates = [];
            for (i in deliveryDates.calendarConfiguration.availableDays) {
                retrieveDates.push(i);
            }
            
            // if there are no dates available show user no dates message
            if (retrieveDates.length === 0) {

                displayMessage(NO_AVAILABLE_DATES_MESSAGE);
                return;

            }
            
            // explicitly set calendar to show and, as delivery dates have been set, show timeslot spinner
            $.publish("TOGGLE_CALENDAR", { show: true });
            $.publish("SHOW_TIMESLOT_SPINNER");

            // initialise calendar state
            resetCalendarState();
            calendarState.basketTotal = deliveryDates.orderTotals.BasketProductValueTotalNumber;
            calendarState.total = Number(calendarState.basketTotal);
            
            var datestring = retrieveDates.join();

            $.ajax({
                type: "GET",
                url: "/httphandlers/deliverydatestimeslotshandler.ashx",
                data: {
                    DeliveryDates: datestring
                },
                dataType: "json",
                success: function (data) {
                    $.publish("HIDE_TIMESLOT_SPINNER");
                    deliveryTimeslotsCallback(setup, data);

                    if (setup.forcepeeling) {
                        $.publish("SHOW_DELIVERY_DATES_PEEL");
                    }
                },
                error: function (xhr) {

                    $.publish("HIDE_TIMESLOT_SPINNER");
                    if (DRLJs.browser.isRequestCompleted(xhr)) {
                        window.location.href = '/Errors/Order.aspx';
                    }

                }
            });
            
        }
        else {
            // no config means no calendar - redirect to error page here?!!
        }

    }
    
    // listeners for external calendar events
    function establishListeners() {
        
        if (!eventsListenersAdded) {

            eventsListenersAdded = true;
            
            $.subscribe("ORDER_TOTAL_EXCL_DELIVERY_CHANGED", function (_, orderTotal) {
                orderTotalExcludingDelivery = Number(orderTotal);
                updateSummary();
            });
            
            $.subscribe("SHOW_DELIVERY_DATES_PEEL", function () {
                disable();
            });
            
            $.subscribe("SHOW_TIMESLOT_PEEL", function () {                
                disable();
            });
            
            $.subscribe("HIDE_DELIVERY_DATES_PEEL", function () {               
                enabled = true;
            });
            
            $.subscribe("HIDE_TIMESLOT_PEEL", function () {                
                enabled = true;
            });
            
            $.subscribe("SHOW_TIMESLOT_SPINNER", function () {
                showLoadingSpinner();
            });

            $.subscribe("HIDE_TIMESLOT_SPINNER", function () {
                removeLoadingSpinner(true /* shouldHideCover */);
            });

            $.subscribe("SHOW_NO_SELECTED_DELIVERY_DATE_ERROR", function () {
                $('#dateError').show();
            });

            $.subscribe("HIDE_NO_SELECTED_DELIVERY_DATE_ERROR", function () {
                $('#dateError').hide();
            }); 
            
        }

    }

    function deliveryTimeslotsCallback(setup, data) {
        
        // set timeslot data from ajax return
        setTimeslotsConfig(data);

        // check if more than the anytime delivery timeslot in all the data returned from server
        onlyGotDefaultTimeslots = _(deliveryTimeslots).all(function (x) {
            return x.length === 1;
        });
        
        // fill in gaps for dates and format data 
        availableDays = fillInGapsInDates(deliveryDates.calendarConfiguration.availableDays);
        availableDates = formatDates(availableDays);

        // find the total amount of weeks in delivery dates
        var amountOfDays = availableDates.length;
        totalAmountOfWeeks = amountOfDays % 7 === 0 ? amountOfDays / 7 : Math.floor(amountOfDays / 7) + 1;

        // create the date ranges i.e. Sept 12 - Sept 18 for the display
        dateRanges = createDateRanges(availableDates);       

        // fill in gaps in timeslots if certain ones e.g. evening are unavailable so when we loop over them we have an equal amount of timeslots for each day
        var timeslotDescriptions = [];
        var counter = 0;

        // this could be isolated into its own function for testing
        for (var i in deliveryTimeslots) {

            if (counter === 0 && availableDates[0].desc === "SameDay") {
                timeslotDescriptions = ["Same", "Anytime", "Morning", "Lunch", "Afternoon", "Evening"];
            } else {
                timeslotDescriptions = ["Anytime", "Morning", "Lunch", "Afternoon", "Evening"];
            }

            for (var j = 0, len = timeslotDescriptions.length; j < len; j++) {

                if (!deliveryTimeslots[i][j]) {
                    deliveryTimeslots[i].splice(j, 0, { WebDescription: null });
                }
                else if (deliveryTimeslots[i][j].WebDescription !== timeslotDescriptions[j]) {
                    deliveryTimeslots[i].splice(j, 0, { WebDescription: null });
                }

            }

            counter++;

        }

        // create the tables of dates and configure the calendar ready for use
        createTables();
        configureCalendar();

        // check if checkout has been abandoned and if restore details have been supplied 
        if (setup.restore) {

            // get the cell to select and table the date chosen is in
            var cell = document.querySelector('tr td[data-timeslot-id="' + setup.restore.timeslotid + '"][data-shortdate="' + setup.restore.shortdate + '"]');

            if (!cell) {
                $.publish("SELECTED_DELIVERY_DATE_NO_LONGER_AVAILABLE");
                updateSummary();
                return;
            }

            // if they selected a date e.g. four weeks from now but now we are only showing e.g. three weeks, ensure that we change the amount of weeks to show so
            // it remains visible
            currentWeek = Number(cell.parentNode.parentNode.parentNode.getAttribute("data-delivery-week-index"));

            if (currentWeek === amountOfWeeksToShow) {
                amountOfWeeksToShow++;
            }

            if (currentWeek > amountOfWeeksToShow) {
                amountOfWeeksToShow = currentWeek + 1;
            }

            dateRangeLeft.className = dateRangeLeft.className.replace(/(\s?)aoCalendarDateRangeCtrlDisabled/, "");
            dateRangeRight.className = dateRangeRight.className.replace(/(\s?)aoCalendarDateRangeCtrlDisabled/, "");

            if(currentWeek === 0) {
                dateRangeLeft.className += " aoCalendarDateRangeCtrlDisabled";
            }

            if (currentWeek === amountOfWeeksToShow - 1) {   
                dateRangeRight.className += " aoCalendarDateRangeCtrlDisabled";
            }

            showDateRange();
            showTable(0);

            if (cell.parentNode.getAttribute("data-time-slot-index")) {
                showHideTimeSlots();
            }

            selectSlot.call(cell, { target: cell.children[0] });

            

        }
        else {
            // update the on page summary of charges
            updateSummary();
        }

    }

    // basic calendar config after delievry dates and timeslots have been parsed
    function configureCalendar() {

        var datesCount = 0;
        var timeslotCount = 0;

        for (var i in deliveryDates) {
            datesCount++;
        }

        for (i in deliveryTimeslots) {
            timeslotCount++;
        }

        // cannot progress past here without dates and timeslots
        if (!deliveryDates || !deliveryTimeslots || datesCount === 0 && timeslotCount === 0) {
            // handle errors here - redirect?
            return;
        }

        // show calendar, remove any message / error on page and reset current week
        currentWeek = 0;

        if(!settings.restore){
            dateRangeLeft.className += " aoCalendarDateRangeCtrlDisabled";
        }

        
       
        var msg = document.querySelector(".aoCalendarGenericMessage");
        if (msg) {
            msg.parentNode.removeChild(msg);
            container.style.display = "block";
        }

        var errorMsg = document.querySelector(".aoCalendarError");
        if(errorMsg) {
            errorMsg.style.display = "none";
        }

        hideCover();

        // hide timeslots if opened
        if (showTimeSlotsState) {
            showHideTimeSlots();
        }

        // remove any previously selected timeslot
        var selected = document.querySelector(".aoCalendarTableSelected");
        if (selected) {
            removeClass(selected, "aoCalendarTableSelected");
        }

        // reset table view
        for (var j = 0, len = tables.length; j < len; j++) {
            if (tables[j].className.indexOf("aoCalendarTableHide") === -1) {
                addClass(tables[j], "aoCalendarTableHide");
            }
        }

        if (tables[0].className.indexOf("aoCalendarTableHide") !== -1) {
            removeClass(tables[0], "aoCalendarTableHide");
        }        

        // set the amount of weeks to display to user
        amountOfWeeksToShow = settings.weeksToDisplay <= totalAmountOfWeeks ? settings.weeksToDisplay : totalAmountOfWeeks;

        // set show / hide time slot click handler
        if (!showHideBtnEventsAdded) {

            addEvents(showHideBtn, "click", showHideTimeSlots);
            showHideBtnEventsAdded = true;

        }

        // set the format of date select here - tabs or skip through ranges
        if (settings.format === "weekSelect") {
            setUpWeekSelectView();
        }
        else {
            // set up tab view - TODO
        }

    }
    

    function resetCalendar() {
        
        // show calendar, remove third party message if it's on the page and reset current week
        currentWeek = 0;
        
        var msg = document.querySelector(".aoCalendarGenericMessage");
        if (msg) {
            msg.parentNode.removeChild(msg);
            container.style.display = "block";
        }

        // hide timeslots if opened
        if (showTimeSlotsState) {
            showHideTimeSlots();
        }

        // the calendar has previously been initialised
        if (tables && tables.length) {

            for (var i = 0, len = tables.length; i < len; i++) {
                tables[i].parentNode.removeChild(tables[i]);
            }
            
            var defaultview = tableTemplate.cloneNode(true);
            var element = document.addEventListener ? dateRange.parentNode.nextElementSibling : dateRange.parentNode.nextSibling;

            container.insertBefore(defaultview, element);
            dateRange.innerHTML = "";
            deliverySummary.innerHTML = DRLJs.Localization.Checkout.AoDeliveryDateTimePicker.DeliverySummaryWithoutTimeslotSelected;
            deliveryCharge.innerHTML = "";
            deliveryTotal.innerHTML = "";
            dateRanges = [];
            tables = [];
            amountOfWeeksToShow = 0;
            
        }

        resetCalendarState();

    }
    
    function resetCalendarState() {
     
        // reset calendar state
        calendarState = {
            basketTotal: null,
            deliveryDay: null,
            deliveryDate: null,
            deliveryShortdate: null,
            deliveryCharge: null,
            timeSlot: null,
            timeslotid: null,
            total: null
        };

    }


    function addEvents(el, evt, fn) {

        var bind = function () {
            return fn.apply(el, arguments);
        };

        !el.addEventListener ? el.attachEvent("on" + evt, bind) : el.addEventListener(evt, bind, false);

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


    function getDaysInMonth(m, y) {
        return /8|3|5|10/.test(--m) ? 30 : m == 1 ? (!(y % 4) && y % 100) || !(y % 400) ? 29 : 28 : 31;
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


    function fillInGapsInDates(daysToBeFilledIn) {

        var tempDaysArray = [];
        var tempDaysObject = {};

        // create an array of shortdates so we can compare one date with the next
        for (var i in daysToBeFilledIn) {
            tempDaysArray.push(i);
        }

        for (i = 0; i < tempDaysArray.length; i++) {

            if (i !== tempDaysArray.length - 1) {

                // create an object key for shortdate
                tempDaysObject[tempDaysArray[i]] = daysToBeFilledIn[tempDaysArray[i]];

                var a = getNextDate(tempDaysArray[i]);
                var b = getNextDate(tempDaysArray[i + 1]);

                // if the next shortdate is not the expected shortdate there is a gap that needs to be filled!				
                if (a.nextDay !== b.today) {

                    var totalDiff;

                    if (a.nextDay > b.today) {

                        var totalDaysInMonth = getDaysInMonth(a.month, a.year);
                        totalDiff = (totalDaysInMonth - Number(a.nextDay)) + Number(b.today);

                    }
                    else {
                        totalDiff = b.today - a.nextDay;
                    }

                    var c = getNextDate(tempDaysArray[i]);

                    for (var j = 0; j < totalDiff; j++) {

                        // use N/A as a flag to determine later whether to render as a valid selectable date
                        tempDaysObject[c.nextDayShortDate] = "N/A";
                        c = getNextDate(c.nextDayShortDate);

                    }

                }

            }
            else {
                tempDaysObject[tempDaysArray[i]] = daysToBeFilledIn[tempDaysArray[i]];
            }
        }

        return tempDaysObject;

    }


    function formatDates(dates) {

        var datesArray = [];

        for (var i in dates) {

            var temp = i.split("");
            var year = temp[0] + temp[1] + temp[2] + temp[3];
            var month = temp[4] + temp[5];
            var day = Number(temp[6]) === 0 ? temp[7] : temp[6] + temp[7];
            var dateString = year + "/" + month + "/" + day;
            var correctDate = new Date(dateString);

            var dateObj = {
                year: year,
                month: months[correctDate.getMonth()],
                day: days[correctDate.getDay()],
                dayOfWeek : correctDate.getDay(),
                date: day,
                dateSuffix: suffix(day),
                desc: dates[i],
                shortdate: i
            };

            datesArray.push(dateObj);

        }

        return datesArray;

    }


    function createDateRanges(dates) {

        var amountOfDays = dates.length;
        var datesArray = [];
        var endOfWeek;

        for (var i = 0; i < totalAmountOfWeeks; i++) {

            // if not the last week
            if (i < totalAmountOfWeeks - 1) {
                endOfWeek = 6;
            }

                // if the days in the last week is not exactly 7, use the remainder after dividing days by 7 (minus 1 as index based)
            else {
                endOfWeek = amountOfDays % 7 === 0 ? 6 : amountOfDays % 7 - 1;
            }

            // construct date range
            // if only day in the date range i.e. aug 5 - aug 5, only show one date
            if (dates[i * 7].month + " " + dates[i * 7].date === dates[(i * 7) + endOfWeek].month + " " + dates[(i * 7) + endOfWeek].date) {
                var month = dates[i * 7].month;
                var date = dates[i * 7].date;
                datesArray.push(DRLJs.string.format(
                    DRLJs.Localization.Checkout.AoDeliveryDateTimePicker.DateRangeSingleFormat,
                    month,
                    date));
            }
            else {
                var fromMonth = dates[i * 7].month;
                var fromDate = dates[i * 7].date;
                var toMonth = dates[(i * 7) + endOfWeek].month;
                var toDate = dates[(i * 7) + endOfWeek].date;
                datesArray.push(DRLJs.string.format(
                    DRLJs.Localization.Checkout.AoDeliveryDateTimePicker.DateRangeFormat,
                    fromMonth,
                    fromDate,
                    toMonth,
                    toDate));
            }
        }

        return datesArray;

    }


    function createTables() {

        // remove any tables - new ones will be created from the template
        var calendarTables = document.querySelectorAll(".aoCalendarTable");
        
        for (var i = 0; i < calendarTables.length; i++) {
            calendarTables[i].parentNode.removeChild(calendarTables[i]);
        }

        var newTablesHolder = [];
        thIndex = 0, tdIndex = 0; // reset td and th counters

        // create a table for the amount of weeks specified
        for (i = 0; i < totalAmountOfWeeks; i++) {

            // create a copy of the table template						
            var table = createNewTable();
            table.copy.setAttribute("data-delivery-week-index", i);
            table.copy.className += " aoCalendarTableHide";

            createTableHead(table.copy, table.thead, i);

            // create and insert same day delivery row before the first row if time is before 12 - this only happens for the first table
            if (availableDates[0].desc === "SameDay") {
                createSameDayDeliveryRow(table.tableRow, i);
            }

            createAllDayDeliveryRow(table.tableRow, i);
            createTimeSlotRows(table.copy, table.tableRow, i);

            // store newly created table in array and append all at end
            newTablesHolder.push(table.copy);

        }

        // append new tables into document
        var next = showHideBtn, len = newTablesHolder.length;

        for (i = 0; i < len; i++) {

            container.insertBefore(newTablesHolder[i], next);
            next = newTablesHolder[i].nextSibling;

        }

        tables = document.querySelectorAll(".aoCalendarTable");
        removeClass(tables[0], "aoCalendarTableHide");

        // store references to the time slot rows
        timeSlotRows = document.querySelectorAll(".aoCalendarTimeSlotRow");

        // get all the selectable table cells
        tableDataCells = document.querySelectorAll(".aoCalendarTableSelectable");

        for (i = 0; i < tableDataCells.length; i++) {
            addEvents(tableDataCells[i], "click", selectSlot);
        }

        updateShowHideBtnText();
        
        showHideBtn.style.visibility = (onlyGotDefaultTimeslots) ? "hidden" : "visible";
    }


    function createNewTable() {

        var tableCopy = tableTemplate.cloneNode(true);
        var thead = tableCopy.children[0];
        var tableRow = tableCopy.children[1].children[0];

        return {
            copy: tableCopy,
            thead: thead,
            tableRow: tableRow
        };

    }


    function createTableHead(tableCopy, thead, i) {

        var dates = availableDates;

        // create an array of cells to delete if the amount of days is not divisible by 7
        var deleteCells = [];

        // loop through table head row children
        for (var j = 1; j < thead.children[0].children.length; j++) {

            var th = thead.children[0].children[j];

            // whilst the date index is less than amount of days, print out the date
            if (thIndex < dates.length) {

                // each table head cell has three p tags - th.children[0], th.children[1], th.children[2] 
                // one for a description e.g. same day, one for the date and one for the day
                if (i === 0 && j === 1 && availableDates[0].desc === "SameDay") {
                    th.children[0].innerHTML = deliveryDates.calendarConfiguration.chargeConfigurationCollection.SameDay.text;
                }
                else {
                    th.children[0].innerHTML = "";
                }

                th.children[1].innerHTML = dates[thIndex].day;
                th.children[2].innerHTML = dates[thIndex].date;

                // store the costs for the day type in the table head. when creating timeslot rows use these charges to calculate the total for the timeslot
                if (dates[thIndex].desc === "SameDay") {

                    th.setAttribute("data-day-type", "SameDay");
                    th.setAttribute("data-day-type-charge", deliveryDates.calendarConfiguration.chargeConfigurationCollection.SameDay.charge);
                    th.setAttribute("data-day-type-charge-exvat", deliveryDates.calendarConfiguration.chargeConfigurationCollection.SameDay.chargeExVat);
                }
                else if (dates[thIndex].desc === "NextDay") {

                    th.children[0].innerHTML = deliveryDates.calendarConfiguration.chargeConfigurationCollection.NextDay.text;
                    th.setAttribute("data-day-type", "NextDay");
                    th.setAttribute("data-day-type-charge", deliveryDates.calendarConfiguration.chargeConfigurationCollection.NextDay.charge);
                    th.setAttribute("data-day-type-charge-exvat", deliveryDates.calendarConfiguration.chargeConfigurationCollection.NextDay.chargeExVat);
                }
                else if (dates[thIndex].desc === "GreenDay") {

                    th.setAttribute("data-day-type", "GreenDay");
                    th.setAttribute("data-day-type-charge", deliveryDates.calendarConfiguration.chargeConfigurationCollection.GreenDay.charge);
                    th.setAttribute("data-day-type-charge-exvat", deliveryDates.calendarConfiguration.chargeConfigurationCollection.GreenDay.chargeExVat);
                    th.children[0].innerHTML = deliveryDates.calendarConfiguration.chargeConfigurationCollection.GreenDay.text;
                    th.children[0].className += " aoCalendarEco";
                    th.children[1].className += " aoCalendarEco";
                    th.children[2].className += " aoCalendarEco";

                } else {
                    var daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                    var chargeToUse = daysOfWeek[dates[thIndex].dayOfWeek];
                    var shouldUseStandardCharge =
                        typeof deliveryDates.calendarConfiguration.chargeConfigurationCollection[chargeToUse] === "undefined" ||
                        deliveryDates.calendarConfiguration.chargeConfigurationCollection[chargeToUse].charge === deliveryDates.calendarConfiguration.chargeConfigurationCollection.Standard.charge;

                    if (shouldUseStandardCharge) {
                        th.setAttribute("data-day-type", "Standard");
                        th.setAttribute("data-day-type-charge", deliveryDates.calendarConfiguration.chargeConfigurationCollection.Standard.charge);
                        th.setAttribute("data-day-type-charge-exvat", deliveryDates.calendarConfiguration.chargeConfigurationCollection.Standard.chargeExVat);
                    } else {
                        th.setAttribute("data-day-type", chargeToUse);
                        th.setAttribute("data-day-type-charge", deliveryDates.calendarConfiguration.chargeConfigurationCollection[chargeToUse].charge);
                        th.setAttribute("data-day-type-charge-exvat", deliveryDates.calendarConfiguration.chargeConfigurationCollection[chargeToUse].chargeExVat);
                    }
                }

                th.setAttribute("data-selected-month", dates[thIndex].month);
                th.setAttribute("data-shortdate", dates[thIndex].shortdate);
                th.setAttribute("data-cell-index", j);

                // add a data attribute showing if the date is available (if it isn't it will have a value of N/A in the JSON object)
                // we can use this later when creating the timeslots to determine if there should be a timeslot on that day
                var available = dates[thIndex].desc === "N/A" ? false : true;
                th.setAttribute("data-time-slot-available", available);
                thIndex++;

            }

                // if there are more table cells than dates, add the cell to an array to delete	later
            else {
                deleteCells.push(th);
            }

        }

        // delete any unused table header cells
        for (j = 0; j < deleteCells.length; j++) {
            deleteCells[j].parentNode.removeChild(deleteCells[j]);
        }

        return thead;

    }


    function createSameDayDeliveryRow(tableRow, i) {

        // first row - same day delivery but only if same day is available in the delivery dates config
        if (i === 0 && availableDates[0].desc === "SameDay") {

            var deleteCells = [];
            var dates = availableDates;
            var row = tableTemplate.querySelector("tbody tr");
            var sameDayRow = row.cloneNode(true);
            var sameDayInfo = sameDayRow.children[0].children;

            addClass(sameDayRow.children[0], "aoCalendarSameDay");

            sameDayRow.setAttribute("data-time-slot", "Same Day");
            sameDayInfo[0].innerHTML = "Same day time slot";
            sameDayInfo[1].innerHTML = "4:30PM - 10PM";
            sameDayInfo[2].innerHTML = "";
            sameDayInfo[3].parentNode.removeChild(sameDayInfo[3]);

            for (var j = 1; j < sameDayRow.children.length; j++) {

                if (j === 1) {

                    var charge = deliveryDates.calendarConfiguration.chargeConfigurationCollection.SameDay.charge;
                    sameDayRow.children[j].children[0].innerHTML = DRLJs.Localization.PriceMapper.FormatCurrencyWithSymbol(charge, true);
                    sameDayRow.children[j].children[0].setAttribute("data-cell-index", j);
                    sameDayRow.children[j].children[0].setAttribute("data-shortdate", dates[i].shortdate);
                    sameDayRow.children[j].setAttribute("data-cell-index", j);
                    sameDayRow.children[j].setAttribute("data-date-charge", charge);
                    sameDayRow.children[j].setAttribute("data-time-charge", 0);
                    sameDayRow.children[j].setAttribute("data-total-charge", charge);
                    sameDayRow.children[j].setAttribute("data-shortdate", dates[i].shortdate);
                    sameDayRow.children[j].setAttribute("data-timeslot-id", deliveryTimeslots[dates[i].shortdate][0].TimeSlotId);

                }
                else {
                    deleteCells.push(sameDayRow.children[j]);
                }

            }

            // remove p tags but not cells themselves
            for (j = 0; j < deleteCells.length; j++) {
                deleteCells[j].removeChild(deleteCells[j].children[0]);
                deleteCells[j].removeAttribute("class");
            }

            tableRow.parentNode.insertBefore(sameDayRow, tableRow);
            return sameDayRow;

        }

    }


    function createAllDayDeliveryRow(tableRow, i) {

        var dates = availableDates;

        // create a row for all day time slot
        for (var j = 1; j < tableRow.children.length; j++) {

            var td = tableRow.children[j];
            tableRow.setAttribute("data-time-slot", timeslots.TimeSlots[0].WebDescription);
            addClass(tableRow.children[0], "aoCalendar" + timeslots.TimeSlots[0].WebDescription);
            var cell = td.children[0];

            if (tdIndex <= dates.length - 1) {

                // delete first cell
                if (i === 0 && j === 1 && availableDates[0].desc === "SameDay") {

                    removeClass(cell.parentNode, "aoCalendarTableSelectable");
                    cell.parentNode.removeChild(cell);

                }
                else {

                    var sd = dates[tdIndex].shortdate;  

                    // if there is no delivery on that date or no same day delivery timeslot, leave empty
                    if (dates[tdIndex].desc === "N/A" || deliveryTimeslots[sd][0].WebDescription === null) {
                        removeClass(td, "aoCalendarTableSelectable");
                        cell.innerHTML = "";
                    }
                    else {

                        // get the charge for that day and add it to the charge for the same day timeslot
                        var theadRow = td.parentNode.parentNode.parentNode.children[0].children[0];
                        var th = theadRow.querySelector("th[data-cell-index='" + j + "']");
                        var dayCharge = Number(th.getAttribute("data-day-type-charge"));
                        var dayChargeExVat = Number(th.getAttribute("data-day-type-charge-exvat"));
                        var slotCharge = deliveryTimeslots[sd][0].ChargeIncVat;
                        var slotChargeExVat = deliveryTimeslots[sd][0].ChargeExVat;
                        var totalCharge = Number((dayCharge + slotCharge).toFixed(2));
                        var displayCharge = DRLJs.Localization.PriceMapper.FormatCurrencyWithSymbol(totalCharge, true);
                        var timeslotid = deliveryTimeslots[sd][0].TimeSlotId;       
                        cell.innerHTML = displayCharge;
                        td.setAttribute("data-cell-index", j);
                        td.setAttribute("data-date-charge", dayCharge);
                        td.setAttribute("data-date-charge-exvat", dayChargeExVat);
                        td.setAttribute("data-time-charge", slotCharge);
                        td.setAttribute("data-time-charge-exvat", slotChargeExVat);
                        td.setAttribute("data-total-charge", totalCharge); 
                        td.setAttribute("data-shortdate", sd);
                        td.setAttribute("data-timeslot-id", timeslotid);
                        cell.setAttribute("data-shortdate", sd);                        

                    }

                }

                tdIndex++;

            }
            else {
                cell.parentNode.removeChild(cell);
            }

        }

        return tableRow;

    }


    function createTimeSlotRows(tableCopy, tableRow, i) {

        var dates = availableDates;

        // loop through all time slots in JSON object
        for (var j = 1; j < timeslots.TimeSlots.length; j++) {

            var row = tableRow.cloneNode(true), k;

            // add class name and hide each row
            addClass(row, "aoCalendarTimeSlotRow aoCalendarTableHide");

            // remove any unused cells from incomplete weeks
            // usually we will only show 3 weeks and as the calendar config will contain more than 3 weeks worth of dates, this wont be necessary
            // but this will act as a fail safe incase this ever isnt the case and we get passed in, for e.g. 43 days i.e. 6 weeks 1 day
            if (dates.length % 7 !== 0 && totalAmountOfWeeks === i + 1) {

                for (k = 0; k < 7 - dates.length % 7; k++) {
                    row.removeChild(row.children[row.children.length - 1]);
                }

            }

            addClass(row.children[0], "aoCalendar" + timeslots.TimeSlots[j].WebDescription);
            removeClass(row.children[0], "aoCalendar" + timeslots.TimeSlots[0].WebDescription);

            // add description / times of timeslot in first column
            row.children[0].children[0].innerHTML = timeslots.TimeSlots[j].WebDescription;
            row.children[0].children[1].innerHTML = timeslots.TimeSlots[j].Description;
            row.children[0].children[2].innerHTML = timeslots.TimeSlots[j].WebDescription;

            // remove the fourth line of text from the first cell in the row
            row.children[0].removeChild(row.children[0].children[3]);

            row.setAttribute("data-time-slot", timeslots.TimeSlots[j].WebDescription);
            row.setAttribute("data-time-slot-index", j);

            // add prices for each of the timeslots in each of the table cells along the row
            for (k = 1; k < row.children.length; k++) {

                var shortdate = tableCopy.children[0].children[0].children[k].getAttribute("data-shortdate");

                // if in first column of first table
                if (i === 0 && k === 1 && availableDates[0].desc === "SameDay") {
                    removeClass(row.children[k], "aoCalendarTableSelectable");
                }
                else {
                    
                    var p = row.children[k].children[0];
                    var th = tableCopy.children[0].children[0].children[k];

                    if (th.getAttribute("data-time-slot-available") !== "false") {

                        // if there is not a timeslot for a particular day, produce a blank cell
                        // this would be set to null when initialising
                        if (!deliveryTimeslots[shortdate][j].WebDescription) {

                            removeClass(p.parentNode, "aoCalendarTableSelectable");
                            p.parentNode.removeAttribute("data-cell-index");
                            p.parentNode.removeAttribute("data-shortdate");
                            p.parentNode.removeAttribute("data-date-charge");
                            p.parentNode.removeAttribute("data-date-charge-exvat");
                            p.parentNode.removeAttribute("data-time-charge");
                            p.parentNode.removeAttribute("data-time-charge-exvat");
                            p.parentNode.removeAttribute("data-total-charge");
                            p.parentNode.removeAttribute("data-timeslot-id");
                            p.parentNode.removeChild(p);

                        }
                        else {

                            var dayCharge = Number(th.getAttribute("data-day-type-charge"));
                            var dayChargeExVat = Number(th.getAttribute("data-day-type-charge-exvat"));
                            var slotCharge = deliveryTimeslots[shortdate][j].ChargeIncVat;
                            var slotChargeExVat = deliveryTimeslots[shortdate][j].ChargeExVat;
                            var totalCharge = Number((dayCharge + slotCharge).toFixed(2));
                            var displayCharge = DRLJs.Localization.PriceMapper.FormatCurrencyWithSymbol(totalCharge, true);
                            p.innerHTML = displayCharge;

                            // set data attributes on td and p tag within
                            row.children[k].setAttribute("data-date-charge", dayCharge);
                            row.children[k].setAttribute("data-date-charge-exvat", dayChargeExVat);
                            row.children[k].setAttribute("data-time-charge", slotCharge);
                            row.children[k].setAttribute("data-time-charge-exvat", slotChargeExVat);
                            row.children[k].setAttribute("data-total-charge", totalCharge);
                            row.children[k].setAttribute("data-timeslot-id", deliveryTimeslots[shortdate][j].TimeSlotId);
                            row.children[k].setAttribute("data-shortdate", shortdate);
                            row.children[k].setAttribute("data-cell-index", k);

                            p.setAttribute("data-cell-index", k);
                            p.setAttribute("data-shortdate", th.getAttribute("data-shortdate"));
                            addClass(p.parentNode, "aoCalendarTableSelectable");

                        }

                    }

                }

            }

            // append row to table body
            tableRow.parentNode.appendChild(row);
        }

        return tableCopy;

    }

    function setCalendarConfig(config) {
        deliveryDates = JSON.parse(JSON.stringify(config));
    }


    function setTimeslotsConfig(config) {
        deliveryTimeslots = JSON.parse(JSON.stringify(config));
    }

    function setAvailableDates(dates) {
        availableDates = dates;
    }

    function setTotalAmountOfWeeks(total) {
        totalAmountOfWeeks = total;
    }


    /*
	 *	Date range controls
	 */

    function setUpWeekSelectView() {
        
        dateRange = document.querySelector("#aoCalendarDateRangeSelect p");

        if (!weekSelectEventsAdded) {

            if (document.body.className.indexOf("touch") > -1) {

                addEvents(dateRangeLeft, "touchstart", showPrevDate);
                addEvents(dateRangeRight, "touchstart", showNextDate);

            }
            else {

                addEvents(dateRangeLeft, "click", showPrevDate);
                addEvents(dateRangeRight, "click", showNextDate);

            }

            // dont allow highlight selection 
            dateRangeLeft.onselectstart = function () { return false; };
            dateRangeRight.onselectstart = function () { return false; };

            weekSelectEventsAdded = true;

        }

        showDateRange();

    }


    function showDateRange() {
        dateRange.innerHTML = dateRanges[currentWeek];
    }


    function showHideTimeSlots() {

        if (enabled) {

            var i = 0, len = timeSlotRows.length;

            // if the timeslots are hidden, show them...
            if (!showTimeSlotsState) {

                for (i = 0; i < len; i++) {
                    removeClass(timeSlotRows[i], "aoCalendarTableHide");
                }

                showTimeSlotsState = true;

            }

            // if the timeslots are shown, hide them...
            else {

                for (i = 0; i < len; i++) {

                    if (selectedRow !== timeSlotRows[i]) {
                        addClass(timeSlotRows[i], "aoCalendarTableHide");
                    }

                }                
             
                showTimeSlotsState = false;

            }

            updateShowHideBtnText();

        }

        return false;

    }
    
    function updateShowHideBtnText() {
        showHideBtn.innerHTML = !showTimeSlotsState ? DRLJs.Localization.Checkout.AoDeliveryDateTimePicker.CalendarShowMoreTimeslotsLink : DRLJs.Localization.Checkout.AoDeliveryDateTimePicker.CalendarShowLessTimeslotsLink;
    }

    function updateSummary() {
        deliveryTotal.innerHTML = DRLJs.Localization.PriceMapper.FormatCurrency(orderTotalExcludingDelivery + Number(calendarState.deliveryCharge));

        if (calendarState.timeSlot === null) {

            deliverySummary.innerHTML = DRLJs.Localization.Checkout.AoDeliveryDateTimePicker.DeliverySummaryWithoutTimeslotSelected;
            deliveryCharge.innerHTML = DRLJs.Localization.Checkout.AoDeliveryDateTimePicker.UnselectedDeliveryText;

        }
        else {

            var date = calendarState.deliveryShortdate;
            var jsDate = DRLJs.utility.DateExtensions.YYYYMMDDToJsDate(date);
            var basketSummaryDate = DRLJs.utility.DateExtensions.getBasketSummaryDate(jsDate);

            var ts = !calendarState.deliveryCharge ? DRLJs.Localization.Checkout.AoDeliveryDateTimePicker.FreeDeliveryText : lookupLocalisedTimeSlotName(calendarState.timeSlot);
        
            deliverySummary.innerHTML = DRLJs.string.format(
                DRLJs.Localization.Checkout.AoDeliveryDateTimePicker.DeliverySummaryWithTimeslotSelected,
                ts,
                basketSummaryDate);
            
            var charge = DRLJs.Localization.PriceMapper.FormatCurrency(Number(calendarState.deliveryCharge));
            deliveryCharge.innerHTML = charge;

        }

    }

    function lookupLocalisedTimeSlotName(timeSlot) {

        switch (timeSlot) {

            case "Same":
            case "Same Day":
                return DRLJs.Localization.Checkout.AoDeliveryDateTimePicker.SameDayTimeslotText;
            case "Anytime":
                return DRLJs.Localization.Checkout.AoDeliveryDateTimePicker.AnytimeTimeslotText;
            case "Morning":
                return DRLJs.Localization.Checkout.AoDeliveryDateTimePicker.MorningTimeslotText;
            case "Lunch":
                return DRLJs.Localization.Checkout.AoDeliveryDateTimePicker.LunchTimeslotText;
            case "Afternoon":
                return DRLJs.Localization.Checkout.AoDeliveryDateTimePicker.AfternoonTimeslotText;
            case "Evening":
                return DRLJs.Localization.Checkout.AoDeliveryDateTimePicker.EveningTimeslotText;
            default:
                return timeSlot;

        }

    }

    function selectSlot(e) {

        if (enabled) {

            var target = e.target || e.srcElement;
            var selected = document.querySelector(".aoCalendarTableSelected");

            if (selected) {
                removeClass(selected, "aoCalendarTableSelected");
            }

            if (selectedRow) {

                var currentTable = this.parentNode.parentNode.parentNode;
                var selectedRowTable = selectedRow.parentNode.parentNode;

                for (var i = 0, len = tables.length; i < len; i++) {

                    if (tables[i] !== currentTable && tables[i] === selectedRowTable ||
						tables[i] === currentTable && this.parentNode !== selectedRow && !showTimeSlotsState) {

                        // hide the row if it's being displayed in a table that is now hidden
                        // but not if its the anytime delivery row because that should always be displayed
                        var data = selectedRow.getAttribute("data-time-slot");
                        if (data !== "Anytime" && data !== "Same Day") {
                            addClass(selectedRow, "aoCalendarTableHide");
                        }

                    }

                }

            }

            // ensure we don't highlight the table cell, only the p tag within!
            if(!(target instanceof HTMLParagraphElement)) {
                target = target.children[0];
            }

            selectedRow = this.parentNode;
            addClass(target, "aoCalendarTableSelected");
            saveState(this);

            // TODO : IB/PH - need to take the below line out completely after basket promotion has gone live
            if (!window.supportBasketPromotions) {
                updateSummary();
            }

            $.publish("SELECTED_DELIVERY_DATE_CHANGED", {

                deliveryDate: calendarState.deliveryShortdate,
                deliveryDateCharge: Number(this.getAttribute("data-date-charge")),
                deliveryDateChargeExVat: Number(this.getAttribute("data-date-charge-exvat"))
            });
            
            $.publish("SELECTED_TIMESLOT_CHANGED", {

                timeSlotId: calendarState.timeslotid,
                timeSlotType: calendarState.timeSlot,
                timeSlotCharge: Number(this.getAttribute("data-time-charge")),
                timeSlotChargeExVat: Number(this.getAttribute("data-time-charge-exvat"))
            });

        }

    }


    function enable() {

        hideCover();
        enabled = true;

    }

    function disable() {

        if (showTimeSlotsState) {
            showHideTimeSlots();
        }

        resetCalendar();
        showCover();
        enabled = false;

    }

    function showCover() {

        calendarDisabledCover.style.display = "block";
        calendarDisabledMessage.style.display = "block";

    }

    function hideCover() {

        calendarDisabledCover.style.display = "none";
        calendarDisabledMessage.style.display = "none";

    }

    function showLoadingSpinner() {

        if (calendarDisabledCover) {

            if (!document.querySelector(".spinner")) {
                
                var spinner = document.createElement("div");
                spinner.className = "spinner";

                var inner = document.createElement("span");
                inner.className = "inner icon-logo";

                calendarDisabledCover.appendChild(inner);
                calendarDisabledCover.appendChild(spinner);

                showCover();

            }

        }

    }

    function removeLoadingSpinner(shouldHideCover) {

        if (calendarDisabledCover) {
            
            var spinner = calendarDisabledCover.querySelector(".spinner");
            var inner = calendarDisabledCover.querySelector(".inner");

            if (spinner) {
                spinner.parentNode.removeChild(spinner);
            }
            
            if (inner) {
                inner.parentNode.removeChild(inner);
            }

            if (shouldHideCover) {
                hideCover();
            }

        }

    }

    function showPrevDate() {

        if (currentWeek !== 0 && enabled) {

            var lastDisplayedDate = currentWeek;
            currentWeek--;
            showDateRange();
            showTable(lastDisplayedDate);

            if (currentWeek === 0) {
                dateRangeLeft.className += " aoCalendarDateRangeCtrlDisabled";
            }
            else {
                dateRangeLeft.className = dateRangeLeft.className.replace(/(\s?)aoCalendarDateRangeCtrlDisabled/, "");
            }

            dateRangeRight.className = dateRangeRight.className.replace(/(\s?)aoCalendarDateRangeCtrlDisabled/, "");

        }

    }


    function showNextDate() {

        if (enabled && currentWeek < amountOfWeeksToShow - 1) {

            var lastDisplayedDate = currentWeek;
            currentWeek++;
            showDateRange();
            showTable(lastDisplayedDate);

            if (currentWeek === amountOfWeeksToShow - 1) {
                dateRangeRight.className += " aoCalendarDateRangeCtrlDisabled";
            }
            else {
                dateRangeRight.className = dateRangeRight.className.replace(/(\s?)aoCalendarDateRangeCtrlDisabled/, "");
            }

            dateRangeLeft.className = dateRangeLeft.className.replace(/(\s?)aoCalendarDateRangeCtrlDisabled/, "");

        }

    }


    function showTable(index) {

        addClass(tables[index], "aoCalendarTableHide");
        removeClass(tables[currentWeek], "aoCalendarTableHide");

    }


    function saveState(el) {

        var parentTable = tables[currentWeek];
        var th = parentTable.children[0].children[0].children[el.getAttribute("data-cell-index")];
        var basketTotal = deliveryDates.orderTotals.BasketProductValueTotalNumber;
        var total = el.getAttribute("data-total-charge") === "Free" ? Number(basketTotal) : Number(basketTotal) + Number(el.getAttribute("data-total-charge"));

        calendarState = {
            basketTotal: basketTotal,
            deliveryDay: th.children[1].innerHTML,
            deliveryDate: th.children[2].innerHTML,
            deliveryShortdate: th.getAttribute("data-shortdate"),
            deliveryCharge: el.getAttribute("data-total-charge"),
            timeSlot: el.parentNode.getAttribute("data-time-slot"),
            timeslotid: el.getAttribute("data-timeslot-id"),
            total: total
        };

    }

    // output a message in place of calendar i.e. no dates, northern ireland etc
    function displayMessage(messageText) {

        resetCalendar();

        var message = document.createElement("section");
        var p = document.createElement("p");
        message.className = "aoCalendarGenericMessage";
        p.innerHTML = messageText;
        message.appendChild(p);
        container.parentNode.insertBefore(message, container);
        container.style.display = "none";

        $.publish("USE_STANDARD_DELIVERY_CHARGE");
        $.publish("TOGGLE_CALENDAR", { show: false });

    }


    function removeClass(el, cls) {

        if (!el.length) {
            el = [el];
        }

        for (var i = 0; i < el.length; i++) {

            var reg = new RegExp("\s?" + cls);
            el[i].className = el[i].className.replace(reg, "");
            el[i].className = el[i].className.replace(/\s+$/g, "");

        }

    }


    function addClass(el, cls) {

        if (!el.length) {
            el = [el];
        }

        for (var i = 0; i < el.length; i++) {

            if (el[i].className.indexOf(cls) === -1) {

                var whitespace = el[i].className === "" ? "" : " ";
                el[i].className += whitespace + cls;

            }

        }

    }

    return function () {

        if (settings.testmode) {

            return {
                settings: settings,
                deliveryTimeslots: deliveryTimeslots,
                deliveryDates: deliveryDates,
                availableDays: availableDays,
                availableDates: availableDates,
                amountOfWeeksToShow: amountOfWeeksToShow,
                dateRanges: dateRanges,
                calendarState: calendarState,
                tableTemplate: tableTemplate,
                currentWeek: currentWeek,
                totalAmountOfWeeks: totalAmountOfWeeks,
                timeslots: timeslots,
                tables: tables,
                thIndex: thIndex,
                tdIndex: tdIndex,
                orderTotalExcludingDelivery : orderTotalExcludingDelivery,
                init: init,
                suffix: suffix,
                fillInGapsInDates: fillInGapsInDates,
                formatDates: formatDates,
                createDateRanges: createDateRanges,
                createNewTable: createNewTable,
                createTableHead: createTableHead,
                createSameDayDeliveryRow: createSameDayDeliveryRow,
                createAllDayDeliveryRow: createAllDayDeliveryRow,
                createTimeSlotRows: createTimeSlotRows,
                updateSummary: updateSummary,
                enable: enable,
                disable: disable,
                enabled: enabled,
                selectSlot: selectSlot,
                saveState: saveState,
                setCalendarConfig: setCalendarConfig,
                setTimeslotsConfig: setTimeslotsConfig,
                setTotalAmountOfWeeks: setTotalAmountOfWeeks,
                setAvailableDates: setAvailableDates
            };

        }
        else {

            return {
                init: init
            };

        }

    };
    
})({
    format: "weekSelect",
    weeksToDisplay: 5,
    testmode: true
});