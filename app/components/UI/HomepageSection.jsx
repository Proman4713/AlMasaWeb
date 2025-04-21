import { useContext, useMemo } from "react";
import { AppThemeContext } from "../../contexts/colors";

export default function HomepageSection({ children }) {
	const {
		dark,
		colors
	} = useContext(AppThemeContext);

	const sectionStyles = useMemo(() => ({
		container: {
			display: "flex",
			flexDirection: "column",
			backgroundColor: colors().screen,
			justifyContent: "center",
			alignContent: "center",
			height: "100vh",
			width: "100vw"
		}
	}), [dark])
	return (
		<>
			<div style={sectionStyles.container}>
				{children}
			</div>
		</>
	);
}