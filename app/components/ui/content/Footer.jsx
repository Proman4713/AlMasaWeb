import "./Footer.css";
import { useContext, useMemo } from "react";
import { AppThemeContext } from "../../../contexts/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone, faScaleBalanced, faSearch, faServer, faShieldHalved } from "@fortawesome/free-solid-svg-icons";
import { faDiscord, faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import logoText from "../../../assets/images/lockup.png"
import { Link } from "react-router";
import { MenuItem, Select } from "@mui/material";

export default function Footer() {
	const { colors, dark } = useContext(AppThemeContext);
	
	const footerStyles = useMemo(() => ({
		container: {
			display: "flex",
			flexDirection: "row",
			backgroundColor: dark ? colors.secondary : "#2B2B2B",
			justifyContent: "space-between",
			alignContent: "center",
			padding: "20px"
		},
		socialIcon: {
			marginRight: 5
		}
	}), [dark])

	return (
		<>
			<div style={footerStyles.container}>
				<div id="company-info">
					<img style={{ maxWidth: "250px" }} src={logoText} alt="lockup" loading="lazy" />
					<p className="footer-text">Al-Masa is one of Egypt&lsquo;s leading emergent technical service companies. Since our establishment in 2007, we have expanded with branches in Cairo and Upper Egypt to ensure that our services are accessible across the country. As proud national agents of HIKVISION, the leading security systems company, we also collaborate with major Egyptian governmental institutions, ensuring that we are able to deliver quality solutions for our customers and their needs.</p>
					<p className="footer-text" style={{ opacity: 1 }}>
						Branches:
						<span style={{ fontSize: "14px" }}>
							<br />Cairo: Bab El-Louk, Next to the Middle East News Agency, Hoda Shaarawy Street&nbsp;&nbsp; — &nbsp;&nbsp;El-Bostan Mall, Downtown&nbsp;&nbsp; — &nbsp;&nbsp;El-Gabarty Mall, Heliopolis
							<br /><br />Minya: Main branch in Sultan&lsquo;s Land, Behind Health Insurance, 36 Nefertiti Street&nbsp;&nbsp; — &nbsp;&nbsp;Above Kasr El-Nil Shoes, Next to El-Habayeb Koshary, El-Husseini Street
							<br /><br />Qena: Al-Balaboushi Building, In front of Banzayon, Above Fawry, Clock Square, Luxor Street
						</span>
					</p>
				</div>
				<div id="links">
					<div id="socials">
						<Link className="social-link"><FontAwesomeIcon style={footerStyles.socialIcon} icon={faFacebook} /> FACEBOOK</Link>
						<Link className="social-link"><FontAwesomeIcon style={footerStyles.socialIcon} icon={faInstagram} /> INSTAGRAM</Link>
						<Link className="social-link"><FontAwesomeIcon style={footerStyles.socialIcon} icon={faPhone} /> TELEPHONE</Link>
						<Link className="social-link"><FontAwesomeIcon style={footerStyles.socialIcon} icon={faEnvelope} /> EMAIL</Link>
						<Link className="social-link"><FontAwesomeIcon style={footerStyles.socialIcon} icon={faScaleBalanced} /> TERMS & CONDITIONS</Link>
					</div>
					<div className="searchInput" style={{ width: "80%", marginLeft: "auto", marginRight: "auto" }}>
						<FontAwesomeIcon style={{ padding: 2, cursor: "pointer", alignSelf: "center" }} fontSize={"2.25em"} icon={faEnvelope} />
						<input type="text" className="searchbox" placeholder="Email Address" />
						<button id="newsletter-signup" type="submit">SIGNUP TO OUR NEWSLETTER</button>
					</div>
					<p id="copyright" className="footer-text" style={{ fontSize: "120%" }}>Copyright © 2023 <span id="company-name">Al-Masa</span></p>
				</div>
			</div>
		</>
	);
}