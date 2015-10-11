jest.dontMock("../../../stores/PickerStore");
jest.dontMock("../../../data/available-dates");
jest.dontMock("../../../data/date-charges");
jest.dontMock("../../../actions/picker-data-actions");
let React = require("react/addons");
let DatePickerStore = require ("../../../stores/PickerStore");
let data = require ("../../../data/available-dates");
let actions = require ("../../../actions/picker-data-actions");

describe("Passing the Date Picker's initial data into the Store", function() {

    let calendarConfig = data.config;
    let dates = data.config.calendarConfiguration.availableDays;
    let totalsData = data.config.orderTotals.OverallTotalNumber;

    function wait(key, data){
        return new Promise((res, rej) => {
            DatePickerStore.subscribe(res);
            DatePickerStore.dispatch(actions[key](data));
        });
    }
    pit("Correctly loads the calendar config and dispatches on receipt", function() {
        var getData = wait("calendarConfig", calendarConfig);
        return getData.then(() => {
            expect(Object.keys(DatePickerStore.getState().calendarConfig).length).toBe(2);
        });
    });

    pit("Correctly loads / converts the available dates data and dispatches on receipt", function() {
        var getData = wait("availableDates", dates);
        return getData.then(() => {
            expect(DatePickerStore.getState().availableDates.length).toBeGreaterThan(0);
        });
    });

    pit("Correctly loads the basket totals data and dispatches on receipt", function() {
        var getData = wait("basketTotalUpdate", totalsData);
        return getData.then(() => {
            expect(DatePickerStore.getState().basketTotal).toBeGreaterThan(0);
        });
    });

    pit("Test the 'availableDates' store will convert an object into an array of its keys", function() {
        var getData = wait("availableDates", { test : "prop1", test2 : "prop2" });
        return getData.then(() => {
            expect(DatePickerStore.getState().availableDates.length).toBe(2);
            expect(DatePickerStore.getState().availableDates[0]).toBe("test");
            expect(DatePickerStore.getState().availableDates[2]).toBeUndefined();
        });
    });

});