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