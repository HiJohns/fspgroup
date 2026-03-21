import React, { Component } from 'react'
import PropTypes from 'prop-types'

const styles = {
    name: {
        width: "200px",
        float: "left"
    },
    company: {
        float: "left"
    },
    member: {
        clear: "both",
        paddingTop: "2px",
        paddingLeft: "10rem",
        lineHeight: "50px",
        display: 'inline-block',
        width: '100%',
        fontSize: "20px"
    },
    group: {
        flex: '1 1 0px'
    },
    groupTitle: {
        margin: "16px 0 5px",
        clear: "both",
        fontSize: "20px",
        flex: "0 0 8rem"
    },
    main: {
        marginTop: "4rem",
        display: 'flex',
        flexDirection: 'column'
    }
}

export default class Executives extends Component {
    static propTypes = {
        list: PropTypes.arrayOf(PropTypes.shape({
            group: PropTypes.string.isRequired,
            members: PropTypes.arrayOf(PropTypes.shape({
                name: PropTypes.string.isRequired,
                company: PropTypes.string.isRequired
            }))
        }))
    }

    renderItem(item, index) {
        return (
            <div style={styles.group} key={"item_"+index}>
                { item.members.map((member, memberIndex) => (
                    <span style={styles.member} key={"member_"+index+"_"+memberIndex} className="text">{member.name} ({member.company})</span>
                )) }
            </div>
        )
    }

    render() {
        let { list } = this.props;
        return (
            <section className="main" style={styles.main}>
                <h2>FSP Committee</h2>
                {list.map((item,index)=>this.renderItem(item, index))}
            </section>
        )
    }
}
