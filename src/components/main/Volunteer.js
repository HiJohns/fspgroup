import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Volunteer extends Component {
    render() {
        return (
            <section className="main">
                <h2>Volunteer</h2>
                <div>
                    <p>Wish to volunteer? Drop us a note at <a href="mailto:admin@fspgroup.ca">admin@fspgroup.ca</a>.</p>
                    <p>Like many other user groups, the FSP is always looking for volunteers to assist with our bi-annual seminars. As a volunteer, your responsibilities may require you to assist in various FSP activities, such as:</p>
                    <h3>Seminar</h3>
                    <ul>
                        <li>Posting signs</li>
                        <li>Greeting and directing attendees</li>
                        <li>Staffing registration tables</li>
                        <li>Introducing speakers</li>
                        <li>Assisting in draws</li>
                        <li>Ensuring attendee needs are met</li>
                        <li>Assisting in end of day cleanup</li>
                    </ul>
                    <h3>On-Going</h3>
                    <ul>
                        <li>Reviewing and recommending improvements to other committee members, including:</li>
                        <ul>
                            <li>FSP format</li>
                            <li>Website content</li>
                            <li>Communications</li>
                            <li>New member recruitment</li>
                        </ul>
                    </ul>
                    <p>So, if you wish to contribute to the on-going success of the FSP, please contact us via e-mail.</p>
                </div>
            </section>
        )
    }
}
