import superagent from 'superagent'

export default {
    load: () => new Promise((resolve, reject) => {
        superagent.get('dist/html/About.html')
            .end((err, res) => {
                if (err) {
                    reject(err.response);
                } else {
                    resolve(res.text);
                }
            });
    })
}
