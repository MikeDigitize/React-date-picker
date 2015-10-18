const NEWAVAILABLEDATESANDCHARGES = "NEWAVAILABLEDATESANDCHARGES";
const BASKETTOTALUPDATE = "BASKETTOTALUPDATE";
const TOTALWEEKSUPDATE = "TOTALWEEKSUPDATE";
const TABLEDISPLAYINDEX = "TABLEDISPLAYINDEX";
const NEWDATERANGES = "NEWDATERANGES";
const NEWTABLEHEADDATA = "NEWTABLEHEADDATA";
const NEWTABLEBODYDATA = "NEWTABLEBODYDATA";

export function availableDates(data) {
    return { state : data, type: NEWAVAILABLEDATESANDCHARGES };
}

export function basketTotal(data) {
    return { state : data, type: BASKETTOTALUPDATE };
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

export function tableHeadData(data) {
    return { state : data, type : NEWTABLEHEADDATA };
}

export function tableBodyData(data) {
    return { state : data, type : NEWTABLEBODYDATA };
}