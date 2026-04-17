import React from 'react';

import Anchor from '../../../partials/anchor';
import Name from '../../../partials/name';

const ConceptChannelPage : React.FC<{className? : string}> = ({ className }) => (
    <article className={ `concept-channel-page ${ className }` }>
        <h1>Change Stream Channel</h1>
        <h3>What is a change stream channel?</h3>
        <p>Where an <Name /> <code>store</code> is the client's portal into the context's underlying state, an <Name /> channel is a direct observable real-time store dedicated to monitoring a specific subset of the state.</p>
        <h4>Obtaining a channel</h4>
        <p>Obtain a channel by joining a stream. See how to do this <Anchor to="/getting-started#streaming">here</Anchor>.</p>
        <p>A channel exposes <strong>3</strong> properties for interacting with the state manager. Namely:</p>
        <p>
            <strong id="data" style={{ marginRight: '0.5rem' }}>1.</strong><strong style={{ marginRight: '0.25rem' }}>data: </strong> 
            which is an object holding resolved state slices as declared in the selector map. <Anchor to="/concepts/selector-map#selector-map-example">See selector map to channel data example here</Anchor>
        </p>
        <p>
            <strong style={{ marginRight: '0.5rem' }}>2.</strong><strong style={{ marginRight: '0.25rem' }}><Anchor to="/concepts/channel/resetstate">resetState</Anchor>: </strong>
            <code>(propertyPaths?: Array{ '<' }string{ '>' }) ={ '>' } void // resets slices of state referenced by the property paths to their initial values.</code>
        </p>
        <p>
            <strong style={{ marginRight: '0.5rem' }}>3.</strong><strong style={{ marginRight: '0.25rem' }}><Anchor to="/concepts/channel/setstate">setState</Anchor>: </strong>
            <code>(changes: Changes{ '<' }State{ '>' }) ={ '>' } void // merges only new/changed state slices.</code>
        </p>
        <p>A channel also exposes <strong>3</strong> properties for channel related communication. Namely:</p>
        <p>
            <strong style={{ marginRight: '0.5rem' }}>1.</strong><strong style={{ marginRight: '0.25rem' }}>addListener: </strong>
            for subscribing to <strong>data-changed</strong> and <strong>stream-ending</strong> events of a stream channel.
            <ol>
                <li><code>('data-changed', () ={ '>' } void) ={ '>' } void // to be called whenever channel.data changes.</code></li>
                <li><code>('stream-ending', (reason : string) ={ '>' } void) ={ '>' } void // to to be called before closing this channel.</code></li>
            </ol>
        </p>
        <p>
            <strong style={{ marginRight: '0.5rem' }}>2.</strong><strong style={{ marginRight: '0.25rem' }}>removeListener: </strong>
            for unsubscribing from <strong>data-changed</strong> and <strong>stream-ending</strong> events of a stream channel.
            <ol>
                <li><code>('data-changed', { '<' }subscribed fn{ '>' }) ={ '>' } void</code></li>
                <li><code>('stream-ending', { '<' }subscribed fn{ '>' }) ={ '>' } void</code></li>
            </ol>
        </p>
        <p>
            <strong style={{ marginRight: '0.5rem' }}>3.</strong><strong style={{ marginRight: '0.25rem' }}>endStream: </strong>
            <code>() ={ '>' } void // terminates this channel's ability to continue participating in the stream.</code>
        </p>
        <p>A channel also exposes <strong>4</strong> properties for communicating its own internal state. Namely:</p>
        <p>
            <strong style={{ marginRight: '0.5rem' }}>1.</strong><strong style={{ marginRight: '0.25rem' }}>streaming: </strong>
            a read-only property communicating is currently connected to the stream.
        </p>
        <p>
            <strong style={{ marginRight: '0.5rem' }}>2.</strong><strong style={{ marginRight: '0.25rem' }}>closed: </strong>
            <ol>
                <li>a read-only property communicating that this channel has been formally removed from the stream.</li>
                <li>once a channel is in this phase, it remains permanently closed.</li>
            </ol>
        </p>
        <p>
            <strong style={{ marginRight: '0.5rem' }}>3.</strong><strong style={{ marginRight: '0.25rem' }}>phase: </strong>
            a read-only property communicating any of the various phases currently inhabited by this channel at any given time.
        </p>
        <p>
            <strong style={{ marginRight: '0.5rem' }}>4.</strong><strong style={{ marginRight: '0.25rem' }}><Anchor to="/concepts/selector-map">selectorMap:</Anchor> </strong>
            <ol>
                <li>a writeable property through which a channel's observed slices of state can be updated.</li>
                <li>updating this property automatically updates the contents of the <code>channel.data</code> property and issuing this channel's <strong><code>data-changed</code></strong> event.</li>
            </ol>
        </p>
    </article>
);

export default ConceptChannelPage;
