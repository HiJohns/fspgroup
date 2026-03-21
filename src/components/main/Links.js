import React, { Component } from 'react'
import PropTypes from 'prop-types'

const styles = {
    list: {
        listStyle: 'none',
        marginTop: '3rem'
    },
    item: {
        clear: "both",
        width: "100%",
        height: "43px",
        margin: "2rem 0px",
        display: 'flex'
    },
    iconBox: {
        flex: "0 0 80px",
        overflow: "hidden",
        textAlign: "center"
    },
    icon: {
        maxHeight: "100%"
    },
    itemText: {
        fontSize: "26px",
        paddingLeft: "30px",
        flex: "1 1 0",
        color: "#0072BC"
    }
}

export default class News extends Component {
    static propTypes = {
        links: PropTypes.arrayOf(PropTypes.shape({
            link: PropTypes.string.isRequired,
            icon: PropTypes.string.isRequired,
            style: PropTypes.string
        })).isRequired
    }

    renderLink(link, index) {
        let textStyle = Object.assign({}, styles.itemText, link.style);
        return (
            <li key={"link_" + index} style={styles.item}>
                <span style={styles.iconBox}><a href={link.link}><img style={styles.icon} src={link.icon} style={styles.icon}/></a></span>
                <span style={textStyle}><a href={link.link}>{link.title}</a></span>
            </li>
        )
    }

    render() {
        let { links } = this.props;
        return (
            <section className="main">
                <h2>Links</h2>
                <ul style={styles.list}>{links.map((link, index)=>this.renderLink(link, index))}</ul>
            </section>
        )
    }
}
