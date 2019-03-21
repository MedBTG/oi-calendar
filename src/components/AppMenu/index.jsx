import React, { Component } from 'react'
import { Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { PropTypes } from 'prop-types'

export default class AppMenu extends Component {
	constructor(props) {
		super(props)
		this.state = {
			activeKey: props.page,
		}

		this.bound = ['onSelect'].reduce((acc, d) => {
			acc[d] = this[d].bind(this)
			return acc
		}, {})
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ activeKey: nextProps.page })
	}

	onSelect(eventKey) {
		switch (eventKey) {
			case 'settings':
				this.setState({ activeKey: 'settings' })
				break
			case 'public':
				this.setState({ activeKey: 'public' })
				break
			case 'all':
				this.setState({ activeKey: 'all' })
				break
			case 'files':
				this.setState({ activeKey: 'files' })
				break
			default:
				console.warn('invalid menu item ', eventKey)
				break
		}
	}

	isRoot(match, location) {
		if (!match) {
			return false
		}
		console.log('isRoot', match, match.isExact)
		return match.isExact
	}

	render() {
		const { onSelect } = this.bound
		const { username, signedIn } = this.props
		const hasPublicCalendar = !!username

		return (
			signedIn && (
				<div className="App-menu">
					<Nav variant="pills" onSelect={onSelect}>
						<Nav.Item>
							<Nav.Link
								eventKey="all"
								as={NavLink}
								isActive={this.isRoot}
								to={{ pathname: '/' }}
								exact
							>
								Events
							</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link
								eventKey="public"
								as={NavLink}
								disabled={!hasPublicCalendar}
								to={{
									pathname: '/public',
									search: `?c=public@${username}`,
								}}
							>
								Public
							</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link eventKey="settings" as={NavLink} to="settings">
								Settings
							</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link eventKey="files" as={NavLink} to="files">
								Files
							</Nav.Link>
						</Nav.Item>
					</Nav>
				</div>
			)
		)
	}
}

AppMenu.propTypes = {
	username: PropTypes.string,
	signedIn: PropTypes.bool.isRequired,
}
