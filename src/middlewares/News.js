import NewsClient from '../clients/NewsClient'

const loadNews = (getState, action, next) => {
    let { payload } = action;
    NewsClient.load(payload.id).then(result => {
        next(Object.assign({}, action, { payload: Object.assign({}, payload, { success: true, result: result }) }));
    }, err => {
        next(Object.assign({}, action, { payload: Object.assign({}, payload, { success: false, err: err }) }));
        alert('There is some server side error. Please come back later.');
    });
}

export default {
    'NEWS_LOAD': loadNews
}
