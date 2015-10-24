const TOTALWEEKSUPDATE = "TOTALWEEKSUPDATE";
const TABLEDISPLAYINDEX = "TABLEDISPLAYINDEX";
const NEWDATERANGES = "NEWDATERANGES";
const NEWTABLEHEADDATA = "NEWTABLEHEADDATA";
const NEWTABLEBODYDATA = "NEWTABLEBODYDATA";
const NEWTIMEDESCRIPTIONS = "NEWTIMEDESCRIPTIONS";
const NEWCHOSENTIMELOT= "NEWCHOSENTIMELOT";
const NEWCHOSENTIMESLOTDATA= "NEWCHOSENTIMESLOTDATA";

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

export function selectedTimeslot(data) {
    return { state : data, type : NEWCHOSENTIMELOT };
}

export function selectedTimeslotData(data) {
    return { state : data, type : NEWCHOSENTIMESLOTDATA };
}