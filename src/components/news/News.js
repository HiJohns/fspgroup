import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Article from '../Article'

const styles = {
    figure: {
        flex: '1 1 0px',
        margin: '0 0.5rem'
    },
    figureLeft: {
        margin: '0 0.5rem 0 0'
    },
    figureRight: {
        margin: '0 0 0 0.5rem'
    },
    figureText: {
        fontSize: '16px'
    },
    figureTitle: {
        color: '#5867fa',
        fontSize: '20px'
    },
    figureImage: {
        maxWidth: '100%'
    },
    highlights: {
        display: 'flex'
    }
}

export default class News extends Component {
    static propTypes = {
        highlights: PropTypes.arrayOf(PropTypes.shape({
            image: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            text: PropTypes.arrayOf(PropTypes.string).isRequired
        })),
        news: PropTypes.shape({
            title: PropTypes.string.isRequired,
            content: PropTypes.string
        })
    }

    renderHighlight(highlight, index, total) {
        console.log('renderHighlight', highlight, index, total)
        let style = Object.assign({}, styles.figure)

        if (index === 0) Object.assign(style, styles.figureLeft)
        if (index === total - 1) Object.assign(style, styles.figureRight)

        return (
            <figure style={style}>
                <img style={styles.figureImage} src={highlight.image}/>
                <figcaption>
                    <h3 style={styles.figureTitle}>{highlight.title}</h3>
                    {highlight.text.map(text => <p style={styles.figureText}>{text}</p>)}
                </figcaption>
            </figure>
        )
    }
    
    render() {
        let { highlights, news } = this.props;
        if (!news) return <div/>;

        let { title, content } = news;
        return (
            <section className="main">
                <h2>Event Highlights</h2>
                <div className="highlights" style={styles.highlights}>
                    {highlights.map((highlight, index) => this.renderHighlight(highlight, index, highlights.length))}
                </div>
               <Article title={title} message={content}/> 
            </section>
        );
    }
}
