import React from 'react';

import Anchor from '../../../partials/anchor';
import Name from '../../../partials/name';
import Paragraph from '../../../partials/paragraph';
import VersionTabs from '../../../partials/version-tabs';
import NotePad from '../../../partials/pad/note';

const ConceptClientPage : React.FC<{className? : string}> = ({ className }) => (
    <article className={ `concept-client-page ${ className }` }>
        <h1>Client</h1>
        <VersionTabs options={[{
            documentation: ( <BodyCurrent2_0 /> ),
            version: [ 2, 0, 0 ]
        }, {
            documentation: ( <BodyCurrent /> ),
            version: [ 1, 0, 0 ]
        }]} />
    </article>
);

export default ConceptClientPage;

function BodyCurrent() { return ( <Template /> ) }

function BodyCurrent2_0() {
    return (
        <Template identifierDoc={
            <>
                <h3 id="id">Applying Client Identifier</h3>
                <Paragraph>A client identifier is any arbitrary but unique name assigned by a client to a stream. It is used for identifying a client during certain operations such as memory management and optimization.</Paragraph>
                <NotePad><>Client Identifiers are a mandatory aspect of the <code>StreamService</code> provisioning. <b><i>Consider:</i></b> maintaininig uniqueness of IDs by assigning to its <code>clientId</code> configuration property either an identical or a stylized version of the client's name. See <Anchor to="/overview/streaming#provision">this example</Anchor></></NotePad>
            </>
        } />
    );
}

function Template({
    identifierDoc = null
} : {
    identifierDoc? : React.ReactNode;
}) {
    return (
        <div>
            <h3>What is a client?</h3>
            <div>
                <Paragraph>
                    A client is any resource { "(" }i.e. component, service, directives etc.{ ")" }  consuming the <Name />. A client consumes this context by:
                    <ul>
                        <li>either injecting the <Name/>'s <code>ContextService</code> into a resource and accessing the context directly through this service as needed. More on this <Anchor to="/overview/direct-usage">here.</Anchor></li>
                        <li>or streaming it through an <Name />'s <code>StreamingService</code> instance. More on this <Anchor to="/overview/streaming">here.</Anchor></li>
                    </ul>
                </Paragraph>
                { identifierDoc }
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
