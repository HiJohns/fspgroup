import AboutClient from '../clients/AboutClient'

const loadAbout = (getState, action, next) => {
    AboutClient.load().then(result => {
        next(Object.assign({}, action, { payload: { success: true, result: result } }));
    }, err => {
        next(Object.assign({}, action, { payload: { success: false, err: err }}));
        alert('There is some server side error. Please come back later.');
    });
}

export default {
    'ABOUT_LOAD': loadAbout 
}
