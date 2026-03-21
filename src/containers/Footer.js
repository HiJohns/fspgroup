import { connect } from 'react-redux'

import Footer from '../components/Footer'
import SocialMedias from '../static/SocialMedias.json'

export default connect(
    state => ({
        socialMedias: SocialMedias
    })
)(Footer)
