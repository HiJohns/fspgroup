import React, { Component } from 'react'
import PropTypes from 'prop-types'

import renderHtml from '../helpers/HtmlHelper'

const styles = {
    section: {
        paddingTop: "2rem"
    }
}

export default class Article extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        message: PropTypes.string
    }

    renderMessage(msg) {
        return msg ? renderHtml(msg) : msg;
    }

    render() {
        let { title, message } = this.props;

        return (
            <section className="main article" style={styles.section}>
                <h2>{title}</h2>
                {this.renderMessage(message)}
            </section>
        )
    }
}
