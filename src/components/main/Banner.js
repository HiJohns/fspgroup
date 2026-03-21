import React, { Component } from 'react'
import PropTypes from 'prop-types'

const styles = {
    banner: {
        background: 'url(dist/images/Layer2.png) no-repeat ',
        backgroundSize: 'cover',
        height: '230px',
        paddingTop: '53px',
        boxSizing: 'border-box'
    },
    title: {
        background: 'url(dist/images/Title.png) no-repeat',
        height: '50px',
        width: '765px',
        margin: '0 auto'
    },
    subtitle: {
        background: 'url(dist/images/TitleReverse.png) no-repeat',
        height: '37px',
        width: '765px',
        margin: '6px auto'
    }
}

export default class Banner extends Component {
    render() {
        return (
            <div className="banner" style={styles.banner}>
                <div style={styles.title}/>
                <div style={styles.subtitle}/>
            </div>
        )
    }
}
