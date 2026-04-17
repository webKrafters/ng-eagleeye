import React from 'react';

import Anchor from '../partials/anchor';
import ListItem from '../partials/list-item';
import Name from '../partials/name';

const ApiPage : React.FC<{className? : string}> = ({ className }) => (
    <article className={ `api-page ${ className }` }>
        <h1>API</h1>
        <div id="cache">
            <h3>cache</h3>
            <ListItem><div>is a property providing access to the underlying immutable cache managed by this <Name /> instance.</div></ListItem>
        </div>
        <div id="closed">
            <h3>closed</h3>
            <ListItem><div>is a boolean property confirming that an <Name /> instance is still active.</div></ListItem>
            <ListItem><div>Use the <Anchor to="/global-access#subscribing-to-disposal">"closing"</Anchor> event to be notified right before an <Name /> instance deactivation.</div></ListItem>
            <ListItem><div>Please see the <Anchor to="/api#dispose">dispose</Anchor> method below.</div></ListItem>
        </div>
        <div id="create">
            <h3>createEagleEye</h3>
            <ListItem><div>is a function accepting three optional parameters { '(' }to wit: the initial state object or an <Anchor to="https://auto-immutable.js.org/getting-started/">AutoImmutable</Anchor> instance bearing this initial state object, the <Anchor to="/concepts/prehooks">prehooks</Anchor> and the <Anchor to="/concepts/storage">storage</Anchor>{ ')' } and returning an <Name /> instance.</div></ListItem>
            <ListItem><div>The <Name /> state manager's store is directly accessible through its <Anchor to="/api#store"><code>store</code></Anchor> api.</div></ListItem>
        </div>
        <div id="dispose">
            <h3>dispose</h3>
            <ListItem><div>is a method of the <Name /> state manager instance for deactivating this instance.</div></ListItem>
            <ListItem><div>A deactivated <Name /> state manager is permanently closed.</div></ListItem>
            <ListItem><div>The state manager's <Anchor to="/api#closed"><code>closed</code></Anchor> property confirms this status.</div></ListItem>
        </div>
        <div id="store">
            <h3>store</h3>
            <ListItem><div>Please visit <Anchor to="/global-access#global-store">global store</Anchor> for detail.</div></ListItem>
        </div>
        <div id="streaming">
            <h3>stream</h3>
            <ListItem><div>is a property of the <Name /> state manager instance which returns a change stream <Anchor to="/concepts/channel">channels</Anchor>.</div></ListItem>
            <ListItem><div>It accepts an optional <Anchor to="/concepts/selector-map">selector map</Anchor> parameter; and returns a change stream <Anchor to="/concepts/channel">channel</Anchor>.</div></ListItem>
            <ListItem><div>A change in any of the referenced state slices within a stream automatically triggers an update of the related <code>channel.data</code> property and a subsequent notification of the subscribers of a particular <Anchor to="concepts/channel">channel</Anchor>.</div></ListItem>
        </div>
    </article>
);

export default ApiPage;
