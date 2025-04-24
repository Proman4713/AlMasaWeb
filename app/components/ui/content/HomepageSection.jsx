import { useContext, useMemo } from "react";
import { AppThemeContext } from "../../../contexts/colors";

export default function HomepageSection({ sectionTitle="", id="", children }) {
	const { colors, dark } = useContext(AppThemeContext);

	const sectionStyles = useMemo(() => ({
		container: {
			display: "flex",
			flexDirection: "column",
			backgroundColor: dark ? colors.screen : colors.thumb,
			justifyContent: "center",
			alignContent: "center",
			minHeight: "100vh"
		},
		sectionTitle: {
			color: colors.almasaMain,
			textAlign: "center",
			fontSize: "45px",
			// fontWeight: "bold",
			fontFamily: "'Jersey 25', monospace",
			letterSpacing: "1px",
			WebkitTextStroke: `0.0625px ${colors.dynamicWhite}`,
		}
	}), [colors])
	
	return (
		<>
			<section id={id} style={sectionStyles.container}>
				<h1 style={sectionStyles.sectionTitle}>{sectionTitle}</h1>
				{children}
			</section>
		</>
	);
}