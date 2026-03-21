import News from '../static/News.json'

const defaultState = {
    current: null
}

export default (state = defaultState, action) => {
    let { payload, type } = action, update = {};
    switch (type) {
    case 'NEWS_LOAD': {
            let { id, success, result } = payload;
            if (!success) break;
            update.current = {
                title: News.filter(n => n.link === id)[0].title,
                content: result
            }
        }
        break;
    }

    return Object.assign({}, state, update);
}
