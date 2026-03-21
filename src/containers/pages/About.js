import { connect } from 'react-redux'
import Page from '../../components/Page'
import About from '../about/'
import HeaderMenu from '../../static/HeaderMenu'

export default connect(
    state => ({
        menu: HeaderMenu,
        name: 'about',
        content: About
    })
)(Page);

