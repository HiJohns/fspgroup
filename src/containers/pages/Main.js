import { connect } from 'react-redux'
import Page from '../../components/Page'
import HeaderMenu from '../../static/HeaderMenu'
import Main from '../main/'

export default connect(
    state => ({
        name: 'main',
        menu: HeaderMenu,
        content: Main
    })
)(Page);
