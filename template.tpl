{{#each this}}
	{{#each this as |value key|}}
	That is one value and key in here:	{{@key}}: {{value}}
	{{/each}}
{{/each}}
