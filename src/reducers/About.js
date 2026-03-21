const defaultState = {
    text: null
}

export default (state = defaultState, action) => {
    let { payload, type } = action, update = {};
    switch (type) {
    case 'ABOUT_LOAD': {
            let { success, result } = payload;
            if (!success) break;
            update.text = result;
        }
        break;
    }

    return Object.assign({}, state, update);
}
