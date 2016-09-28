{{#each this}}
	{{#each this as |value key|}}
		{{@key}}: {{value}}
	{{/each}}
{{/each}}
