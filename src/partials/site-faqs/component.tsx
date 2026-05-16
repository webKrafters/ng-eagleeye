import React from 'react';

import Anchor from '../anchor';

import './style.scss';

const Component : React.FC = () => (
    <nav className="site-faqs">
        <Anchor to="/getting-started#install">Installation</Anchor>
        <Anchor to="/concepts/store/setstate">Is it true that the state can never be mutated?</Anchor>
		<Anchor to="/concepts/property-path#fullstate-selectorkey">About the <strong><code>@@STATE</code></strong> keyword.</Anchor>
        <Anchor to="/concepts/store/setstate#indexing">Can I use negative array indexing?</Anchor>
		<Anchor to="/overview/create#global-provision">How to make context <strong>globally</strong> injectable.</Anchor>
        <Anchor to="/overview/create#limited-provision">How to make context injectable within a limited <strong>scope</strong>.</Anchor>
        <Anchor to="/overview/streaming">Can I stream my context updates in realtime? Yes!</Anchor>
        <Anchor to="/overview/streaming#attention">Are stream data fields Angular Signals?</Anchor>
        <Anchor to="/concepts/store#data">Only stream data fields are Angular Signals OOB.</Anchor>
        <Anchor to="/overview/create#referencing">Tell me more on <strong>service referencing</strong> and implications.</Anchor>
        <Anchor to="/concepts/store/setstate">How to set state.</Anchor>
		<Anchor to="/concepts/store/setstate">Why not use the spread operator for incoming state?</Anchor>
		<Anchor to="/concepts/store/setstate#indexing">How do I update my array exactly at a specific index?</Anchor>
        <Anchor to="/concepts/store/setstate/tags">What is the use of <strong>setstate @@ tags</strong>?</Anchor>
        <Anchor to="/concepts/store/setstate#batched-update">How to set multiple states sequentially.</Anchor>
    </nav>
);

export default Component;
