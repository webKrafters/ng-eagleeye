import React, { useCallback, useState } from 'react';

import { Button } from 'antd';
import { MinusOutlined } from '@ant-design/icons';

import '../../partials/contents/streaming-page/style.scss';

import Anchor from '../../partials/anchor';
import CodeBlock from '../../partials/code-block';
import Header from '../../partials/segment-header';
import ListItem from '../../partials/list-item';
import Name from '../../partials/name';
import NotePad from '../../partials/pad/note';
import Paragraph from '../../partials/paragraph';
import VersionTabs from '../../partials/version-tabs';

const stream_sample_attr =
`import { provideStreamService } from '@webkrafters/ng-eagleeye';
import type { StateType } from './context/definition';

const PATH = 'a.c.e.g';

cont selectorMap = { point: PATH } as const;

@Component({
	providers: [
        provideStreamService({ selectorMap })
    ],
    template: \`
        <div>
            <div>
                <label>Current point: </label>
                <input type="text" readonly [value]="data.point()" />
            </div>
            <button (click)="resetPoint()">
                reset point
            </button>
        </div>
    \`
})`;

const stream_sample_attr2_0 =
`import { provideStreamService } from '@webkrafters/ng-eagleeye';
import type { StateType } from './context/definition';

const PATH = 'a.c.e.g';

cont selectorMap = { point: PATH } as const;

@Component({
	providers: [
        provideStreamService({
            clientId: 'TEST_COMPONENT',
            selectorMap
        })
    ],
    template: \`
        <div>
            <div>
                <label>Current point: </label>
                <input type="text" readonly [value]="data.point()" />
            </div>
            <button (click)="resetPoint()">
                reset point
            </button>
        </div>
    \`
})`;

const stream_sample =
`export class TestComponent {
	streamService = inject( StreamService<StateType, typeof selectorMap> );
    data = this.streamService.data;
    resetPoint() { this.streamService.resetState([ PATH ]) }
}`;

const non_stream_sample =
`import { ContextService } from '@webkrafters/ng-eagleeye';

const PATH = 'a.c.e.g';

@Component({
    template: \`
        <div>
            <div>
                <label>Current point: </label>
                <input type="text" readonly [value]="point()" />
            </div>
            <button (click)="resetPoint()">
                reset point
            </button>
        </div>
    \`
})
export class TestComponent implements OnDestroy {
    private unsub = () => {};
    contextService = inject( ContextService );
    point = signal( -1 );
    constructor() {
        this.unsub = this.contextService.store.subscribe(
            'data-updated', ( arg0, arg1, arg2, pathChanged ) => {
                pathChanged( PATH.split( '.' ) ) && this.syncCurrentPoint()
            }
        );
        this.syncCurrentPoint();
    }
    ngOnDestroy() { this.unsub() }
    resetPoint() { this.contextService.store.resetState([ PATH ]) }
    private syncCurrentPoint() {
        const point = this.contextService.store.getState([ PATH ]).a.c.e.g;
        return this.point.set( Number.isNumber( point ) ? point : -1 );
    }
}`;

const StreamingPage : React.FC<{className? : string}> = ({ className }) => (
    <article className={ `streaming-page ${ className }` }>
        <h1>Consuming Context { "(" }Using Streams{ ")" }</h1>
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
            firstListItem={
                 <ListItem>
                    <div>
                        accepts:
                        <ol style={{ marginBottom: 0 }}>
                            <li>a <Anchor to="/concepts/client#id"><b>client identifier</b></Anchor> value</li>
                            <li>an optional <Anchor to="/concepts/selector-map"><b>selector map</b></Anchor></li>
                        </ol>
                        and derives a change stream context <Anchor to="/concepts/store">store.data</Anchor> of derived signal fields.
                    </div>
                </ListItem>
            }
            mandatoryConfigRow={
                <tr>
                    <td><b>clientId</b></td>
                    <td>string</td>
                    <td><b>No</b></td>
                    <td>Please see <Anchor to="/concepts/client#id">client identifier</Anchor></td>
                </tr>
            }
            numProperties={ 4 }
            providerConfigPropListDoc={ stream_sample_attr2_0 }
        />
    );
}

function Template({
    firstListItem = ( <ListItem><div>accepts an optional <Anchor to="/concepts/selector-map">selector map</Anchor>; and derives a change stream context <Anchor to="/concepts/store">store.data</Anchor> of derived signal fields.</div></ListItem> ),
    mandatoryConfigRow = null,
    numProperties = 3,
    providerConfigPropListDoc = stream_sample_attr
} : {
    firstListItem? : React.ReactNode;
    mandatoryConfigRow? : React.ReactNode;
    numProperties? : number;
    providerConfigPropListDoc? : string;
}) {
    return (
        <>
            <h3>Streaming</h3>
            { firstListItem }
            <ListItem><div>injected <Anchor to="/concepts/store">store</Anchor> monitors changes in the underlying state slices referenced by the selector map.</div></ListItem>
            <ListItem><div>updates the <code>store.data</code> fields in realtime reflecting changes in any of the state slices at which they reference.</div></ListItem>
            <h3>The <code>StreamService</code> Class</h3>
            <Paragraph>A <code>StreamService</code> instance streams to a <Anchor to="/concepts/client">client</Anchor> all observed changes occuring within an <Name /> context store.</Paragraph>
            <Paragraph>A <code>StreamService</code> instance holds <b>{ numProperties } <Anchor to="/concepts/store">store</Anchor></b> properties.</Paragraph>
            <div id="attention" className="attention">
                <NotePad>
                    <b><u>Attention</u></b>
                    <ListItem><div>The <code>StreamService</code> produces automatic signals for its <code>data</code> properties.</div></ListItem>
                    <ListItem><div>Changes can be made directly to <code>data</code> properties.</div></ListItem>
                    <ListItem><div>Those changes do not affect context data.</div></ListItem>
                    <ListItem><div>Only a <code>StreamService</code> or its originating <code>ContextService</code> can write into a related context.</div></ListItem>
                </NotePad>
            </div>
            <h3><code>provideStreamService{ "(...)" }</code></h3>
            <Paragraph>The <code>provideStreamService{ "(...)" }</code> is the stream service provider. See usage <Anchor to="/overview/streaming#provision">here</Anchor>. It creates and provides the streaming service for the <Name /> context service.</Paragraph>
            <Paragraph>
                To stream the <Name /> context in Angular environment, a <code>StreamService</code> class has been provided. This service can be provided to the Angular application environment in two options. Namely:
                <ul>
                    <li>at the <b><u>root</u></b> level { "(" }i.e. visible globally within the app{ ")" }.</li>
                    <li>at the <b><u>scope</u></b> level { "(" }visible within a specific section of the app{ ")" }.</li>
                </ul> 
            </Paragraph>
            <h4>Service Configuration</h4>
            <Paragraph>Before we begin with the creation and provision of this service, let us pave the way by acquainting ourselves with the input configurations expected by this service provider.</Paragraph>
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
                        { mandatoryConfigRow }
                        <tr>
                            <td><b>contextRef</b></td>
                            <td>InjectionToken{ "<" }ContextService{ "<" }STATE{ ">> "}</td>
                            <td>Yes</td>
                            <td>A custom reference handle to the context instance to stream. When none provided, <code>ContextService</code> will be used.</td>
                        </tr>
                        <tr>
                            <td><b>ref</b></td>
                            <td>InjectionToken{ "<" }StreamService{ "<" }STATE{ ">> "}</td>
                            <td>Yes</td>
                            <td>A custom reference handle to this stream instance. When none provided, <code>StreamService</code> will be used.</td>
                        </tr>
                        <tr>
                            <td><b>selectorMap</b></td>
                            <td>SelectorMap</td>
                            <td>Yes</td>
                            <td>Please see <Anchor to="/concepts/selector-map">selector map</Anchor></td>
                        </tr>
                    </tbody>
                </table>
            </Paragraph>
            <h3 id="provision">Streaming Example</h3>
            <Paragraph>Let us stream a few state slices from a proverbial context store. We assume that a certain <Anchor to="/overview/create#referencing">non-custom referenced <code>ContextService</code></Anchor> instance has already been <Anchor to="/overview/create">provisioned</Anchor> in the DI chain. Our <code>StreamService</code> example here will be streaming its underlying context.</Paragraph>
            <Paragraph>In this example, we will provide this <code>StreamService</code> instance exactly at our <Anchor to="/concepts/client">client</Anchor> component scope. Keep in mind that this particular <code>StreamService</code> may well have been provided at the root level or at any scope preceding this component -- doing this only makes it injectable to a larger <Anchor to="/concepts/client">client</Anchor> scope within the application.</Paragraph>
            <Paragraph><CodeBlock>{ `${ providerConfigPropListDoc }\n${ stream_sample }` }</CodeBlock></Paragraph>
            <LiveCodeToggle />
        </>
    );
}

export default StreamingPage;

function LiveCodeToggle() {
    const [ isOn, setOnFlag ] = useState( false );
    const setOff = useCallback(() => setOnFlag( false ), []);
    const setOn = useCallback(() => setOnFlag( true ), []);
    return (
        <div style={{ marginTop: '-0.75rem' }}>
            { !isOn ? (
				<div style={{ display: "flex", justifyContent: "center", marginBottom: "0.25rem" }}>
					<Button onClick={ setOn } style={{ fontWeight: 800, padding: 0 }} type="link">
						Compare non stream version
					</Button>
				</div>
            ) : (
                <>
                    <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "0.25rem" }}>
                        <Button ghost onClick={ setOff } size="small" style={{ background: "rgb(35, 35, 35)", borderRadius: 0 }}>
                            <MinusOutlined />
                        </Button>
                    </div>
                    <CodeBlock>{ non_stream_sample }</CodeBlock>
                </>
            ) }
        </div>
    );
}
