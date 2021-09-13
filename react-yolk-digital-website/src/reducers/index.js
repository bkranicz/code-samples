const initialState = {
    lang: 'en',
    jobId: ''
};

function rootReducer(state = initialState, action) {

    if (action.type === "SET_LANG") {
        return Object.assign({}, state, {
          lang: action.payload
        });

    } else if (action.type === "SET_JOBID") {

        return Object.assign({}, state, {
            jobId: action.payload
          });
    }
    
    return state;
};

export default rootReducer;