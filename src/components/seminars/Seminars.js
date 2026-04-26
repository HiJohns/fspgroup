import React, { Component } from 'react'
import PropTypes from 'prop-types'

const styles = {
    speakers: {
        listStyle: "none",
        padding: "0px",
        display: "flex"
    },
    speaker: {
        flex: "1 1 0px",
        overflow: "hidden"
    },
    speakerFigure: {
        margin: "2rem",
        display: "flex",
        flexDirection: "column",
        height: "278px",
        textAlign: "center"
    },
    speakerImageBox: {
        flex: "0 0 220px",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center"
    },
    speakerImage: {
        maxHeight: "220px",
        minHeight: "220px"
    },
    speakerFigureCaption: {
        margin: "6px"
    },
    events: {
        listStyle: "none"
    },
    size: {
        paddingLeft: "1rem"
    },
    line: {
        lineHeight: "30px"
    },
    featured: {
        textAlign: "center",
        margin: "2rem 0"
    },
    featuredImage: {
        width: "100%",
        height: "auto"
    },
    featuredCaption: {
        fontSize: "1.1rem",
        lineHeight: "1.5"
    }
}

export default class Seminars extends Component {
    static propTypes = {
        presentations: PropTypes.arrayOf(PropTypes.shape({
            link: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            author: PropTypes.string.isRequired,
            size: PropTypes.string.isRequired
        })),
        speakers: PropTypes.arrayOf(PropTypes.shape({
            year: PropTypes.string.isRequired,
            featured: PropTypes.shape({
                image: PropTypes.string.isRequired,
                info: PropTypes.string.isRequired
            }),
            list: PropTypes.arrayOf(PropTypes.shape({
                image: PropTypes.string.isRequired,
                name: PropTypes.string.isRequired,
                info: PropTypes.string.isRequired
            }))
        }))
    }

    renderMaterial(material, index, preIndex) {
        return (
            <li key={"material_" + preIndex + "_" + index}>
                <p style={styles.line}><a href={material.link}>{material.title}</a><span style={styles.size}>({material.size})</span></p>
                <p style={styles.line}>{material.author}</p>
            </li>
        )
    }

    renderPresentation(pre, index) {
        return (
            <li key={"pre_" + index}>
                <h4>{pre.event}</h4>
                <ul>{pre.materials.map((material, i) => this.renderMaterial(material, i, index))}</ul>
            </li>
        )
    }

    renderSpeaker(speaker, index, year) {
        return (
            <li key={"speaker_" + index} style={styles.speaker}>
                <figure style={styles.speakerFigure}>
                    <div style={styles.speakerImageBox}>
                        <img src={`dist/images/speakers/${year}/${speaker.image}`} style={styles.speakerImage}/>
                    </div>
                    <figcaption className="text" style={styles.speakerFigureCaption}>{speaker.name}</figcaption>
                    {speaker.info.split('<br>').map((segment, index) => <small className="text" key={'small_'+index}>{segment}</small>)}
                </figure>
            </li>
        )
    }

    renderGroup(group, index) {
        return (
            <section key={`group_${index}`}>
                <h2>{group.year} Speakers</h2>
                {group.featured && this.renderFeatured(group.featured, group.year)}
                {this.renderSpeakers(group.list, group.year)}
            </section>
        )
    }

    renderFeatured(featured, year) {
        return (
            <div style={styles.featured}>
                <img 
                    src={`dist/images/speakers/${year}/${featured.image}`} 
                    style={styles.featuredImage}
                    alt={featured.name}
                />
                <figcaption className="text" style={styles.featuredCaption}>
                    {featured.info}
                </figcaption>
            </div>
        )
    }

    renderSpeakers(speakers, year) {
        let result = [], perRow = 3;
        for (let i = 0; i < speakers.length; i += perRow) {
            result.push(<ul style={styles.speakers}>{speakers.slice(i, i+perRow).map((speaker, index) => this.renderSpeaker(speaker, index, year))}</ul>);
        }

        return result;
    }

    render() {
        let { presentations, speakers } = this.props;
        
        return (
            <section className="main">
                {speakers.map((group, index) => this.renderGroup(group, index))}
                <section>
                    <h2>Presentations</h2>
                    <ul style={styles.events}>{presentations.map((pre, index) => this.renderPresentation(pre, index))}</ul>
                </section>
            </section>
        )
    }
}
