import { Props as AnchorProps } from '../../../../../partials/anchor';

import React from 'react';

import Anchor from '../../../../../partials/anchor';
import NotePad from '../../../../../partials/pad/note';

import '../../../../../partials/contents/concepts.channel.setstate.tags.page/style.scss';

const TagLink : React.FC<AnchorProps> = ({ className, ...props }) => (
    <Anchor{ ...props } className={ `tag-link${ className ? ` ${ className }` : '' }` } />
);
TagLink.displayName = 'ConceptChannelSetStateTagsPage.TagLink';

const ConceptChannelSetStateTagsPage : React.FC<{className? : string}> = ({ className }) => (
    <article className={ `concept-channel-setstate-tags-page ${ className }` }>
        <h1><code>{ `channel.setState` }</code> Tags Commands</h1>
        <NotePad>
            <strong>
                The following is also wholly applicable to global <code>store.setState</code>
            </strong>
        </NotePad>
        <h3>About the set-state tag commands</h3>
        <p>By default, <code>channel.setState</code> recursively merges new changes into current state.</p>
        <p>To overwrite current state slices with new values, <strong>7</strong> tag commands have been provided:</p>
        <ol>
            <li><TagLink to="/concepts/channel/setstate/tags/clear">@@CLEAR:</TagLink> sets state slice to its corresponding empty value</li>
            <li><TagLink to="/concepts/channel/setstate/tags/delete">@@DELETE:</TagLink> removes plain object properties and array items</li>
            <li><TagLink to="/concepts/channel/setstate/tags/move">@@MOVE:</TagLink> moves array elements</li>
            <li><TagLink to="/concepts/channel/setstate/tags/push">@@PUSH:</TagLink> pushes new items into an array</li>
            <li><TagLink to="/concepts/channel/setstate/tags/replace">@@REPLACE:</TagLink> replaces property values</li>
            <li><TagLink to="/concepts/channel/setstate/tags/set">@@SET:</TagLink> sets property values</li>
            <li><TagLink to="/concepts/channel/setstate/tags/splice">@@SPLICE:</TagLink> splices array items</li>
        </ol>
    </article>
);

export default ConceptChannelSetStateTagsPage;
