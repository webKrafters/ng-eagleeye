import React from 'react';

import Alert from '../partials/alert';
import Anchor from '../partials/anchor';
import ListItem from '../partials/list-item';
import Name from '../partials/name';
import Paragraph from '../partials/paragraph';

const SUBSCRIBE_CLOSING_SAMPLE =
`stateManager.store.subscribe(
    'closing', ( shutDownReason : string ) => void
); // => VoidFunction`

const SUBSCRIBE_CHANGE_SAMPLE =
`stateManager.store.subscribe(
    'data-updated', (
        changes : Changes<State>,
        changedPaths : Array<Array<string>>,
        netChanges : Partial<State>,
        mayHaveChangesAt : (tokenizedPath : string[]) => boolean
    ) => void
); // => VoidFunction`

const ExternalAccessPage : React.FC<{className : string}> = ({ className }) => (
    <article className={ `external-access-page ${ className }` }>
        <h1>Global Access</h1>
        <Paragraph>The <Name /> store manager is equipped with a <code>store</code> property which is accessible globally.</Paragraph>
        <h3 id="global-store">How do I access this global store?</h3>
        <Paragraph>This is done by simply utilizing the <Name /> store manager instance <code>store</code> property.</Paragraph>
        <Paragraph>For global access to the <Name /> store manager's data, the store property exposes <strong>4</strong> methods. Namely:</Paragraph>
        <ol id="external-apis">
            <li><strong><code>getState</code>:</strong> Provides a static snapshot of the current state. May accept a list of property paths to target properties within the state to fetch and return</li>
            <li><strong><code>resetState</code>:</strong> Please see descriptions in the <Anchor to="/concepts/channel/resetstate"><code>channel.resetState</code></Anchor> page. May accept a parameterless invocation resulting in a noop.</li>
            <li><strong><code>setState</code>:</strong> Please see descriptions in the <Anchor to="/concepts/channel/setstate"><code>channel.setState</code></Anchor> page.</li>
            <li >
                <strong><code>subscribe</code></strong><br />
                <ListItem><div>Provides the API for manual subscription to the <Name />'s state change and close events.</div></ListItem>
                <ListItem><div>Returns a parameterless void function - the <b><u>unsubcriber</u></b>.</div></ListItem>
                <ListItem><div id="subscribing-to-context-disposal">Accepts a <b>"closing"</b> event type and an observer function to be called before the <Name /> instance deactivation.</div></ListItem>
                <ListItem><div id="subscribing-to-context-state-update">Accepts a <b>"data-updated"</b> event type and an observer function for state changes.</div></ListItem>
                <b style={{ display: 'inline-block', marginTop: '1rem' }}>
                    Context close event subscription
                </b>
                <pre>{ SUBSCRIBE_CLOSING_SAMPLE }</pre>
                <b>Data change event subscription</b>
                <pre>{ SUBSCRIBE_CHANGE_SAMPLE }</pre>
                <b>More on <u>"data-updated"</u> event listener params</b><br />
                <ol>
                    <li><u>changes:</u> an object or array holding the original change request payload(s).</li>
                    <li><u>changedPaths:</u> an array of tokenized property paths belonging to state properties changed during this request.</li>
                    <li><u>netChanges:</u> an object of the final state of all properties in state changed.</li>
                    <li><u>mayHaveChangesAt:</u> a function to confirm that a given property path is among the new changes. This path is to be supplied as a tokenized string (i.e. supply <code>['a', 'b', 'c', '0', 'r']</code> for <code>'a.b.c[0].r'</code>).</li>
                </ol>
            </li>
        </ol>
        <Alert title="Pro Tips">
            <Paragraph>State references are always snapshots of the state at the time of access. In essence, the state returned by <code>stateManager.store.getState(...)</code> are not affected by subsequent updates to the store's state. Any updates to this acquired state never affects the <Name />'s state. So therefore, the <strong>4</strong> considerations:</Paragraph>
            <ListItem><div>use only the <code>stateManager.store.setState(...)</code> to update the <Name /> state manager's internal store.</div></ListItem>
            <ListItem><div><code>stateManager.store.getState(...)</code> must be used to obtain the current state value. Please remember to join this storeManager's <Anchor to="/getting-started/#streaming">change stream</Anchor> instead if real-time change monitoring is what you need.</div></ListItem>
            <ListItem><div>use your <code>stateManager.store.subscribe(...)</code> to manually subscribe to state changes and refresh your current state value in real-time.</div></ListItem>
            <ListItem><div>use the <code>unsubscriber</code> returned by your <Name /> instance store's <code>subscribe(...)</code> to unsubscribe from the store when needed.</div></ListItem>
        </Alert>
    </article>
);

export default ExternalAccessPage;
