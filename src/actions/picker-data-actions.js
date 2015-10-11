const CALENDARCONFIG = "CALENDARCONFIG";
const AVAILABLEDATES = "AVAILABLEDATES";
const BASKETTOTALUPDATE = "BASKETTOTALUPDATE";
const DATECHARGECONFIG = "DATECHARGECONFIG";

export function calendarConfig(data) {
    return { state : data, type: CALENDARCONFIG };
}

export function availableDates(data) {
    return { state : data, type: AVAILABLEDATES };
}

export function dateChargeConfig(data) {
    return { state : data, type: DATECHARGECONFIG };
}

export function basketTotalUpdate(data) {
    return { state : data, type: BASKETTOTALUPDATE };
}