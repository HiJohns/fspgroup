import React, { Component } from 'react'
import PropTypes from 'prop-types'

const styles = {
    footer: {
        backgroundColor: "rgb(27,42,68)",
        height: "100px"
    },
    box: {
        display: "flex",
        margin: "0 auto"
    },
    email: {
        fontWeight: "bold"
    },
    socialMedias: {
        listStyle: "none",
        margin: "18px 0",
        flex: "1 1 0px",
        display: "flex",
        flexDirection: "row-reverse"
    },
    socialMedia: {
        width: "62px",
        height: "62px",
        marginRight: "33px"
    },
    contact: {
        flex: "0 0 580px",
        fontSize: "16px",
        textAlign: "left",
        color: "white",
        fontFamily: "Calibri Light"
    },
    link: {
        fontSize: "16px",
        color: "white",
        fontFamily: "Calibri Light",
        textDecorattion: "none"
    }
}

export default class Footer extends Component {
    static propTypes = {
        socialMedias: PropTypes.arrayOf(PropTypes.shape({
            icon: PropTypes.string.isRequired,
            link: PropTypes.string.isRequired
        })).isRequired
    }

    renderMedia(media, index) {
        return (
            <li key={"media_" + index} style={styles.socialMedia}>
                <a href={media.link}><img src={media.icon}/></a>
            </li>
        );
    }

    render() {
        let { socialMedias } = this.props;
        return (
            <footer style={styles.footer}>
                <div className="middle-box" style={styles.box}>
                    <ul style={styles.socialMedias}>{socialMedias.map((media, index) => this.renderMedia(media, index))}</ul>
                    <div style={styles.contact}>
                        <p style={styles.email}>Contact Us: <a href="mailto:admin@fspgroup.ca" style={styles.link}>admin@fspgroup.ca</a></p>
                        <p>Copyright @ 2001-2026 FSP All rights reserved</p>
                    </div>
                </div>
            </footer>
        )
    }
}
