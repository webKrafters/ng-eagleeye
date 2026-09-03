import type { Props } from '../anchor';

import React, { useContext } from 'react';

import BrowserStatus from './with-status/browser';
import ServerStatus from './with-status/server';

import Anchor from '../anchor';
import Name from '../name';

import './style.scss';
import { ValueCtx } from '../../contexts/version-of-interest';

const WithStatus = typeof window === 'undefined' ? ServerStatus : BrowserStatus;

let NavLink : React.FC<Props> = props => (
	<WithStatus { ...props }>
		<Anchor { ...props } />
	</WithStatus>
);

const createIndentedNavLink = ( indentClassNum : 1|2|3|4 ) : React.FC<Props> => ({ className, ...props }) => (
	<WithStatus { ...props }>
		<Anchor className={ `indent${ indentClassNum }${ className ? ` ${ className }` : '' }` } { ...props } />
	</WithStatus>
);

const NavLinkIndent1 = createIndentedNavLink( 1 );
const NavLinkIndent2 = createIndentedNavLink( 2 );
const NavLinkIndent3 = createIndentedNavLink( 3 );
const NavLinkIndent4 = createIndentedNavLink( 4 );


const Component : React.FC = () => {
	const semver = useContext( ValueCtx );
	return (
		<nav className="site-nav">
			<NavLink to="/">Introduction</NavLink>
			<NavLink to="/getting-started">Getting Started</NavLink>
			<NavLink className="group-link" to="/overview"><Name /> Overview</NavLink>
			<NavLinkIndent1 to="/overview/create">Creating an <Name /> Context Service</NavLinkIndent1>
			<NavLinkIndent1 to="/overview/direct-usage">Consuming Context { '(' }the Direct Method{ ')' }</NavLinkIndent1>
			<NavLinkIndent1 to="/overview/streaming">Consuming Context { '(' }Using Streams{ ')' }</NavLinkIndent1>
			<NavLink className="group-link" to="/concepts/client">Concepts</NavLink>
			{ semver[ 0 ] === 1
				? ( <NavLinkIndent1 to="/concepts/client">Client</NavLinkIndent1> )
				: (
					<>
						<NavLinkIndent1 className="group-link" to="/concepts/client">Client</NavLinkIndent1>
						<NavLinkIndent2 to="/concepts/client#id"><b>Identifier</b></NavLinkIndent2>
					</>
				)
			}
			<NavLinkIndent1 to="/concepts/prehooks">Prehooks</NavLinkIndent1>
			<NavLinkIndent1 className="group-link" to="/concepts/property-path">Property Path</NavLinkIndent1>
			<NavLinkIndent2 to="/concepts/property-path#fullstate-selectorkey"><b>@@STATE</b></NavLinkIndent2>
			<NavLinkIndent1 to="/concepts/selector-map">Selector Map</NavLinkIndent1>
			<NavLinkIndent1 to="/concepts/storage">Storage</NavLinkIndent1>
			<NavLinkIndent1 className="group-link" to="/concepts/store">Store</NavLinkIndent1>
			<NavLinkIndent2 to="/concepts/store/resetstate">Reset State</NavLinkIndent2>
			<NavLinkIndent2 className="group-link" to="/concepts/store/setstate">Set State</NavLinkIndent2>
			<NavLinkIndent3 to="/concepts/store/setstate#batched-update">Batched Update</NavLinkIndent3>
			<NavLinkIndent3 to="/concepts/store/setstate#indexing">Array Indexing</NavLinkIndent3>
			<NavLinkIndent3 className="group-link" to="/concepts/store/setstate/tags">Using Tag Commands</NavLinkIndent3>
			<NavLinkIndent4 to="/concepts/store/setstate/tags/clear"><b>@@CLEAR</b> Usage Example</NavLinkIndent4>
			<NavLinkIndent4 to="/concepts/store/setstate/tags/delete"><b>@@DELETE</b> Usage Example</NavLinkIndent4>
			<NavLinkIndent4 to="/concepts/store/setstate/tags/move"><b>@@MOVE</b> Usage Example</NavLinkIndent4>
			<NavLinkIndent4 to="/concepts/store/setstate/tags/push"><b>@@PUSH</b> Usage Example</NavLinkIndent4>
			<NavLinkIndent4 to="/concepts/store/setstate/tags/replace"><b>@@REPLACE</b> Usage Example</NavLinkIndent4>
			<NavLinkIndent4 to="/concepts/store/setstate/tags/set"><b>@@SET</b> Usage Example</NavLinkIndent4>
			<NavLinkIndent4 to="/concepts/store/setstate/tags/splice"><b>@@SPLICE</b> Usage Example</NavLinkIndent4>
			<NavLinkIndent4 to="/concepts/store/setstate/tags/order-of-operations">Combination Usage Example</NavLinkIndent4>
			<NavLink className="group-link" to="/history/features">What's Changed?</NavLink>
		</nav>
	);
};

Component.displayName = 'Site.Nav';

export default Component;
