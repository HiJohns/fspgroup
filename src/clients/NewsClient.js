import superagent from 'superagent'

export default {
    load: id => new Promise((resolve, reject) => {
        superagent.get('dist/html/news/' + id + '.html')
            .end((err, res) => {
                if (err) {
                    reject(err.response);
                } else {
                    resolve(res.text);
                }
            });
    })
}
