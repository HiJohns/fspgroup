import { connect } from 'react-redux'

import News from '../../components/main/News'
import NewsData from '../../static/News.json'

export default connect(
    state => ({
        data: NewsData
    })
)(News)
