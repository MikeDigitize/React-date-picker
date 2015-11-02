let initialState = {
    tableHeadData : [],
    tableBodyData : [],
    dateRanges : [],
    tableDisplayIndex : 0,
    totalWeeks : 0,
    selectedTimeslotData : {},
    displayAllRows : false,
    showHideText : "Show more timeslots"
};

export function tableData(state = initialState, action = {}) {
    switch(action.type) {
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
            if(action.state.target) {
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
            }
            else {
                return Object.assign({}, state, {
                    selectedTimeslotData : action.state
                });
            }
        case "DISPLAYALLROWS" :
            return Object.assign({}, state, {
                displayAllRows : action.state
            });
        case "NEWTIMEDESCRIPTIONS" :
            return Object.assign({}, state, {
                timeDescriptions : action.state
            });
        case "SHOWHIDETEXT" :
            return Object.assign({}, state, {
                showHideText : action.state
            });
        default :
            return state;
    }
}