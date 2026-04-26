import React, { Component } from 'react'
import PropTypes from 'prop-types'

const styles = {
    platinum: {
        maxHeight: '80px',
        lineHeight: '60px'
    },
    platinumImg: {
        maxWidth: '176px',
        maxHeight: '60px'
    },
    gold: {
        maxHeight: '60px',
        lineHeight: '45px'
    },
    goldImg: {
        maxWidth: '127px',
        maxHeight: '45px'
    },
    venue: {
        maxHeight: '80px',
        lineHeight: '60px'
    },
    venueImg: {
        maxWidth: '176px',
        maxHeight: '60px'
    },
    container: {
        left: "0px",
        top: "320px",
        width: "100%",
        marginTop: "-26px",
        paddingBottom: "20px",
        overflow: "hidden"
    },
    containerCenter: {
        width: "1500px",
        margin: "0 auto"
    },
    box: {
        float: "right",
        width: "280px",
        textAlign: "center",
        background: "white",
        boxShadow: "0px 5px 10px 5px rgba(0,0,0,0.15)"
    },
    title: {
        margin: "10px",
        fontSize: "24px",
        fontFamily: "Calibri Regular",
        fontWeight: "bold",
        color: "rgba(102,102,102,1)",
        letterSpacing: "0px"
    },
    sponsorBox: {
        margin: '1rem 0'
    },
    theme: {
        maxHeight: '100px',
        minHeight: '70px'
    },
    themeImg: {
        maxWidth: '245px'
    },
    level: {
        margin: "18px 0"
    }
}

export default class Sponsors extends Component {
    static propTypes = {
        sponsors: PropTypes.arrayOf(PropTypes.shape({
            icon: PropTypes.string.isRequired,
            link: PropTypes.string.isRequired,
            level: PropTypes.string.isRequired
        })).isRequired,
    }

    renderSponsors() {
        let { sponsors } = this.props, levels = [ 'theme', 'platinum', 'gold', 'venue' ];

        return levels.map((level, index) => {
            let theLevel = sponsors.filter(sponsor => sponsor.level === level);
            return (
                <ul className="clear" style={styles.level} key={"level_"+index}>
                    {theLevel.map((sponsor, si) => (
                        <li key={'sponsor_'+index+'_' +si} style={styles[sponsor.level]}>
                            <a href={sponsor.link}>
                                <img src={sponsor.icon} style={styles[sponsor.level + 'Img']}/>
                            </a>
                        </li>
                    ))}
                </ul>
            )
        });

        return (
            <li key={"sponsor_"+index} style={styles.sponsorBox}>
                <a href={sponsor.link}>
                    <img src={sponsor.icon} className={styles[sponsor.level]}/>
                </a>
            </li>
        )
    }

    render() {
        return (
            <div className="sponsors" style={styles.container}>
                <div style={styles.containerCenter}>
                    <div style={styles.box}>
                        <h2 style={styles.title}>Sponsors</h2>
                        {this.renderSponsors()}
                    </div>
                </div>
            </div>
        )
    }
}
