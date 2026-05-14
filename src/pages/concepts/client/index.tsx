import React from 'react';

import Anchor from '../../../partials/anchor';
import Name from '../../../partials/name';
import Paragraph from '../../../partials/paragraph';

const ConceptClientPage : React.FC<{className? : string}> = ({ className }) => (
    <article className={ `concept-client-page ${ className }` }>
        <h1>Client</h1>
        <BodyCurrent />
    </article>
);

export default ConceptClientPage;

function BodyCurrent() {
    return (
        <div>
            <h3>What is a client?</h3>
            <div>
                <Paragraph>
                    A client is any resource { "(" }i.e. component, service, directives etc.{ ")" }  consuming the <Name />. A client consumes this context by:
                    <ul>
                        <li>either injecting the <Name/>'s <code>ContextService</code> into a resource and accessing the context through service as needed. More on this <Anchor to="/overview/direct-usage">here.</Anchor></li>
                        <li>or streaming it through a <Name />'s <code>StreamingService</code> instance. More on this <Anchor to="/overwiew/streaming">here.</Anchor></li>
                    </ul>
                </Paragraph>
                <Paragraph>
                    Please see specific code examples respectively in:
                    <ol>
                        <li><Anchor to="/getting-started#direct-usage">Direct Usage</Anchor></li>
                        <li><Anchor to="/getting-started#streaming">Joining the <Name /> Change Stream</Anchor></li>
                    </ol>
                </Paragraph>
            </div>
        </div>
    );
}
