import { connect } from 'react-redux'
import Article from '../../components/Article'
import AboutData from '../../static/About.json'

export default connect(
    state => ({
        message: state.about.text,
        title: AboutData.title
    })
)(Article)
