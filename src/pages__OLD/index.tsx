import type { HeadFC } from 'gatsby';

import type { PageProps } from '../contexts/page';

import React from 'react';

import { graphql } from 'gatsby';

import Anchor from '../partials/anchor';
import CodeBlock from '../partials/code-block';
import License from '../partials/license-link';
import Name from '../partials/name';
import Paragraph from '../partials/paragraph';

import '../partials/contents/index-page/style.scss';

export type Props = PageProps<{
	site : {
		siteMetadata : {
			url : {
				demo : string,
				npm : string
			}
		}
	}
}>;

const IndexPage : React.FC<Props> = ({ className, data }) => {
	return (
		<article className={ `index-page ${ className }` }>
			<h1>Welcome to <Name /> JS!</h1>
			<Paragraph>
				<label>
					<b>Official:{ ' ' }</b>
					<Anchor to={ data?.site.siteMetadata.url.npm as string }>
						<Name />
					</Anchor>
				</label>
			</Paragraph>
			<Paragraph>Framework-agnostic native-javasacript change-stream capable immutable state manager.</Paragraph>
			<Paragraph>Not logically bound to any section of an application. A single instance may be deployed anywhere within an application as needed.</Paragraph>
			<Paragraph>Not bound by quantity. As many instances as needed may be created and deployed simultaneously anywhere within an application.</Paragraph>
			<Paragraph>Supports framework-agnostic state sharing among applications. Simply create an <Anchor to="https://auto-immutable.js.org/intro/">Auto Immutable</Anchor> instance to pass around as the <code>value</code> argument for this or any <Anchor to="/">Eagle Eye</Anchor> based state manager instances.</Paragraph>
			<Paragraph className="installation">
				<header>Installation:</header>
				<label>
					<b>Main:</b>
					<CodeBlock isInline>
						npm install --save @webkrafters/eagleeye
					</CodeBlock>
				</label>
			</Paragraph>
			<Paragraph>
				<label>
					<b>Play with a demo app here on:{ ' ' }</b>
					<Anchor to={ data?.site.siteMetadata.url.demo as string }>
						Code Sandbox { '(' }via React Observable Context JS{ ')' }
					</Anchor>
				</label>
			</Paragraph>
			<Paragraph>
				<label>
					<b>License:{ ' ' }</b>
					<License />
				</label>
			</Paragraph>
			<h2><Name />. Why now?</h2>
			<ul>
				<li>An auto-immutable update friendly state management class. See <Anchor to="/concepts/channel/setstate"><code>channel.setState</code></Anchor> and global <Anchor to="/global-access#external-apis"><code>store.setState</code></Anchor>.</li>
				<li>A streamable state manager -- automatically notifies <Anchor to="/concepts/client">clients</Anchor> of new changes to the state through manual <Anchor to="/global-access#external-apis">subscription</Anchor> and through <Anchor to="/concepts/channel">change stream channels</Anchor>.</li>
				<li>Recognizes <strong>negative array indexing</strong>. Please see <Anchor to="/concepts/property-path">Property Path</Anchor> and <code>channel.setState</code> <Anchor to="/concepts/channel/setstate#indexing">Indexing</Anchor>.</li>
			</ul>
			<div>May see features history at <Anchor to="/history/features">What's Changed?</Anchor></div>
		</article>
	);
}

export default IndexPage;

export const query = graphql`
    query IntroTitle {
        site {
            siteMetadata {
                url {
					demo
					npm
				}
            }
        }
    }
`;

export const Head : HeadFC = () => (
	<meta
		content="Welcome to Eagle Eye context!"
		name="description"
	/>
);
