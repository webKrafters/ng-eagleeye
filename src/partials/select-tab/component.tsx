import type {
	CSSProperties,
	NamedExoticComponent,
	ReactNode
} from 'react';

import React, {
	forwardRef,
	useCallback,
	useEffect,
	useMemo,
	useState
} from 'react';

import { Select } from 'antd';

import './style.scss';

export interface Content {
	label : ReactNode;
	value : ReactNode;
}

interface IProps {
	currentIndex? : number;
	onTabChange?: (newTab : Content) => void;
	options : Array<Content>;
	selectStyle? : CSSProperties;
}

export type Props = Omit<JSX.IntrinsicElements[ "div" ], "children"> & IProps

const SelectTab : NamedExoticComponent<Props> = forwardRef<
	HTMLDivElement, Props
>(({ className, onTabChange = noop, options, selectStyle = {}, currentIndex = 0, ...props }, ref ) => {
	const [ content, setContent ] = useState( options[ currentIndex ] );
	const style = useMemo(() => ({ width: 132, ...selectStyle }), [ selectStyle ]);
	useEffect(
		() => setContent( options[ currentIndex ] ),
		[ options, currentIndex ]
	);
	const onSelect = useCallback(( opt: Content ) => {
		onTabChange( opt );
		setContent( opt );
	}, [ onTabChange ]);
	return (
		<div
			role="tabpanel"
			{ ...props }
			className={ `select-tab${ className ? ` ${ className }` : '' }` }
			ref={ ref }
		>
			<Select
				labelInValue
				onSelect={ onSelect }
				options={ options }
				popupClassName="select-tab__dropdown"
				style={ style }
				value={ content }
			/>
			<div className="content">
				{ content.value }
			</div>
		</div>
	);
});

SelectTab.displayName = 'SelectTab';

export default SelectTab;

function noop(){}
