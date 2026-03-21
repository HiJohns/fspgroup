import { connect } from 'react-redux'

import News from '../../components/news/News'
import Highlights from '../../static/Highlights.json'

export default connect(
    state => ({
        highlights: Highlights,
        news: state.news.current
    })
)(News)
