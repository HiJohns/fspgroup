import { connect } from 'react-redux'

import Events from '../../components/main/Events'
import EventImages from '../../static/EventImages.json'

export default connect(
    state => ({
        images: EventImages
    })
)(Events)
