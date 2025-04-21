import { useContext, useEffect, useMemo, useState } from "react";
import "./UserProfile.css";
import { AppThemeContext } from "../../contexts/colors";
import { localeContext } from "../../contexts/localeManagement";
// import { AuthContext } from "../../contexts/accountManagement";
import { Link } from "react-router-dom";
import unknownUserImage from "../../Assets/Images/unknownUser.png";

const getbase64svgimg = (icon) => {
	// eslint-disable-next-line no-undef
	return Buffer.from(icon, "base64").toString("utf-8");
}

export default function UserProfile() {
	const [isDropdownVisible, setIsDropdownVisible] = useState(false);
	const [isDropdownActive, setIsDropdownActive] = useState(false);
	const { colors, dark } = useContext(AppThemeContext);
	const { locale, appText } = useContext(localeContext)
	// const { identicon, source, loggedIn, userData } = useContext(AuthContext);

	useEffect(() => {
		document.addEventListener("click", e => {
			if (e.target.id !== "pfp") {
				setIsDropdownVisible(false);
			}
		})
	}, [])

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

	/**
	 * @type {import("react").MouseEventHandler<HTMLUListElement>}
	 */
	const handleMouseEnter = (event) => {
		event.target.style.backgroundColor = colors().success;
	};

	/**
	 * @type {import("react").MouseEventHandler<HTMLUListElement>}
	 */
	const handleMouseLeave = (event) => {
		event.target.style.backgroundColor = "";
	};

	const profileStyles = useMemo(() => ({
		image: {
			resizeMode: "contain",
			backgroundColor: colors().success,
			borderRadius: 100,
			overflow: "hidden"
		}
	}), [dark])

	return (
		<div>
			{null//source
				? <img
					alt="profile"
					id="pfp"
					width="50px"
					height="50px"
					onClick={toggleDropdown}
					//src={source}
					style={profileStyles.image}
				/>
				: (null//identicon
					? <div
						id="pfp"
						onClick={e => toggleDropdown(e)}
						//dangerouslySetInnerHTML={{ __html: getbase64svgimg(identicon).replace("width='460' height='460'", `width='60' height='60' viewBox='0 0 460 460'`).replace(` style='background-color:rgba(29,45,68,1);'`, "") }}
						style={{ ...profileStyles.image, ...{ backgroundColor: colors().secondary, width: "60px", height: "60px" } }}
					/>
					: <img
						id="pfp"
						alt=""
						onClick={e => toggleDropdown(e)}
						src={unknownUserImage}
						style={{ ...profileStyles.image, ...{ backgroundColor: colors().secondary, width: "60px", height: "60px" } }}
					/>)
				/*<SvgXml style={[headerStyles.image, { backgroundColor: colors().secondary, marginTop: toHeightBasedDigits("3%"), transform: [{ scale: toHeightBasedDigits(1) }] }]} width={60} height={60} />*/
			}

			{isDropdownVisible && (
				<div className="dropdownMenu" style={{
					backgroundColor: colors().primary + "99",
					border: `1px solid ${colors().success + "63"}`,
					transform: `scaleY(${isDropdownActive ? 1 : 0})`,
					transformOrigin: "top",
					transition: "all 200ms ease-out",
					opacity: isDropdownActive ? 1 : 0
				}}>
					<ul>
						{!false/*loggedIn*/ && <Link to="/auth/login" style={{ textDecoration: "none" }}>
							<li
								onMouseEnter={handleMouseEnter}
								onMouseLeave={handleMouseLeave}
								style={{ textAlign: locale === "ar" ? "right" : "left" }}
							>
								{appText["Login"]}
							</li>
						</Link>}
						{false/*loggedIn*/ && <Link to={`/account/${/*userData["name"]*/""}`} style={{ textDecoration: "none" }}>
							<li
								onMouseEnter={handleMouseEnter}
								onMouseLeave={handleMouseLeave}
								style={{ textAlign: locale === "ar" ? "right" : "left" }}
							>
								{appText["Settings"]}
							</li>
						</Link>}
						{!false/*loggedIn*/ && <li
							onMouseEnter={handleMouseEnter}
							onMouseLeave={handleMouseLeave}
							style={{ textAlign: locale === "ar" ? "right" : "left" }}
						>
							{appText["Sign Up"]}
						</li>}
						{false/*loggedIn*/ && <li
							onMouseEnter={handleMouseEnter}
							onMouseLeave={handleMouseLeave}
							style={{ textAlign: locale === "ar" ? "right" : "left" }}
						>
							{appText["Log Out"]}
						</li>}
					</ul>
				</div>
			)}
		</div>
	);
}