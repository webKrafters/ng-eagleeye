import { calcVersionVModel } from '../src/partials/version-tabs/utils/calc-version-vmodel';

console.info(
	calcVersionVModel(
		[ 6, 0, 0 ],
		[{
			documentation: null,
			version: 'Latest'
		}, {
			documentation: null,
			version: [ 7, 0, 0 ]
		}, {
			documentation: null,
			version: [ 6, 2, 0 ]
		}, {
			documentation: null,
			version: [ 2, 0, 0 ]
		}, {
			documentation: null,
			version: 'Legacy'
		}]
	)
);
