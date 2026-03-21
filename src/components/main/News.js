import React, { Component } from 'react'
import PropTypes from 'prop-types'
import renderHtml from '../../helpers/HtmlHelper'

const styles = {
    container: {
        marginTop: "-33rem"
    },
    news: {
        fontSize: "26px",
        fontFamily: "Calibri Light",
        fontWeight: "bold",
        color: "rgba(51,51,51,1)"
    },
    newsBox: {
        display: "flex",
        alignItems: "center"
    },
    more: {
        marginTop: "0px",
        fontSize: "18px",
        fontFamily: "Calibri Light",
        fontWeight: "bold",
        color: "rgba(0,114,188,1)",
        marginLeft: "27px",
        cursor: "pointer"
    }
}

export default class News extends Component {
    static propTypes = {
        data: PropTypes.arrayOf(PropTypes.shape({
            title: PropTypes.string.isRequired,
            link: PropTypes.string.isRequired
        }))
    }

    renderNews(news, index) {
        let title = '<span>'+news.caption+'</span>';
        return (
            <li key={"news_"+index} style={styles.news}>
                <div style={styles.newsBox}>
                    {renderHtml(title)}
                    <a style={styles.more} href={"news.html?id="+news.link}>MORE ...</a>
                </div>
            </li>
        )
    }

    render() {
        let { data } = this.props;

        return (
            <section className="main news" style={styles.container}>
                <h2 className="active">News</h2>
                <ul>{data.map((news, index) => this.renderNews(news, index))}</ul>
            </section>
        )
    }
}
