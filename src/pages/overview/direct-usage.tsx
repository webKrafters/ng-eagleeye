import React, { useCallback, useState } from 'react';

import { ClockCircleOutlined, ExperimentOutlined, MinusOutlined } from '@ant-design/icons';

import Alert from '../../partials/alert';
import Anchor from '../../partials/anchor';
import Header from '../../partials/segment-header';
import CodeBlock from '../../partials/code-block';
import Paragraph from '../../partials/paragraph';
import ListItem from '../../partials/list-item';
import Name from '../../partials/name';
import NotePad from '../../partials/pad/note';
import { Button } from 'antd';

const externalAccessCode =
`import { ContextService } from '@webkrafters/ng-eagleeye';

@Injectable({
    providedIn: 'root'
})
export class StoreMonitor {
    private _onEvent;
    private _store;
    private _unsub;
    constructor( private contextService : ContextService ) {
        this._source = this.contextService.store;
    }
    set onEvent( handler ) { this._onEvent = handler }
    get source() { return this._store }
    set source( store ) {
        if( store === this._store ) { return }
        this.cleanup();
        if( !store ) { return }
        this._store = store;
        this._onEvent(() => console.log( 'STATE: ', this._store.getState() ));
        this._unsub = store.subscribe( 'data-updated', this._onEvent );
        this._onEvent();
    }
    cleanup() {
        this._unsub?.();
        this._store = null;
    }
}`

const setupCode =
`import { StoreMonitor } from './monitor/debug';

@Component()
export class AppComponent implements OnDestroy {
    monitor = inject( StoreMonitor );
    ngOnDestroy() {
        this.monitor.cleanup();
    }
};`


const RESET_STATE_LIVE =
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
    resetPoint() {
        this.contextService.store.resetState([ PATH ]);
    }
    private syncCurrentPoint() {
        const point = this.contextService.store.getState([ PATH ]).a.c.e.g;
        return this.point.set( Number.isNumber( point ) ? point : -1 );
    }
}`;

const RESET_STATE_SAMPLE =
`store.subscribe(
    'data-updated', (
        changes : Changes<State>,
        changedPaths : Array<Array<string>>,
        netChanges : Partial<State>,
        mayHaveChangesAt : (tokenizedPath : string[]) => boolean
    ) => void
); // => VoidFunction`

const DirectUsagePage : React.FC<{className? : string}> = ({ className }) => (
    <article className={ `direct-usage-page ${ className }` }>
        <h1>Consuming Context { "(" }the Direct Method{ ")" }</h1>
        <Paragraph>The <code>ContextService</code> instance offers a reference { "(" }i.e. <code>store</code> property{ ")" } to the <Name /> context store. This <code>store</code> property is the API through which any client communicates with the context.</Paragraph>
        <Paragraph>
            <NotePad>
                <Header>Architectural Decision Time. <ClockCircleOutlined /></Header><br />
                <Paragraph>While the <code>ContextService</code> instance offers direct communication through its <code>store</code> property, it also allows for an ongoing communication channel in a "set-it-and-forget-it" paradigm.<br /><b><Anchor to="/overview/streaming">Streaming</Anchor></b>.</Paragraph>
                <Paragraph>The best case for direct communication are for one-off scenario. It is better to stream the context when in an environment that calls for a real-time response to context changes.</Paragraph>
            </NotePad>
        </Paragraph>
        <BodyCurrent />
        <Paragraph style={{ borderTop: '1px solid #888', marginTop: '1rem', textAlign: 'right' }}>
            Next: <Anchor to="/overview/streaming">Consuming Context { "(" }Using Streams{ ")" }</Anchor>
        </Paragraph>
    </article>
);

export default DirectUsagePage;

function BodyCurrent() {
    return (
        <>  
            <h4>4 Store Methods</h4>
            <ol>
                <li><strong><code>getState()</code>:</strong> Provides a static snapshot of the current state. It may accept a list of property paths to target specific properties within the state to fetch and return</li>
                <li><strong><code>resetState()</code>:</strong> Please see descriptions in the <Anchor to="/concepts/store/resetstate">store</Anchor> page. It may accept a parameterless invocation resulting in a noop.</li>
                <li><strong><code>setState()</code>:</strong> Please see descriptions in the <Anchor to="/concepts/store/setstate">store</Anchor> page.</li>
                <li>
                    <strong><code>subscribe(...)</code></strong><br />
                    <table>
                        <tr>
                            <td style={{ paddingRight: '0.5rem', verticalAlign: 'top' }}>-</td>
                            <td>Provides the API for manual subscription to the context's change and close events.</td>
                        </tr>
                        <tr>
                            <td style={{ paddingRight: '0.5rem', verticalAlign: 'top' }}>-</td>
                            <td>Returns a parameterless void function - the <b><u>unsubcriber</u></b>.</td>
                        </tr>
                        <tr id="subscribing-to-context-disposal">
                            <td style={{ paddingRight: '0.5rem', verticalAlign: 'top' }}>-</td>
                            <td>Accepts a <b>"closing"</b> event type and an observer function to be called before context deactivation.</td>
                        </tr>
                        <tr id="subscribing-to-context-state-update">
                            <td style={{ paddingRight: '0.5rem', verticalAlign: 'top' }}>-</td>
                            <td>Accepts a <b>"data-updated"</b> event type and an observer function for state changes.</td>
                        </tr>
                    </table>
                    <pre>{ RESET_STATE_SAMPLE }</pre>
                    <LiveCodeToggle />
                    <b><u>"data-updated"</u>  event listener params</b><br />
                    <ol>
                        <li><u>changes:</u> an object or array holding the original change request payload(s).</li>
                        <li><u>changedPaths:</u> an array of tokenized property paths belonging to state properties changed during this request.</li>
                        <li><u>netChanges:</u> an object of the final state of all properties in state changed.</li>
                        <li><u>mayHaveChangesAt:</u> a function to confirm that a given property path is among the new changes. This path is to be supplied as a tokenized string (i.e. supply <code>['a', 'b', 'c', '0', 'r']</code> for <code>'a.b.c[0].r'</code>).</li>
                    </ol>
                </li>
            </ol>
            <h4>Let's see some code!</h4>
            <div className="snippet-box">
                <Header>monitor/debug.ts</Header>
                <Paragraph>Sharing the store with this debug monitor class.</Paragraph>
                <Paragraph>A simple class instance montoring and reporting changes in the store in realtime.</Paragraph>
                <Paragraph><CodeBlock>{ externalAccessCode }</CodeBlock></Paragraph>
            </div>
            <div className="snippet-box">
                <Header>app.ts</Header>
                <Paragraph>Attaching this debugger to the app.</Paragraph>
                <Paragraph><CodeBlock>{ setupCode }</CodeBlock></Paragraph>
            </div>
            <Alert title="Pro Tips">
                <Paragraph>State references are always snapshots of the state at the time of access. In essence, the state returned by <code>context.store.getState(...)</code> is not affected by subsequent updates to the store's state. Any updates to this acquired state never affects the context's state. So therefore, the <strong>4</strong> considerations:</Paragraph>
                <ListItem><div>use only the <code>context.store.setState(...)</code> to update the context internal store.</div></ListItem>
                <ListItem><div><code>context.store.getState(...)</code> must be used to obtain the current state value.</div></ListItem>
                <ListItem><div>use your <code>context.store.subscribe(...)</code> to manually subscribe to state changes and refresh your current state value in realtime.</div></ListItem>
                <ListItem><div>use the <code>unsubscriber</code> returned by your context store's <code>subscribe(...)</code> to unsubscribe from the store when needed.</div></ListItem>
            </Alert>
        </>
    );
}

function LiveCodeToggle() {
    const [ isOn, setOnFlag ] = useState( false );
    const setOff = useCallback(() => setOnFlag( false ), []);
    const setOn = useCallback(() => setOnFlag( true ), []);
    return (
        <div style={{ marginBottom: '0.5rem', marginTop: '-1rem'}}>
            { !isOn ? (
                <Button onClick={ setOn } style={{ fontWeight: 800, padding: 0 }} type="link">
                    Dig deeper <ExperimentOutlined />
                </Button>
            ) : (
                <>
                    <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "0.25rem" }}>
                        <Button ghost onClick={ setOff } size="small" style={{ background: "rgb(35, 35, 35)", borderRadius: 0 }}>
                            <MinusOutlined />
                        </Button>
                    </div>
                    <CodeBlock>{ RESET_STATE_LIVE }</CodeBlock>
                </>
            ) }
        </div>
    );
}
