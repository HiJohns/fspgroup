import React, { Component } from 'react'
import PropTypes from 'prop-types'

const styles = {
    diamond: {
        width: "245px"
    },
    gold: {
        width: "178px"
    },
    premium: {
        width: "178px"
    },
    silver: {
        width: "113px"
    },
    regular: {
        width: "90px"
    },
    venue: {
        width: "178px"
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
        maxWidth: '245px'
    },
    diamond: {
        maxWidth: '196px'
    },
    gold: {
        maxWidth: '157px'
    },
    exhibitor: {
        maxWidth: '125px'
    },
    venue: {
        maxWidth: '196px'
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
        let { sponsors } = this.props, levels = [ 'theme', 'premium', 'exhibitor', 'venue' ];

        return levels.map((level, index) => {
            let theLevel = sponsors.filter(sponsor => sponsor.level === level);
            return (
                <ul className="clear" style={styles.level} key={"level_"+index}>
                    {theLevel.map((sponsor, si) => (
                        <li key={'sponsor_'+index+'_' +si} style={styles.sponsorBox}>
                            <a href={sponsor.link}>
                                <img src={sponsor.icon} style={styles[sponsor.level]}/>
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
