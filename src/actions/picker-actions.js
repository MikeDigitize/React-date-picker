import { removeCharge } from "./external-actions";

const TOTALWEEKSUPDATE = "TOTALWEEKSUPDATE";
const NEWDATERANGES = "NEWDATERANGES";
const NEWTIMEDESCRIPTIONS = "NEWTIMEDESCRIPTIONS";
const NEWTABLEHEADDATA = "NEWTABLEHEADDATA";
const NEWTABLEBODYDATA = "NEWTABLEBODYDATA";
const TABLEDISPLAYINDEX = "TABLEDISPLAYINDEX";
const NEWSELECTEDTIMESLOTDATA= "NEWSELECTEDTIMESLOTDATA";
const DISPLAYALLROWS = "DISPLAYALLROWS";

function totalWeeks(data) {
    return { state : data, type: TOTALWEEKSUPDATE };
}

function dateRanges(data) {
    return { state : data, type : NEWDATERANGES };
}

function timeDescriptions(data) {
    return { state : data, type : NEWTIMEDESCRIPTIONS };
}

function tableHeadData(data) {
    return { state : data, type : NEWTABLEHEADDATA };
}

function tableBodyData(data) {
    return { state : data, type : NEWTABLEBODYDATA };
}

export function updateTableIndex(data) {
    return { state : data, type: TABLEDISPLAYINDEX };
}

export function selectedTimeslotData(data) {
    return { state : data, type : NEWSELECTEDTIMESLOTDATA };
}

export function displayAllRows(data) {
    return { state : data, type : DISPLAYALLROWS };
}

export function loadPickerData(config) {
    return function(dispatch) {
        dispatch(totalWeeks(config.weeksInConfig));
        dispatch(dateRanges(config.dateRanges));
        dispatch(tableHeadData(config.tableHeadData));
        dispatch(tableBodyData(config.tableBodyData));
        dispatch(timeDescriptions(config.timeDescriptions));
    }
}

export function checkTimeslotExists(tableData) {
    return function(dispatch) {
        function isTimeslotStillAvailable() {
            if(!Object.keys(tableData.selectedTimeslotData).length){
                return false;
            }
            let matchingTimeslots = [];
            let current = {
                description : tableData.selectedTimeslotData.description,
                hasTimeslot : tableData.selectedTimeslotData.hasTimeslot,
                shortdate : tableData.selectedTimeslotData.shortdate
            };
            tableData.tableBodyData.forEach(data => {
                data.forEach(slots => {
                    if(!matchingTimeslots.length) {
                        matchingTimeslots = slots.filter(slot => {
                            return slot.description === current.description && slot.hasTimeslot === current.hasTimeslot && slot.shortdate === current.shortdate;
                        });
                    }
                });
            });
            return matchingTimeslots.length;
        }
        if(!isTimeslotStillAvailable()) {
            dispatch(removeCharge({ name : "delivery-charge" }));
            dispatch(selectedTimeslotData({}));
        }
    }
}

export function checkTableIndexExists(tableData) {
    return function(dispatch) {
        let tableDisplayIndex = tableData.tableDisplayIndex;
        let ranges = tableData.dateRanges;
        if(tableDisplayIndex >= ranges.length) {
            dispatch(updateTableIndex(0));
        }
    }
}