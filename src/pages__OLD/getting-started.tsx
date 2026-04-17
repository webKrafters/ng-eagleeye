import type { HeadFC } from 'gatsby';

import type { PageProps } from '../contexts/page';

import React from 'react';

import Anchor from '../partials/anchor';
import CodeBlock from '../partials/code-block';
import Name from '../partials/name';
import NotePad from '../partials/pad/note';
import Paragraph from '../partials/paragraph';

const creatorCode =
`import { createEagleEye } from '@webkrafters/eagleeye';
const MyContext = createEagleEye( undefined|{
    prehooks? : Prehooks<T>,
    storage? : IStorage<T>,
    value?: T|AutoImmutable<T>
});

// Alternate:
// ----------
// import { EagleEyeContext } from '@webkrafters/eagleeye';
//
// const MyContent = new EagleEyeContext<T>(
//     Prehooks<T>?,
//     IStorage<T>?,
//     T|AutoImmutable<T>?
// );`

const storeCode =
`const { store } = MyContent;

store.setState({ some: { property: { of: T, ... }, ... }, ... });

store.getState([ 'some.property.of', ... ]);
// => { some: { property: { of : T, ... }, ... }, ... }

store.resetState([ 'some.property.of', ... ]);

store.subscribe( "closing"|"data-updated", callbackFn );
// => unsubscribeFn`

const streamingCode =
`const channel = MyContent.stream({
    year: 'some.property.of.year'
});

// streams externally changes
MyContext.store.setState({
    some: { property: { of: { year: T } } }
});
console.log( channel.data ); // => { year: T }

channel.setState({
    some: { property: { of: { year: TTT } } }
});
console.log( channel.data ); // => { year: TTT }

channel.resetState([ 'some.property.of.year' ]);
console.log( channel.data ); // => { year: undefined }

// streams externally changes
MyContext.store.setState({
    some: { property: { of: { year: TT } } }
});
console.log( channel.data ); // => { year: TT }

// streams externally changes
MyContext.store.resetState([ 'some.property.of.year' ]);
console.log( channel.data ); // => { year: undefined }`;

const GettingStartedPage : React.FC<PageProps> = ({ className }) => (
    <article className={ `getting-started-page ${ className }` }>
        <h1>Getting Started</h1>
        <Paragraph className="snippet-intro" id="install">
            <Name /> is a framework agnostic state manager for javascript/typescript applications. It serves as a single observable location to maintain, update and consume long-lived widely visible state.
        </Paragraph>
        <Paragraph className="snippet-intro" id="install">
            <Name /> may serve as a basis for framework dependent state managers (e.g. the <Anchor to="https://react-observable-context.js.org/">React Observable Context JS</Anchor>).
        </Paragraph>
        <Paragraph className="snippet-box">
            <CodeBlock isInline>
                npm install --save @webkrafters/eagleeye
            </CodeBlock>
        </Paragraph>
        <Paragraph className="snippet-intro" id="create-store">
            <h3>Creating the state manager</h3>
            To obtain a fresh <Name /> instance, just call the <code>createEagleEye(...)</code> function. 
        </Paragraph>
        <Paragraph className="snippet-box">
            <CodeBlock>{ creatorCode }</CodeBlock>
        </Paragraph>
        <div className="snippet-intro" id="provider-usage">
            <h3>Providing the global store reference</h3>
            <Paragraph>Simply accessing the <code>store</code> property of the <Name /> from anywhere on an application makes available the internal store.</Paragraph>
        </div>
        <Paragraph className="snippet-box">
            <CodeBlock>{ storeCode }</CodeBlock>
        </Paragraph>
        <div className="snippet-intro" id="streaming">
            <h3>Joining the change stream</h3>
            <Paragraph>
                <h4>why?</h4>
                A change stream provides a way to attach a <Anchor to="/concepts/client">client</Anchor> to the store manager. Any changes occurring in any parts of the state observed by the attached client are furnished to the client in real time.
            </Paragraph>
            <Paragraph>To join the <Name /> change stream, invoke this <Name /> instance's <code>stream(...)</code> function property to expose the change stream channel.</Paragraph>
            <Paragraph>Through this channel, observations, communications and reactions could be made in real time.</Paragraph>
            <Paragraph><NotePad>To react to stream changes to specific state proprties, supply an argument of a map of property paths to data to observe { '(' }see <Anchor to="/concepts/selector-map">Selector Map</Anchor>{ ')' }</NotePad></Paragraph>
        </div>
        <Paragraph className="snippet-box">
            <CodeBlock>{ streamingCode }</CodeBlock>
        </Paragraph>
    </article>
);

export default GettingStartedPage;

export const Head : HeadFC = () => ( <title>Getting Started</title> );

