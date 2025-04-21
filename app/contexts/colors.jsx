import {
	createContext,
	useCallback,
	useEffect,
	useState
} from "react";

export const AppThemeContext = createContext();

const Appearance = {
	getColorScheme: () => {
		return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light";
	},
	addChangeListener: (func) => {
		const listener = window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
			func(e)
		})
		
		return {
			remove: () => window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', listener)
		}
	}
}

export function AppThemeProvider({
	children
}) {
	const [dark, setDark] = useState(false)
	const [theme, setTheme] = useState("light")

	/**
	 * A function to asynchronously get the application theme.
	 *
	 * @return {boolean} the application theme
	 */
	const getApplicationTheme = async (determinedAutomatic = false) => {
		if (determinedAutomatic === true) {
			const deviceColorScheme = Appearance.getColorScheme();
			setTheme("automatic")
			return deviceColorScheme === 'dark';
		}
		try {
			// Try to get the theme from SecureStore
			if (typeof window === "undefined") return false; // eslint-disable-next-line no-undef
			const themeSetting = localStorage.getItem('theme');

			if (themeSetting !== null && themeSetting !== 'automatic') {
				// If there's a theme set in SecureStore and it's not 'automatic', use it
				setTheme(themeSetting);
				return themeSetting === "dark";
			} else {
				// If the theme is 'automatic' or not set, use the device's color scheme
				const deviceColorScheme = Appearance.getColorScheme();
				setTheme("automatic");
				return deviceColorScheme === 'dark';
			}
		} catch (error) {
			//* console.error('Failed to fetch the theme from localeStorage:', error);
			// Default to light theme in case of any error
			return false;
		}
	}

	/**
	 * Set the runtime theme based on the application theme.
	 *
	 * @return {Promise<void>} 
	 * @param {boolean} determinedAutomatic Whether the theme was determined as automatic
	 */
	const setRuntimeTheme = useCallback(async (determinedAutomatic = false) => {
		const theme = await getApplicationTheme(determinedAutomatic);
		
		setDark(theme);
	}, [])

	useEffect(() => {
		//* console.log("theme changed")
		setRuntimeTheme()
		const sub = Appearance.addChangeListener(() => {
			if (theme === "automatic") {
				setRuntimeTheme(true)
			}
		});
		return () => sub.remove()
	}, [theme])

	/**
	 * Returns an object containing color values based on the value of `dark` variable.
	 *
	 * @returns {object} An object with color values
	 */
	const colors = () => {
		return {
			primary: dark ? "#2e2d2d" : "#F48420",
			secondary: dark ? "#575757" : "#D66B0B",
			tertiary: dark ? "#d3d3d3" : "#8420F4",
			screen: dark ? "#1f1f1f" : "#e3e3e3",

			almasaMain: "#F48420",
			almasaOther: "#2090F4",

			gray: "#5b5b5b",

			constantWhite: "#ffffff",
			dynamicWhite: dark ? "#ffffff" : "#000000",

			constantBlack: "#000000",
			dynamicBlack: dark ? "#000000" : "#ffffff",

			danger: "#F42026",
			warning: "#F4EE20",
			success: dark ? "#0ACD66" : "#2090F4",

			listItem: dark ? "#2e2d2d" : "#f4f8f8",
			thumb: dark ? "#0ACD66" : "#D8DBE2",
			track: dark ? null : "#737373",
			placeholder: "#ffffffee",
			lightButton: "#0A3200"
		}
	}

	return (
		<AppThemeContext.Provider value={
			{
				dark,
				getApplicationTheme,
				setRuntimeTheme,
				colors,
				theme
			}
		}>
			{children}
		</AppThemeContext.Provider>
	)
}