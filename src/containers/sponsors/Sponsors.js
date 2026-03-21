import { connect } from 'react-redux'
import Sponsors from '../../components/sponsors/Sponsors'

import SponsorsData from '../../static/Sponsors.json'

export default connect(
    state => ({
        data: SponsorsData
    })
)(Sponsors)
