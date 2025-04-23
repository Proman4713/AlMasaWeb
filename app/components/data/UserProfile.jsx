import { useContext, useEffect, useMemo, useState } from "react";
import "./UserProfile.css";
import { AppThemeContext } from "../../contexts/colors";
import { localeContext } from "../../contexts/localeManagement";
// import { AuthContext } from "../../contexts/accountManagement";
import { Link } from "react-router-dom";
import unknownUserImage from "../../assets/images/unknownUser.png";

const getbase64svgimg = (icon) => {
	// eslint-disable-next-line no-undef
	return Buffer.from(icon, "base64").toString("utf-8");
}

export default function UserProfile() {
	const [isDropdownVisible, setIsDropdownVisible] = useState(false);
	const [isDropdownActive, setIsDropdownActive] = useState(false);
	const { colors } = useContext(AppThemeContext);
	const { locale, appText } = useContext(localeContext)
	// const { identicon, source, loggedIn, userData } = useContext(AuthContext);

	useEffect(() => {
		const handleOutsideClick = (e) => {
			if (e.target.id !== "pfp") {
				setIsDropdownActive(false);
				setTimeout(() => {
					setIsDropdownVisible(false);
				}, 200);
			}
		};

		document.addEventListener("click", handleOutsideClick);
		return () => {
			document.removeEventListener("click", handleOutsideClick);
		};
	}, [isDropdownVisible]);

	function toggleDropdown(e) {
		if (!isDropdownVisible) {
			setIsDropdownVisible(true);
			setTimeout(() => {
				setIsDropdownActive(true);
			}, 50);
		} else {
			setIsDropdownActive(false);
			setTimeout(() => {
				setIsDropdownVisible(false);
			}, 200);
		}
		if (e) {
			e.stopPropagation();
		}
	}

	const profileStyles = useMemo(() => ({
		image: {
			resizeMode: "contain",
			backgroundColor: colors.success,
			borderRadius: 100,
			overflow: "hidden"
		}
	}), [colors]);

	let profileContent = <img
		id="pfp"
		alt=""
		onClick={e => toggleDropdown(e)}
		src={unknownUserImage}
		style={{ ...profileStyles.image, ...{ backgroundColor: colors.secondary, width: "60px", height: "60px" } }}
	/>;

	if (false/*identicon*/) {
		profileContent = <div
			id="pfp"
			onClick={e => toggleDropdown(e)}
			//dangerouslySetInnerHTML={{ __html: getbase64svgimg(identicon).replace("width='460' height='460'", `width='60' height='60' viewBox='0 0 460 460'`).replace(` style='background-color:rgba(29,45,68,1);'`, "") }}
			style={{ ...profileStyles.image, ...{ backgroundColor: colors.secondary, width: "60px", height: "60px" } }}
		/>
	} else if (!colors/*source*/) {
		profileContent = <img
			alt="profile"
			id="pfp"
			width="50px"
			height="50px"
			onClick={toggleDropdown}
			//src={source}
			style={profileStyles.image}
		/>
	}

	const menuItems = [
		{ label: appText["Login"], to: "/auth/login", visible: true/* !loggedIn */ },
		{ label: appText["Settings"], to: `/account/${/* userData["name"] */""}`, visible: false /* loggedIn */ },
		{ label: appText["Sign Up"], to: "/auth/signup", visible: true /* !loggedIn */ },
		{ label: appText["Log Out"], to: "/logout", visible: false /* loggedIn */ }
	];

	return (
		<div>
			{profileContent}

			{isDropdownVisible && (
				<div className="dropdownMenu" style={{
					backgroundColor: colors.primary + "99",
					border: `1px solid ${colors.success + "63"}`,
					transform: `scaleY(${isDropdownActive ? 1 : 0})`,
					transformOrigin: "top",
					transition: "all 200ms ease-out",
					opacity: isDropdownActive ? 1 : 0
				}}>
					<ul>
						{menuItems.filter(item => item.visible).map(item => (
							<Link to={item.to} key={item.label} style={{ textDecoration: "none" }}>
								<li
									onMouseEnter={e => { e.target.style.backgroundColor = colors.success }}
									onMouseLeave={e => { e.target.style.backgroundColor = "" }}
									style={{ textAlign: locale === "ar" ? "right" : "left" }}
								>
									{item.label}
								</li>
							</Link>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}