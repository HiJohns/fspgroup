import { connect } from 'react-redux'

import Executives from '../../components/executives/Executives'
import ExecutivesData from '../../static/Executives.json'

export default connect(
    state => ({
        list: ExecutivesData
    })
)(Executives)
