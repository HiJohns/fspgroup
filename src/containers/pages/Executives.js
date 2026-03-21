import { connect } from 'react-redux'
import Page from '../../components/Page'
import Executives from '../executives/'
import HeaderMenu from '../../static/HeaderMenu'

export default connect(
    state => ({
        menu: HeaderMenu,
        name: 'executives',
        content: Executives
    })
)(Page);

