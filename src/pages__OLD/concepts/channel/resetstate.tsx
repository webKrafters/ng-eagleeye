import React from 'react';

import Anchor from '../../../partials/anchor';

import ListItem from '../../../partials/list-item';
import NotePad from '../../../partials/pad/note';

const ConceptChannelResetStatePage : React.FC<{className? : string}> = ({ className }) => (
    <article className={ `concept-channel-resetstate-page ${ className }` }>
        <h1><code>{ `channel.resetState` }</code> Usage</h1>
        <NotePad>
            <strong>
                The following is also wholly applicable to global <code>store.resetState</code>
            </strong>
        </NotePad>
        <p>
            <strong>Signature:</strong>
            <pre>{ `(propertyPaths?: Array<string>) => void;` }</pre>
        </p>
        <h3>What does the channel resetState method do?</h3>
        <ListItem><p>Resets slices of state to their initial state values as desired.</p></ListItem>
        <ListItem><p>Accepts an array of property paths referencing the desired slices of state to reset.</p></ListItem>
        <ListItem><p>Performs a total state reset when <Anchor to="/concepts/property-path#fullstate-selectorkey"><code>@@STATE</code></Anchor> is present in the property paths array.</p></ListItem>
        <ListItem><p>Resets only state slices referenced by this channel's <Anchor to="/concepts/selector-map">selectorMap</Anchor> property when invoked with 0 arguments.</p></ListItem>
        <ListItem><p>Performs a total state reset when invoked with 0 arguments and <Anchor to="/concepts/property-path#fullstate-selectorkey"><code>@@STATE</code></Anchor> is present in the channel's <Anchor to="/concepts/selector-map">selectorMap</Anchor>.</p></ListItem>
        <ListItem><p>Performs no state reset when invoked with 0 arguments on a channel with no <Anchor to="/concepts/selector-map">selectorMap</Anchor>.</p></ListItem>
    </article>
);

export default ConceptChannelResetStatePage;
