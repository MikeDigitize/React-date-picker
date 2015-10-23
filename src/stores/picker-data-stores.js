export function totalWeeks(state = 0, action = {}) {
    switch(action.type) {
        case "TOTALWEEKSUPDATE" :
            return action.state;
        default :
            return state;
    }
}

export function tableDisplayIndex(state = 0, action = {}) {
    switch(action.type) {
        case "TABLEDISPLAYINDEX" :
            return action.state;
        default :
            return state;
    }
}

export function dateRanges(state = [], action = {}) {
    switch(action.type) {
        case "NEWDATERANGES" :
            return action.state;
        default :
            return state;
    }
}

export function tableHeadData(state = [], action = {}) {
    switch(action.type) {
        case "NEWTABLEHEADDATA" :
            return action.state;
        default :
            return state;
    }
}

export function tableBodyData(state = [], action = {}) {
    switch(action.type) {
        case "NEWTABLEBODYDATA" :
            return action.state;
        default :
            return state;
    }
}

export function timeDescriptions(state = {}, action = {}) {
    switch(action.type) {
        case "NEWTIMEDESCRIPTIONS" :
            return action.state;
        default :
            return state;
    }
}