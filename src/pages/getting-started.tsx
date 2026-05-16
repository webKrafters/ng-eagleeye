import type { HeadFC } from 'gatsby';

import type { PageProps } from '../contexts/page';

import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';

import Anchor from '../partials/anchor';
import CodeBlock from '../partials/code-block';
import Header from '../partials/segment-header';
import Name from '../partials/name';
import NotePad from '../partials/pad/note';
import Paragraph from '../partials/paragraph';
import SelectTab from '../partials/select-tab';
import { Button } from 'antd';

const GettingStartedPage : React.FC<PageProps> = ({ className }) => (
    <article className={ `getting-started-page ${ className }` }>
        <h1>Getting Started</h1>
        <BodyCurrent />
    </article>
);

export default GettingStartedPage;

export const Head : HeadFC = () => ( <title>Getting Started</title> );

const example_state_data = 
`export const state = {
    a: {
        b: {
            c: null as unknown as string,
            x: { y: { z: [ 2022 ] } }
        }
    }
};
export type State = typeof state;`

const creatorCode_root =
`import { provideContextService } from '@webkrafters/ng-eagleeye';
import { state } from './state';

export const appConfig: ApplicationConfig = {
  providers: [
    ...,
    provideContextService({
      attrs: {
        value: state
      }
    }),
    ...
  ]
};`

const creatorCode_scoped =
`import {
    ContextService,
    StreamService,
    provideContextService,
    provideStreamService
} from '@webkrafters/ng-eagleeye';

import type { State } from './state';

const localState = { name: { first: '', last: '' } };

type LocalState = typeof localState;

const selectorMap = {
    firstName: 'name.first',
    lastName: 'name.last'
} as const;

type MyStreamService = StreamService<LocalState, typeof selectorMap>;

const contextRef = new InjectionToken<ContextService<State>>();

@Component{
    providers: [
        ...,
        provideContextService({
            attrs: { value: state },
            ref: contextRef // <- ref so as not to override access to root ContextService
        }),
        provideStreamService({
            contextRef, selectorMap
        }), // will stream the contextRef
        ...
    ],
    ...
}
export class DemoComponent implements OnDestroy {

    // injects global context service if provided
    globalContextService = inject<ContextService<State>>( ContextService );
    
    // injects referenced local context service
    localContext = inject<ContextService<LocalState>>( contextRef );
    
    // injects StreamService provided above
    streamService = inject<MyStreamService>( StreamService );
    
    data : MyStreamService["data"];
    
    currentState = signal( null as unknown as LocalState );
    
    unsubscribe : ()=>void;
    
    constructor() {
        this.data = this.streamService.data;
        this.unsubscribe = this.localContextService.store.subscribe(
            'data-updated', () => this.currentState.set(
                this.localContextService.store.getState()
            )
        )
    }
    ngOnDestroy() {
        this.unsubscribe();
    }
    updateFirstName( e: KeyboardEvent ) {
        const input = e.target as HTMLInputElement;
        this.streamService.setState({
            first: { name: input.value }
        });
    }
    writeToGlobalState( e: KeyboardEvent ) {
        const input = e.target as HTMLInputElement;
        this.globalContextService.store.setState({
            a: { b: { c: input.value } }
        });
    }
}`

const direct_usage = 
`import { ContextService } from '@webkrafters/ng-eagleeye';
import type { State } from './state';

const YEAR_PATH = 'a.b.x.y.z[0]';

@Component({...})
export class SomeComponent implements OnDestroy {
    contextService = inject<ContextService<State>>( ContextService );
    year = signal( 'n.a.' as unknown as number );
    unsubscribe : ()=>void;
    constructor() {
        this.unsubscribe = this.contextService.store.subscribe(
            'data-updated', ( a, b, c, includesPath ) => (
                includesPath( YEAR_PATH ) && this.updateYear()
            )
        );
        this.updateYear();
    }
    onKeyDown( e: KeyboardEvent ) {
        const input = e.target as HTMLInputElement;
        this.contextService.store.setState({
            a: { b: { c: input.value } }
        });
    }
    ngOnDestroy() {
        this.unsubscribe();
    }
    private updateYear() { 
        const data = this.contextService.store.getState([ YEAR_PATH ]);
        this.year = signal( data.a.b.x.y.z[ 0 ] );
    }
};`;

const stream_usage =
`import { ContextService, provideStreamService } from '@webkrafters/ng-eagleeye';

import type { State } from './state';

const selectorMap = { year: 'a.b.x.y.z[0]' } as const;

type MyStreamService = StreamService<State, typeof selectorMap>;

@Component({
    providers: [
        provideStreamService({
            selectorMap
        }) // will stream any closest available non-custom referenced ContextSevice higher in DI chain by default
    ],
    ...
})
export class SomeComponent {
    streamService = inject<MyStreamService>( StreamService );
    data : MyStreamService["data"];
    constructor() {
        this.data = this.streamService.data;
    }
    onKeyDown( e: KeyboardEvent ) {
        const input = e.target as HTMLInputElement;
        this.streamService.setState({ a: { b: { c: input.value } } });
    }
}`

function BodyCurrent() {
    const ctxSampleDivRef = useRef<HTMLDivElement>( null );
    const [ tabIndex, setTabIndex ] = useState( 0 );
    const showGlobalSample = useCallback(() => setTabIndex( 1 ), []);
    const showScopedSample = useCallback(() => setTabIndex( 0 ), []);
    useLayoutEffect(() => {
        ctxSampleDivRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
    }, [ tabIndex ]);
    return (
        <>
            <Paragraph className="snippet-intro" id="install">
                <Name /> is an independent state manager as a service running alongside an Angular application, which once created, can be plugged into any part of the application as needed. There is no bound to the number of instances allowed per application. 
            </Paragraph>
            <Paragraph className="snippet-box" id="usage">
                <CodeBlock isInline>
                    npm install --save @webkrafters/ng-eagleeye
                </CodeBlock>
            </Paragraph>
            <Paragraph className="snippet-intro" id="create-context-usage">
                <h3>Creating the <Name /> store</h3>
                Two services are provided for this purpose depending on need.
                <ol>
                    <li><strong>ContextService: </strong>the core applicaton state resides here. Use the <code>provideContextService{ "(...)" }</code> to make this service available to the Angular DI system. More on this <Anchor to="/overview/create">here</Anchor>.</li>
                    <li><strong>StreamService: </strong>this is a UI-friendly service which observes and streams changes to the application state in real-time. Use the <code>provideStreamService{ "(...)" }</code> to make this service available to the Angular DI system. More on this <Anchor to="/overview/streaming">here</Anchor>.</li>
                </ol>
            </Paragraph>
            <Paragraph className="snippet-box">
                <Header>state.ts</Header>
                <div>
                    Assuming the following default state data:
                </div>
                <CodeBlock>{ example_state_data }</CodeBlock>
            </Paragraph>
            <div ref={ ctxSampleDivRef }>
                <SelectTab currentIndex={ tabIndex } selectStyle={{ width: '13rem' }} options={[{
                    label: ( <strong>AS A SCOPED CONTEXT</strong> ),
                    value: (
                        <>
                            <Paragraph className="snippet-intro">
                                To make a context injectable within a limited scope { "(" }i.e a limited section of the application{ ")" }, provide it at the most inclusive level of the section as follows:
                            </Paragraph>
                            <Paragraph className="snippet-box">
                                <Header>demo/demo.ts</Header>
                                <CodeBlock>{ creatorCode_scoped }</CodeBlock>
                            </Paragraph>
                            <Paragraph>This Demo component creates a limited context along with a stream strictly for its own and its children's consumption while still maintaining direct access to the global ContextService { "(" }assuming that the global context service exists{ ")" }.</Paragraph>
                            <Paragraph>A provided <Name /> context service can be referenced or injected through its constructor <code>ContextService</code>. To provide it a custom reference, add a <code>ref</code> property. See more on this <Anchor to="/overview/create">here</Anchor>.</Paragraph>
                            <NotePad>While the Demo Component retained access to the globally provided ContextService, globally provided ContextService is not a dependency for scoped contexts. </NotePad>
                            <hr />
                            <Button
                                onClick={ showGlobalSample }
                                style={{ paddingLeft: 0, fontWeight: 500 }}
                                type="link"
                            >
                                Show global context service usage.
                            </Button>
                        </>
                    )
                }, {
                    label: ( <strong>AS A GLOBAL CONTEXT</strong> ),
                    value: (
                        <> 
                            <Paragraph className="snippet-intro">
                                To make a context globally injectable, declare it at the root as follows:
                            </Paragraph>
                            <Paragraph className="snippet-box">
                                <Header>app.config.ts</Header>
                                <CodeBlock>{ creatorCode_root }</CodeBlock>
                            </Paragraph>
                            <Paragraph>
                                This context can be referenced or injected through its constructor <code>ContextService</code>. To provide it a custom reference, add a <code>ref</code> property. See more on this <Anchor to="/overview">here</Anchor>.
                            </Paragraph>
                            <Paragraph className="snippet-intro">
                                <h4 id="direct-usage">Direct Usage.</h4>
                                <div>A provided <Name /> context service can be deployed directly within some other file such as some component <code>.ts</code> file like so:</div>
                            </Paragraph>
                            <Paragraph className="snippet-box">
                                <Header>direct-usage/direct-usage.ts</Header>
                                <CodeBlock>{ direct_usage }</CodeBlock>
                            </Paragraph>
                            <hr />
                            <Button
                                onClick={ showScopedSample }
                                style={{ paddingLeft: 0, fontWeight: 500 }}
                                type="link"
                            >
                                Show scoped context service usage.
                            </Button>
                        </>
                    )
                }]} />
            </div>
            <div className="snippet-intro" id="connect-usage">
                <h3 id="streaming">Joining the <Name /> Change Stream</h3>
                <Anchor to="overview/streaming">
                    See StreamService overview here
                </Anchor>
                <Paragraph><Name /> change stream is a reactive store whose data are automatically changing to reflect most recent changes affecting them. </Paragraph>
                <Paragraph>We join the <Name /> change stream by linking the <Name /> <code>ContextService</code> to a <code>StreamService</code>.</Paragraph>
                <Paragraph>The <code>StreamService</code> wires up the context change stream to your consumer component.</Paragraph>
                <Paragraph>Streaming embodies the "set-it-and-forget-it" paradigm. Just set up a list of property paths to state slices to observe { '(' }see <Anchor to="/concepts/selector-map">Selector Map</Anchor>{ ')' }. The context takes care of the rest.</Paragraph>
                <Paragraph>The following is a sample:</Paragraph>
            </div>
            <Paragraph className="snippet-box">
                <Header>stream-usage/stream-usage.ts</Header>
                <CodeBlock>{ stream_usage }</CodeBlock>
            </Paragraph>
        </>
    );
}
