import { useContext } from "react";
import { AppThemeContext } from "../../contexts/colors";

export default function SectionDivider() {
	const { colors, dark } = useContext(AppThemeContext);

	return (
		<>
			<div style={{ backgroundColor: dark ? colors.screen : colors.thumb }}>
				<hr aria-hidden="true" style={{ borderTop: `1px solid ${colors.dynamicWhite}`, borderBottom: `1px solid ${colors.dynamicWhite}`, margin: "20px 0px" }} />
			</div>
		</>
	);
}