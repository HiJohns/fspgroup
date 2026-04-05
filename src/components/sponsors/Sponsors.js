import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Slider from 'react-slick'

const styles = {
    box: {
        width: "880px",
        margin: "100px auto",
        boxShadow: "0px 5px 10px 5px rgba(0,0,0,0.15)",
        border: "1px dotted #999",
        padding: "1rem 0 42px"
    },
    theme: {
        width: "332px"
    },
    platinum: {
        width: "235px"
    },
    gold: {
        width: "200px"
    },
    venue: {
        width: "235px"
    },
    themeLabel: {
        textAlign: 'center',
        fontSize: "30px",
        color: "#003366",
        fontWeight: "800",
        textTransform: "uppercase",
        textShadow: "2px 2px 5px rgba(0, 0, 0, 05:)",
        letterSpacing: "1px",
        backgroundColor: "#F0F8FF",
        padding: "5px"
    },
    platinumLabel: {
        textAlign: 'center',
        fontSize: "24px",
        color: "#4B0082",
        fontWeight: "700",
        textTransform: "capitalize",
        textShadow: "1px 1px 3px rgba(0, 0, 0, 03:)",
        letterSpacing: "05px:",
        backgroundColor: "#E6E6FA",
        padding: "5px"
    },
    goldLabel: {
        textAlign: 'center',
        fontSize: "22px",
        color: "#8A6D1D",
        fontWeight: "600",
        textTransform: "capitalize",
        textShadow: "1px 1px 2px rgba(0, 0, 0, 02:)",
        letterSpacing: "normal",
        backgroundColor: "#FCF9E3",
        padding: "5px"
    },
    venueLabel: {
        textAlign: 'center',
        fontSize: "24px",
        color: "#004c4c",
        fontWeight: "600",
        textTransform: "capitalize",
        textShadow: "1px 1px 2px rgba(0, 0, 0, 02:)",
        letterSpacing: "normal",
        backgroundColor: "#e5fafa",
        padding: "5px"
    },
    boxSponsors: {
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        margin: "0 2rem"
    },
    spacer: {
        width: "120px"
    },
    sponsorContainer: {
        margin: "1rem auto 0",
        width: "600px",
        height: "150px"
    },
    venueContainer: {
        textAlign: 'center',
        margin: "1rem auto 0",
        width: "600px",
        height: "150px"
    },
    regularImage: {
        margin: "0 auto",
        maxHeight: "100px",
        minHeight: "35px",
        maxWidth: "160px"
    }
}

const sliderOptions = {
    dots: true,
    autoplay: true,
    arrows: true
}

const label = {
    theme: [ 'theme.png', 'themeR.png' ],
    platinum: [ 'platinum.png', 'platinumR.png' ],
    gold: [ 'gold.png', 'goldR.png' ],
}

export default class Sponsors extends Component {
    static propTypes = {
        data: PropTypes.arrayOf(PropTypes.shape({
            icon: PropTypes.string.isRequired,
            link: PropTypes.string.isRequired,
            level: PropTypes.oneOf(['theme', 'platinum', 'gold', 'venue']).isRequired
        }))
    }

    renderImage(sponsor, index) {
        return (
            <a key={'image_'+index} href={sponsor.link}>
                <img src={sponsor.icon} style={styles.regularImage}/>
            </a>
        )
    }

    renderSponsors() {
        let { data } = this.props;

        let boxes = [ 'theme', 'platinum', 'gold', 'venue' ].map((level, index) => {
            let config = label[level];
            let list = data
                .filter(rec => rec.level === level)
                .map((sponsor, index) => <a key={`sponsor_${sponsor.level}_${index}`} href={sponsor.link}><img style={styles[sponsor.level]} src={sponsor.icon}/></a>),
                inserted = [];

            list.forEach((rec, index) => {
                if (index > 0) inserted.push(<div style={styles.spacer} key={"index_"+index}/>)
                inserted.push(rec);
            });
                
            return (
                <div style={styles.box} key={'sponsor_box_' + index}>
                    <h4 style={styles[level + 'Label']}>{level.replace(/^\w/, s => s.toUpperCase())}</h4>
                    <div style={styles.boxSponsors}> {inserted} </div>
                </div>
            )
        });

        return boxes;
    }

    render() {
        return (
            <section className="main">
                {this.renderSponsors()}
            </section>
        )
    }
}
