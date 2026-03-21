import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Footer from '../containers/Footer'
import Header from '../components/Header'
import Banner from './main/Banner'

export default class Page extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        menu: PropTypes.array.isRequired,
        content: PropTypes.arrayOf(PropTypes.func)
    }

    render() {
        let { name, content, menu } = this.props;
        return (
            <div className="main">
                <Header active={name} menu={menu}/>
                <Banner/>
                { content.map((Component, index) => <Component key={"component_" + index}/>) }
                <Footer/>
            </div>
        )
    }
}
