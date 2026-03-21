import { connect } from 'react-redux'

import Seminars from '../../components/seminars/Seminars'
import Presentations from '../../static/Presentations.json'
import Speakers from '../../static/Speakers.json'

export default connect(
    state => ({
        speakers: Speakers,
        presentations: Presentations 
    })
)(Seminars)
