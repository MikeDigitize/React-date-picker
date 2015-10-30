//export function totalWeeks(state = 0, action = {}) {
//    switch(action.type) {
//        case "TOTALWEEKSUPDATE" :
//            return action.state;
//        default :
//            return state;
//    }
//}

//export function tableDisplayIndex(state = 0, action = {}) {
//    switch(action.type) {
//        case "TABLEDISPLAYINDEX" :
//            return action.state;
//        default :
//            return state;
//    }
//}

//export function dateRanges(state = [], action = {}) {
//    switch(action.type) {
//        case "NEWDATERANGES" :
//            return action.state;
//        default :
//            return state;
//    }
//}

//export function tableHeadData(state = [], action = {}) {
//    switch(action.type) {
//        case "NEWTABLEHEADDATA" :
//            return action.state;
//        default :
//            return state;
//    }
//}

//export function tableBodyData(state = [], action = {}) {
//    switch(action.type) {
//        case "NEWTABLEBODYDATA" :
//            return action.state;
//        default :
//            return state;
//    }
//}

//export function timeDescriptions(state = {}, action = {}) {
//    switch(action.type) {
//        case "NEWTIMEDESCRIPTIONS" :
//            return action.state;
//        default :
//            return state;
//    }
//}

//export function selectedTimeslot(state = {}, action = {}) {
//    switch(action.type) {
//        case "NEWCHOSENTIMESLOT" :
//            return action.state;
//        default :
//            return state;
//    }
//}

//export function displayAllRows(state = false, action = {}) {
//    switch(action.type) {
//        case "DISPLAYALLROWS" :
//            return action.state;
//        default :
//            return state;
//    }
//}

//export function availableDates(state = {}, action = {}) {
//    switch(action.type) {
//        case "NEWAVAILABLEDATESANDCHARGES" :
//            return action.state;
//        default :
//            return state;
//    }
//}

//export function selectedTimeslotData(state = {}, action = {}) {
//    switch(action.type) {
//        case "NEWCHOSENTIMESLOTDATA" :
//            return action.state;
//        default :
//            return state;
//    }
//}

export function tableData(state = { availableDates : [], tableHeadData : [], tableBodyData : [], dateRanges : [], tableDisplayIndex : 0, totalWeeks : 0, selectedTimeslotData : {}, selectedTimeslot : {}, displayAllRows : false }, action = {}) {
    switch(action.type) {
        case "NEWAVAILABLEDATESANDCHARGES" :
            return Object.assign({}, state, {
                availableDates : action.state
            });
        case "NEWTABLEHEADDATA" :
            return Object.assign({}, state, {
                tableHeadData : action.state
            });
        case "NEWTABLEBODYDATA" :
            return Object.assign({}, state, {
                tableBodyData : action.state
            });
        case "NEWDATERANGES" :
            return Object.assign({}, state, {
                dateRanges : action.state
            });
        case "TABLEDISPLAYINDEX" :
            return Object.assign({}, state, {
                tableDisplayIndex : action.state
            });
        case "TOTALWEEKSUPDATE" :
            return Object.assign({}, state, {
                totalWeeks : action.state
            });
        case "NEWSELECTEDTIMESLOTDATA" :
            return Object.assign({}, state, {
                selectedTimeslotData : action.state
            });
        case "NEWSELECTEDTIMESLOT" :
            return Object.assign({}, state, {
                selectedTimeslot : action.state
            });
        case "DISPLAYALLROWS" :
            return Object.assign({}, state, {
                displayAllRows : action.state
            });
        case "NEWTIMEDESCRIPTIONS" :
            return Object.assign({}, state, {
                timeDescriptions : action.state
            });
        default :
            return state;
    }
}