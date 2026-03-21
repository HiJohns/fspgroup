import About from './About'
import News from './News'

let combine = {};

export default combine;

[
    About,
    News
].forEach(function (handlers) {
    for (let key in handlers) {
        let list = combine.hasOwnProperty(key) ? combine[key] : [];
        list.push(handlers[key]);
        combine[key] = list;
    }
});
