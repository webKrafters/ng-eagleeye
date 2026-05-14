import React from 'react';

import Anchor from '../../partials/anchor';
import CodeBlock from '../../partials/code-block';
import ListItem from '../../partials/list-item';
import Name from '../../partials/name';
import Paragraph from '../../partials/paragraph';

const OverviewPage : React.FC<{className? : string}> = ({ className }) => (
    <article className={ `overview-page ${ className }` }>
        <h1><Name /> Context Overview</h1>
        <Paragraph><Name /> Context is a streamable context based state management whose state is pluggable. A pluggable state is an instance of the <Anchor to="https://auto-immutable.js.org/intro">AutoImmutableJS</Anchor> class. Multiple systems and applications running any of the <Anchor to="https://eagleeye.org.js">Eagle Eye</Anchor> based <Anchor to="https://www.npmjs.com/package/@webkrafters/eagleeye?activeTab=readme#usage">state management systems</Anchor> can share a single pluggable state instance.</Paragraph>
        <Paragraph><Name /> Context Service makes the afore-described context available to Angular systems and applications. This service runs alongside the main program with an express objective to manage the program state in an easy secure no-frills manner.</Paragraph>
        <h3>Four General APIs</h3>
        <Paragraph id="cache">
            <h4>1. cache</h4>
            <ListItem><div>is a property providing access to the underlying immutable cache managed by this <Name /> instance.</div></ListItem>
        </Paragraph>
        <Paragraph id="closed">
            <h4>2. closed</h4>
            <ListItem><div>is a boolean property confirming that the context is still active.</div></ListItem>
            <ListItem><div>Observe the <code>closing</code> event of this context's store API to be notified right before this context's deactivation occurs. Like so: <CodeBlock isInline>{ `this.contextService.store.subscribe( 'closing', () => void )` }</CodeBlock></div></ListItem>
            <ListItem><div>Please see the <Anchor to="/overview#dispose">dispose</Anchor> method below to expeiently deactivate this context.</div></ListItem>
        </Paragraph>
        <Paragraph id="dispose">
            <h4>3. dispose</h4>
            <ListItem><div>is a method to directly deactivate this context.</div></ListItem>
            <ListItem><div>Context deactivation is permanent.</div></ListItem>
            <ListItem><div>The context's <Anchor to="/overview#closed"><code>closed</code></Anchor> property confirms this status.</div></ListItem>
        </Paragraph>
        <Paragraph id="store">
            <h4>4. store</h4>
            <ListItem><div>provides an interface by which to directly interact with the internal facilities of this context.</div></ListItem>
            <ListItem><div>See more on using this store directly <Anchor to="/overview/direct-usage">here.</Anchor></div></ListItem>
            <ListItem><div>Where real-time state reactivity is required, such as in a component, context streaming { "(" }i.e. streaming the context's store{ ")" } is preferable to direct context store usage. See More on streaming <Anchor to="/overview/streaming">here</Anchor>.</div></ListItem>
        </Paragraph>
        <Paragraph style={{ borderTop: '1px solid #888', marginTop: '1rem', textAlign: 'right' }}>
            Next: <Anchor to="/overview/create">Creating an <Name /> Context Service</Anchor>
        </Paragraph>
    </article>
);

export default OverviewPage;
