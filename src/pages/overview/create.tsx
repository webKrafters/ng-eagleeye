import React from 'react';

import '../../partials/contents/create-page/style.scss';

import Anchor from '../../partials/anchor';
import CodeBlock from '../../partials/code-block';
import Name from '../../partials/name';
import Paragraph from '../../partials/paragraph';
import Header from '../../partials/segment-header';
import NotePad from '../../partials/pad/note';
import ListItem from '../../partials/list-item';

const provide_at_root_default =
`import { provideContextService } from '@webkrafters/ng-eagleeye';

export const appConfig: ApplicationConfig = {
    providers: [
        provideContextService() 
    ]
};`

const provide_at_root =
`import { provideContextService } from '@webkrafters/ng-eagleeye';

export const appConfig: ApplicationConfig = {
    providers: [
        provideContextService({
            attrs? : {
                prehooks? : Prehooks<T>;
                storage? : IStorage<T>;
                value? : T | AutoImmutable<T>;
            },
            ref? : InjectionToken<ContextService<T>>
        })
    ]
};`

const consume_at_root_default =
`import { CustomService } from '@webkrafters/ng-eagleeye';

@Component()
export class TestComponent{
    myContext = inject( CustomService );
}`

const referenceable_base_context =
`import {
    CONTEXT_DESCRIPTOR,
    provideContextService
} from '@webkrafters/ng-eagleeye';

export const CONTEXT_TOKEN = new InjectionToken( \`\$\{ CONTEXT_DESCRIPTOR \}_Testing\` );

export const appConfig: ApplicationConfig = {
    providers: [
        provideContextService(),
        provideContextService({
            ref: CONTEXT_TOKEN
        })
    ]
};`

const consume_referenceable_base_context =
`import { provideContextSerivce } from @webkrafters/ng-eagleeye;
import { CONTEXT_TOKEN } from './referenceable_base_context;

@Component({
    providers: [ provideContextSerivce() ]
})
export class TestComponent{
    myContext = inject( CustomService );
    sharedContext = inject( CONTEXT_TOKEN );
}`

const CreatePage : React.FC<{className? : string}> = ({ className }) => (
    <article className={ `create-page ${ className }` }>
        <h1>Creating an <Name /> Context Service</h1>
        <h3><code>provideContextService{ "(...)" }</code></h3>
        <Paragraph>The <code>provideContextService{ "(...)" }</code> is the context service provider. See usage <Anchor to="/overview/create#global-provision">here</Anchor>. It creates and provides an instance of the <Name /> context service.</Paragraph>
        <h3>The <code>ContextService</code> Class</h3>
        <Paragraph>
            To access the <Name /> context in Angular environment, a <code>ContextService</code> class has been provided. This service can be provided to the Angular application environment in two options. Namely:
            <ul>
                <li>at the <b><u>root</u></b> level { "(" }i.e. visible globally within the app{ ")" }.</li>
                <li>at the <b><u>scope</u></b> level { "(" }visible within a specific section of the app{ ")" }.</li>
            </ul> 
        </Paragraph>
        <h4>Service Configuration</h4>
        <Paragraph>Before we begin with the creation and provision of the service, let us pave the way by acquainting ourselves with the input configurations expected by this service provider.</Paragraph>
        <Paragraph>
            <Header>Configuration Object:</Header>
            <table className="config-table">
                <thead>
                    <tr>
                        <th><b>Property</b></th>
                        <th><b>Type</b></th>
                        <th><b>Optional</b></th>
                        <th><b>Description</b></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><b>attrs.prehooks</b></td>
                        <td>Prehooks{ "<" }STATE{ ">" }</td>
                        <td>Yes</td>
                        <td>Please see <Anchor to="/concepts/prehooks">prehooks</Anchor></td>
                    </tr>
                    <tr>
                        <td><b>attrs.storage</b></td>
                        <td>IStorage{ "<" }STATE{ ">" }</td>
                        <td>Yes</td>
                        <td>Please see <Anchor to="/concepts/storage">storage</Anchor></td>
                    </tr>
                    <tr>
                        <td><b>attrs.value</b></td>
                        <td>STATE { "|" } <Anchor to="https://auto-immutable.js.org/intro">AutoImmutable{ "<" }STATE{ ">" }</Anchor></td>
                        <td>Yes</td>
                        <td>The state object where a state object is a plain object. Also acceptable is an <Anchor to="https://auto-immutable.js.org/intro">AutoImmutable</Anchor> already holding this state object.</td>
                    </tr>
                    <tr>
                        <td><b>ref</b></td>
                        <td>InjectionToken{ "<" }ContextService{ "<" }STATE{ ">> "}</td>
                        <td>Yes</td>
                        <td>A custom reference handle to this context instance. When none provided, <code>ContextService</code> will be used.</td>
                    </tr>
                </tbody>
            </table>
        </Paragraph>
        <h3 id="global-provision">Providing the <code>ContextService</code> at the Root Level</h3>
        <h4>Default Case</h4>
        <Paragraph>The following is the <b>default</b> case. In this case, our state will be initialized with an AutoImmutable instance holding an empty plain object as state object.</Paragraph>
        <Paragraph><CodeBlock>{ provide_at_root_default }</CodeBlock></Paragraph>
        <h4>Custom Case</h4>
        <Paragraph>The follwing is a complete view of a <code>provideContextService{ "(...)" }</code>. Any omitted property is supplied a default equivalent.</Paragraph>
        <Paragraph><CodeBlock>{ provide_at_root }</CodeBlock></Paragraph>
        <h3>Providing the <code>ContextService</code> at a Scope Level</h3>
        The provision of a new <code>ContextService</code> instance at any section of an application is identical to the requirement of doing same at the root level. The only difference is in the Angular DI interpretation.
        <ListItem><div>A <code>ContextService</code> instance is only accessible within the scope { "(" }i.e. the resource at the provision point, all of its child resources and descendants{ ")" }.</div></ListItem>
        <ListItem><div>A <code>ContextService</code> instance sharing identical <code>ref</code> config property with an earlier provided resource in the Angular DI chain overrides the earlier resource.</div></ListItem>
        <ListItem><div>As such, a <code>ContextService</code> instance provided without the <code>ref</code> config property overrides any earlier provided resource in the Angular DI chain.</div></ListItem>
        <h3 id="referencing">Service Referenceabiility</h3>
        <Paragraph>Custom reference handle for provided ContextService instance is generally unnecessary. Contrarily, there are a few cases in which this feature may be used to avoid resource override within the Angular DI system. For instance:</Paragraph>
        <h4>Scenario #1</h4>
        <Paragraph>Let's provide at the application root without a custom ref.</Paragraph>
        <Paragraph><CodeBlock>{ provide_at_root_default }</CodeBlock></Paragraph>
        <Paragraph>Let's consume the provided context service in our local component.</Paragraph>
        <Paragraph><CodeBlock>{ consume_at_root_default }</CodeBlock></Paragraph>
        <Header><b><u>Aftermath:</u></b></Header>
        <Paragraph><code>this.myContext</code> will hold the lone <code>CustomService</code> instance provided.</Paragraph>
        <h4>Scenario #2</h4>
        <Paragraph>Let's provide at an application root with and without a custom ref.</Paragraph>
        <Paragraph><CodeBlock>{ referenceable_base_context }</CodeBlock></Paragraph>
        <Paragraph>Let's attemept to consume our provided context services while introducing another non-custom referenced ContextService to the local component scope.</Paragraph>
        <Paragraph><CodeBlock>{ consume_referenceable_base_context }</CodeBlock></Paragraph>
        <Header><b><u>Aftermath:</u></b></Header>
        <Paragraph>Ironically, <code>this.myContext</code> will hold the non-custom referenced <code>CustomService</code> instance provided at the <code>TestComponent</code> scope level.</Paragraph>
        <Paragraph><code>this.sharedContext</code> will hold the custom referenced <code>CustomService</code> from the root provision.</Paragraph>
        <Paragraph>The non-custom referenced <code>CustomService</code> provided at the root level is unreachable.</Paragraph>
        <Paragraph>
            <NotePad>
                <Header>Custom Reference Naming Covention</Header>
                <div>The description string acceptable to <code>config.ref</code> must have the "EagleEye_Context_Service_" prefix.</div>
            </NotePad>
        </Paragraph>
        <Paragraph>
            Example of creating a <code>StreamService</code> using a custom reference to an existing ContextService can be observed in <Anchor to="/overview/streaming#creating-a-stream">Joining context stream</Anchor>.
        </Paragraph>
        <Paragraph style={{ borderTop: '1px solid #888', marginTop: '1rem', textAlign: 'right' }}>
            Next: <Anchor to="/overview/direct-usage">Consuming Context { "(" }the Direct Method{ ")" }</Anchor>
        </Paragraph>
    </article>
);

export default CreatePage;
