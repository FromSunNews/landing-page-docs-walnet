/** @type {import('tailwindcss').Config} */
const svgToDataUri = require("mini-svg-data-uri");

const colors = require("tailwindcss/colors");
const {
	default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

module.exports = {
	darkMode: ["class"],
	content: [
		'./pages/**/*.{ts,tsx,js,jsx,mdx}',
		'./components/**/*.{ts,tsx,js,jsx,mdx}',
		'./app/**/*.{ts,tsx,js,jsx,mdx}',
		'./src/**/*.{ts,tsx,js,jsx,mdx}',
		'./theme.config.tsx',
	],
	prefix: "",
	theme: {
		container: {
			center: 'true',
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				'color-1': 'hsl(var(--color-1))',
				'color-2': 'hsl(var(--color-2))',
				'color-3': 'hsl(var(--color-3))',
				'color-4': 'hsl(var(--color-4))',
				'color-5': 'hsl(var(--color-5))'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				grid: {
					'0%': {
						transform: 'translateY(-50%)'
					},
					'100%': {
						transform: 'translateY(0)'
					}
				},
				'shimmer-slide': {
					to: {
						transform: 'translate(calc(100cqw - 100%), 0)'
					}
				},
				'spin-around': {
					'0%': {
						transform: 'translateZ(0) rotate(0)'
					},
					'15%, 35%': {
						transform: 'translateZ(0) rotate(90deg)'
					},
					'65%, 85%': {
						transform: 'translateZ(0) rotate(270deg)'
					},
					'100%': {
						transform: 'translateZ(0) rotate(360deg)'
					}
				},
				shine: {
					'0%': {
						'background-position': '0% 0%'
					},
					'50%': {
						'background-position': '100% 100%'
					},
					to: {
						'background-position': '0% 0%'
					}
				},
				rainbow: {
					'0%': {
						'background-position': '0%'
					},
					'100%': {
						'background-position': '200%'
					}
				},
				ripple: {
					'0%, 100%': {
						transform: 'translate(-50%, -50%) scale(1)'
					},
					'50%': {
						transform: 'translate(-50%, -50%) scale(0.9)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				grid: 'grid 15s linear infinite',
				'shimmer-slide': 'shimmer-slide var(--speed) ease-in-out infinite alternate',
				'spin-around': 'spin-around calc(var(--speed) * 2) infinite linear',
				shine: 'shine var(--duration) infinite linear',
				rainbow: 'rainbow var(--speed, 2s) infinite linear',
				ripple: 'ripple var(--duration,2s) ease calc(var(--i, 0)*.2s) infinite'
			}
		}
	},
	plugins: [
		addVariablesForColors,
		require("tailwindcss-animate"),
		function ({ matchUtilities, theme }: any) {
			matchUtilities(
				{
					"bg-grid": (value: any) => ({
						backgroundImage: `url("${svgToDataUri(
							`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
						)}")`,
					}),
					"bg-grid-small": (value: any) => ({
						backgroundImage: `url("${svgToDataUri(
							`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="8" height="8" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
						)}")`,
					}),
					"bg-dot": (value: any) => ({
						backgroundImage: `url("${svgToDataUri(
							`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`
						)}")`,
					}),
				},
				{ values: flattenColorPalette(theme("backgroundColor")), type: "color" }
			);
		},
	],
}

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }: any) {
	let allColors = flattenColorPalette(theme("colors"));
	let newVars = Object.fromEntries(
		Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
	);

	addBase({
		":root": newVars,
	});
}