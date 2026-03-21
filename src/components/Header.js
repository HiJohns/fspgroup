import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const styles = {
    header: {
        backgroundColor: "rgb(27,42,68)",
        height: "100px"
    },
    headerBox: {
        height: "100%",
        display: "flex"
    },
    logoBox: {
        flex: "1 1 0px"
    },
    logo: {
        background: "url(dist/images/fsp/FSP-LOGO_Trans_with_Text.png) no-repeat left top",
        height: "81px",
        marginTop: "8px",
        letterSpacing: "0px",
        backgroundSize: '217px 81px'
    },
    menuItem: {
        height: "100%",
        padding: "38px 12px 0 12px",
        boxSizing: "border-box"
    },
    menuItemText: {
        fontSize: "20px",
        fontFamily: "Calibri Light",
        color: "white",
        textDecoration: "none",
        letterSpacing: "0px"
    },
    activeItem: {
        backgroundColor: "rgb(49,171,58)"
    }
}

export default class Header extends Component {
    static propTypes = {
        menu: PropTypes.arrayOf(PropTypes.shape({
            title: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            link: PropTypes.string.isRequired
        })).isRequired,
        active: PropTypes.string.isRequired
    }

    renderMenuItem(item, index) {
        let { active } = this.props, boxStyle = styles.menuItem;
        if (active === item.name) boxStyle = Object.assign({}, boxStyle, styles.activeItem);
        return (
            <div style={boxStyle} key={'item_'+index}>
                <a href={item.link} style={styles.menuItemText}>{item.title}</a>
            </div>
        )
    }

    render() {
        let { menu } = this.props;
        return (
            <header style={styles.header}>
                <div className="middle-box" style={styles.headerBox}>
                    <a href="http://fspgroup.ca" style={styles.logoBox}><div style={styles.logo}/></a>
                    { menu.map((item, index) => this.renderMenuItem(item, index)) }
                </div>
            </header>
        )
    }
}
