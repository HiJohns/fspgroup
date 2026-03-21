import { connect } from 'react-redux'
import Page from '../../components/Page'
import HeaderMenu from '../../static/HeaderMenu'
import News from '../news/'

export default connect(
    state => ({
        name: 'seminars',
        menu: HeaderMenu,
        content: News 
    })
)(Page);
