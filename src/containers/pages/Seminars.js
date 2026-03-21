import { connect } from 'react-redux'
import Page from '../../components/Page'
import HeaderMenu from '../../static/HeaderMenu'
import Seminars from '../seminars/'

export default connect(
    state => ({
        name: 'seminars',
        menu: HeaderMenu,
        content: Seminars 
    })
)(Page);
