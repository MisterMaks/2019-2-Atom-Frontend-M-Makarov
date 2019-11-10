// Configuration for StyleLint
// See: https://stylelint.io/user-guide/configuration/

module.exports = {
	extends: [
		'@wemake-services/stylelint-config-scss',
		'stylelint-config-css-modules',
		'stylelint-a11y/recommended',
	],
	plugins: ['stylelint-no-unsupported-browser-features', 'stylelint-a11y'],

	/*
	rules: {
		// ignore special `var-` css variables for `:export`
		'property-no-unknown': [
			true,
			{
				ignoreProperties: ['/^var-/'],
			},
		],

		// custom plugins to work with
		'plugin/no-unsupported-browser-features': [
			true,
			{
				severity: 'warning',
				ignore: ['flexbox'],
			},
		],

		// a11y
		'a11y/content-property-no-static-value': true,
	},
	*/
	rules: {
		'scale-unlimited/declaration-strict-value': null,
		'length-zero-no-unit': null,
		'declaration-block-trailing-semicolon': null,
		'selector-list-comma-newline-after': null,
		'csstools/use-nesting': null,
		'a11y/selector-pseudo-class-focus': null,
		'color-format/format': null,
		'color-hex-case': null,
		'color-named': null,
		'max-line-length': null,
		'font-family-no-missing-generic-family-keyword': null,
		'number-no-trailing-zeros': null,
		'a11y/media-prefers-reduced-motion': null,
		'plugin/no-low-performance-animation-properties': null,
		'selector-pseudo-element-colon-notation': null,
		'number-leading-zero': null,
		'block-closing-brace-newline-after': null,
		'no-eol-whitespace': null,
		'no-duplicate-selectors': null,
		'block-opening-brace-space-before': null,
	},
};
