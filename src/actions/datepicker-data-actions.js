const NEWDATEPICKERDATA = "NEWDATEPICKERDATA";
const NEWCHARGECONFIG = "NEWCHARGECONFIG";
const NEWBASKETTOTALS = "NEWBASKETTOTALS";

export function newDatePickerData(data) {
    return { state : data, type: NEWDATEPICKERDATA };
}

export function chargeConfig(data) {
    return { state : data, type: NEWCHARGECONFIG };
}

export function basketTotals(data) {
    return { state : data, type: NEWBASKETTOTALS };
}