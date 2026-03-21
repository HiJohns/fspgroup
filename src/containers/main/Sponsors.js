import { connect } from 'react-redux'

import Sponsors from '../../components/main/Sponsors'
import SponsorList from '../../static/Sponsors.json'

export default connect(
    state => ({
        sponsors: SponsorList 
    })
)(Sponsors)
