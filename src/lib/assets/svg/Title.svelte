<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 100">
	<!-- Background -->
	<!-- <rect width="250" height="100" fill="#0a0a0a" /> -->

	<!-- Main text with glow effect -->
	<defs>
		<filter id="glow">
			<feGaussianBlur stdDeviation="2" result="coloredBlur" />
			<feMerge>
				<feMergeNode in="coloredBlur" />
				<feMergeNode in="SourceGraphic" />
			</feMerge>
		</filter>
	</defs>

	<!-- Decorative circuit lines -->
	<path d="M10 50 L50 50 L70 30 L90 50 L120 50" stroke="#00ff00" stroke-width="1" fill="none" />
	<path d="M280 50 L320 50 L340 70 L360 50 L390 50" stroke="#00ff00" stroke-width="1" fill="none" />

	<!-- Main text -->
	<text
		x="200"
		y="50.5"
		font-family="monospace"
		font-size="25"
		fill="#00ff00"
		text-anchor="middle"
		filter="url(#glow)"
		style="font-weight: bold;">Don't Trust</text
	>
	<text
		x="200"
		y="81"
		font-family="monospace"
		font-size="25"
		fill="#00ff00"
		text-anchor="middle"
		filter="url(#glow)"
		style="font-weight: bold;">Tech.</text
	>

	<!-- Binary background -->
	<text x="20" y="20" fill="#003300" font-family="monospace" font-size="10">01001100</text>
	<text x="350" y="80" fill="#003300" font-family="monospace" font-size="10">10110100</text>
</svg>
