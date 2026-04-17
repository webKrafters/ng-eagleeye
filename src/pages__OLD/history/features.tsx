import type { HeadFC } from 'gatsby';

import type { PageProps } from '../../contexts/page';

import React from 'react';

import Anchor from '../../partials/anchor';
import Name from '../../partials/name';

const TRow : React.FC<{children: React.ReactNode}> = ({ children }) => ( <tr className="vertical-top">{ children }</tr> );
TRow.displayName = 'featuresHistory.TRow';

const TCol : React.FC<{children: React.ReactNode}> = ({ children }) => ( <td className="top-barred" style={{ paddingRight: '2rem' }}>{ children }</td> );

const THCol : React.FC<{children: React.ReactNode}> = ({ children }) => ( <th colSpan={ 2 } style={{ paddingRight: '2rem', textAlign: 'left' }}>{ children }</th> );

const FeaturesHistoryPage : React.FC<PageProps> = ({ className }) => (
    <article className={ `features-history-page ${ className }` }>
        <h1 id="changes">What's Changed?</h1>
        <table>
            <thead><TRow><THCol>v1.0.0</THCol></TRow></thead>
            <tbody>
                <TRow><TCol><b>1.</b></TCol><TCol>Initial <Anchor to="/"><Name /></Anchor> release.</TCol></TRow>
                {/* <TRow><td><b>2.</b></td><td>Added stronger support for deeply nested state structure. See <Anchor to="/concepts/store/setstate"><code>store.setState</code></Anchor></td></TRow> */}
            </tbody>
        </table>
    </article>
);

export default FeaturesHistoryPage;

export const Head : HeadFC = () => ( 
    <meta
        content="What's changed?"
        name="description"
    />
);
