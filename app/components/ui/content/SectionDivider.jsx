import { useContext } from "react";
import { AppThemeContext } from "../../../contexts/colors";

export default function SectionDivider({ m=20 }) {
	const { colors, dark } = useContext(AppThemeContext);

	return (
		<>
			<div style={{ backgroundColor: dark ? colors.screen : colors.thumb }}>
				<hr aria-hidden="true" style={{ borderTop: `1px solid ${colors.dynamicWhite}`, borderBottom: `1px solid ${colors.dynamicWhite}`, margin: `${m}px 0px` }} />
			</div>
		</>
	);
}