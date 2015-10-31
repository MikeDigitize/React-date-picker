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
            let ref = action.state.target.getAttribute("data-ref");
            let selected = [];
            state.tableBodyData[state.tableDisplayIndex].forEach(data => {
                if(!selected.length) {
                    selected = data.filter(days => {
                        return days.ref === ref;
                    });
                }
            });
            selected = selected.shift();
            if(!action.state.target.classList.contains("timeslot-selected")){
                selected = {};
            }
            return Object.assign({}, state, {
                selectedTimeslotData : selected
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