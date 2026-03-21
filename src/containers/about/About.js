import { connect } from 'react-redux'
import Article from '../../components/Article'

export default connect(
    state => ({
        message: state.about.text
    })
)(Article)
