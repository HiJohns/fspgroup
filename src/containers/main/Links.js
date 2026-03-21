import { connect } from 'react-redux'

import Links from '../../components/main/Links'
import LinksData from '../../static/Links.json'

export default connect(
    state => ({
        links: LinksData
    })
)(Links)
