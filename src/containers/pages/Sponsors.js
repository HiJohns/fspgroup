import { connect } from 'react-redux'
import Page from '../../components/Page'
import Sponsors from '../sponsors/'
import HeaderMenu from '../../static/HeaderMenu'

export default connect(
    state => ({
        menu: HeaderMenu,
        name: 'sponsors',
        content: Sponsors
    })
)(Page);

