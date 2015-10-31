const NEWAVAILABLEDATESANDCHARGES = "NEWAVAILABLEDATESANDCHARGES";
const TOTALWEEKSUPDATE = "TOTALWEEKSUPDATE";
const TABLEDISPLAYINDEX = "TABLEDISPLAYINDEX";
const NEWDATERANGES = "NEWDATERANGES";
const NEWTABLEHEADDATA = "NEWTABLEHEADDATA";
const NEWTABLEBODYDATA = "NEWTABLEBODYDATA";
const NEWTIMEDESCRIPTIONS = "NEWTIMEDESCRIPTIONS";
const NEWSELECTEDTIMESLOTDATA= "NEWSELECTEDTIMESLOTDATA";
const DISPLAYALLROWS = "DISPLAYALLROWS";

export function availableDates(data) {
    return { state : data, type: NEWAVAILABLEDATESANDCHARGES };
}

export function selectedTimeslotData(data) {
    return { state : data, type : NEWSELECTEDTIMESLOTDATA };
}

export function totalWeeks(data) {
    return { state : data, type: TOTALWEEKSUPDATE };
}

export function updateTableIndex(data) {
    return { state : data, type: TABLEDISPLAYINDEX };
}

export function dateRanges(data) {
    return { state : data, type : NEWDATERANGES };
}

export function timeDescriptions(data) {
    return { state : data, type : NEWTIMEDESCRIPTIONS };
}

export function tableHeadData(data) {
    return { state : data, type : NEWTABLEHEADDATA };
}

export function tableBodyData(data) {
    return { state : data, type : NEWTABLEBODYDATA };
}

export function displayAllRows(data) {
    return { state : data, type : DISPLAYALLROWS };
}