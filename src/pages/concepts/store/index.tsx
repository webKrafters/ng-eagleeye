import React from 'react';

import Anchor from '../../../partials/anchor';
import Name from '../../../partials/name';
import NotePad from '../../../partials/pad/note';
import VersionTabs from '../../../partials/version-tabs';

const ConceptStorePage : React.FC<{className? : string}> = ({ className }) => (
    <article className={ `concept-store-page ${ className }` }>
        <h1>ServiceStream Store</h1>
        <VersionTabs options={[{
            documentation: ( <BodyCurrent2_0 /> ),
            version: [ 2, 0, 0 ]
        }, {
            documentation: ( <BodyCurrent /> ),
            version: [ 1, 0, 0 ]
        }]} />
    </article>
);

function BodyCurrent() { return ( <Template /> ) }

function BodyCurrent2_0() {
    return (
        <Template
            additionalPropsDoc={
                <p>
                    <strong style={{ marginRight: '0.5rem' }}>4.</strong><strong style={{ marginRight: '0.25rem' }}><Anchor to="/concepts/selector-map">selectorMap</Anchor>: </strong>
                    exposes the underlying selector map through which this stream is supplied. The underlying selector map may be updated from this property.
                    <NotePad><b><u>Keep in mind</u>,</b> altering this property will affect all rendered elements of its <Anchor to="/concepts/client">client</Anchor>. Those elements will all begin to reflect output based on the new selector map.</NotePad>
                </p>
            }
            numProperties={ 4 }
        />
    );
}

function Template({
    additionalPropsDoc = null,
    numProperties = 3
} : {
    additionalPropsDoc? : React.ReactNode;
    numProperties? : number;
}) {
    return (
        <>
            <h3>What is the change stream store?</h3>
            <p>An <Name /> change stream <code>store</code>  is the client's portal into the context's underlying state in realtime.</p>
            <p>Access to the change stream store is provided through the <code>StreamService</code> instance.</p>
            <p>The service exposes <strong>{ numProperties }</strong> properties namely:</p>
            <p>
                <strong id="data" style={{ marginRight: '0.5rem' }}>1.</strong><strong style={{ marginRight: '0.25rem' }}>data: </strong> 
                which is an object holding resolved state slices as declared in the selector map. <Anchor to="/concepts/selector-map#selector-map-example">See selector map to store data example here.</Anchor>
                <NotePad>All top data fields of a <code>StreamService</code> are signals. <Anchor to="/overview/streaming#attention">See more...</Anchor> This does not apply to results returned by the <code>store.getState(...)</code> of the <code>ContextService</code>.</NotePad>
            </p>
            <p>
                <strong style={{ marginRight: '0.5rem' }}>2.</strong><strong style={{ marginRight: '0.25rem' }}><Anchor to="/concepts/store/resetstate">resetState</Anchor>: </strong>
                <code>(propertyPaths?: Array&lt;string&gt;) =&gt; void // resets slices of state referenced by the property paths to their initial values.</code>
            </p>
            <p>
                <strong style={{ marginRight: '0.5rem' }}>3.</strong><strong style={{ marginRight: '0.25rem' }}><Anchor to="/concepts/store/setstate">setState</Anchor>: </strong>
                <code>(changes: Changes&lt;State&gt;) =&gt; void // merges only new/changed state slices.</code>
            </p>
            { additionalPropsDoc }
        </>
    );
}

export default ConceptStorePage;
