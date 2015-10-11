jest.dontMock("../../../stores/DatePickerStore");
jest.dontMock("../../../data/available-dates");
jest.dontMock("../../../actions/datepicker-data-actions");
let React = require("react/addons");
let DatePickerStore = require ("../../../stores/DatePickerStore");
let data = require ("../../../data/available-dates");
let actions = require ("../../../actions/datepicker-data-actions");

describe("The store loads and returns the original data correctly", function() {

    let availableDays = data.availableDays.calendarConfiguration.availableDays;
    let chargeData = data.availableDays.calendarConfiguration.chargeConfigurationCollection;
    let totalsData = data.availableDays.orderTotals;

    function wait(key, data){
        return new Promise((res, rej) => {
            DatePickerStore.subscribe(res);
            DatePickerStore.dispatch(actions[key](data));
        });
    }
    pit("Correctly loads the available dates data and dispatches on receipt", function() {
        var getData = wait("newDatePickerData", availableDays);
        return getData.then(() => {
            expect(Object.keys(DatePickerStore.getState().availableDays).length).toBeGreaterThan(0);
        });
    });
    pit("Correctly loads the charge config data and dispatches on receipt", function() {
        var getData = wait("chargeConfig", chargeData);
        return getData.then(() => {
            expect(Object.keys(DatePickerStore.getState().chargeConfig).length).toBeGreaterThan(0);
        });
    });
    pit("Correctly loads the basket totals data and dispatches on receipt", function() {
        var getData = wait("basketTotals", totalsData);
        return getData.then(() => {
            expect(Object.keys(DatePickerStore.getState().basketTotals).length).toBeGreaterThan(0);
        });
    });

});