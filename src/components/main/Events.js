import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Slider from 'react-slick'
import jQuery from 'jquery'

const sliderOptions = {
    dots: true,
    arrows: true
}

const styles = {
    container: {
        margin: "1rem 0 10px 1rem",
        width: "90%",
        height: "500px",
        boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 10px 5px",
        padding: "1rem",
        borderRadius: "4px"
    },
    image: {
        margin: "0 auto",
        maxHeight: "450px"
    }
}

export default class Events extends Component {
    static propTypes = {
        images: PropTypes.arrayOf(PropTypes.string).isRequired
    }

    componentDidMount() {
        // hack! css just cannot match slick-prev for unknown reason
        jQuery('.slick-prev').css('left', '14px').css('zIndex', '1000');
    }

    renderImage(image, index) {
        return (
            <div key={'image_'+index}>
                <img style={styles.image} src={image}/>
            </div>
        )
    }

    render() {
        let { images } = this.props;
        return (
            <section className="main">
                <h2>Events</h2>
                <div className="container" style={styles.container}>
                    <Slider {...sliderOptions}>{images.map((image, index) => this.renderImage(image, index))}</Slider>
                </div>
            </section>
        )
    }
}
