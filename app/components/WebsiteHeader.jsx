import "./WebsiteHeader.css";
import React, { memo, useCallback, useContext, useEffect, useState } from 'react';
import Sticky from 'react-stickynode';
import { AppThemeContext } from '../contexts/colors';
import { localeContext } from "../contexts/localeManagement";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons/faCartShopping";
import { faLayerGroup } from "@fortawesome/free-solid-svg-icons/faLayerGroup";
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";
import { faPhone } from "@fortawesome/free-solid-svg-icons/faPhone";
import { faSearch } from "@fortawesome/free-solid-svg-icons/faSearch";
import UserProfile from "./data/UserProfile";
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import logoText from "../assets/images/lockup.png"
import { MenuItem, Select } from "@mui/material";
import { useScrollStyling } from "../utils/useScrollStyling";

const SecondaryNavItem = ({ text, id="", icon, target="/", onClick=() => { }, internal=true }) => {
	const { appText } = useContext(localeContext);
	
	return (
		<li className="nav-item" id={id} onClick={onClick}>
			{ icon && <><FontAwesomeIcon icon={icon} fontSize={"1.25em"} /> &nbsp;&nbsp;</> }
			<Link to={target} target={internal ? "" : "_blank"}>
				{appText[text] || text}
			</Link>
		</li>
	)
}

export default function WebsiteHeader({
	showAppName = true,
	// headerTitle="",
	forceBG="translucent",
	drawer=false,
	drawerOpen=false,
	setDrawerOpen=() => {},
	drawerTitle="Drawer Title",
	drawerItems = [
		{
			text: "Item 1",
			onClick: () => {},
			active: true
		},
		{
			text: "Item 2",
			onClick: () => {}
		}
	]
}) {
	const { colors, dark } = useContext(AppThemeContext);
	const { locale, appText } = useContext(localeContext);
	useScrollStyling(colors, forceBG);
	
	const [selectedSearchCategory, setSelectedSearchCategory] = useState("all");

	return (
		<>
			<Sticky enabled innerZ={100} className="height-max-content">
				<header
					style={{ background: colors.primary, marginBottom: 0 }}
					id="header"
					className={forceBG === "opaque" ? "" : "header-transparent"}
				>
					<div className="header-container">
						{(drawer && !showAppName)
							? <>
								<Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} slotProps={{ paper: { style: { backgroundColor: dark ? colors.primary : "#3d3d3d" } } }}>
									<Box sx={{ width: 300 }} role="presentation">
										<ListItem key={"text"} className={"drawer-header"} disablePadding>
											<ListItemButton style={{ color: colors.constantWhite }}>
												<ListItemText primary={drawerTitle} />
											</ListItemButton>
										</ListItem>
										<Divider />
										<List>
											{drawerItems.map((item, index) => (
												<ListItem key={item.text} className={item.active ? "active" : ""} disablePadding>
													<ListItemButton onClick={item.onClick} style={{ color: colors.constantWhite }}>
														<ListItemText sx={{ textAlign: locale === "ar" ? "right" : "left" }} primary={item.text} />
													</ListItemButton>
												</ListItem>
											))}
										</List>
									</Box>
								</Drawer>
							</>
							: null}
						{showAppName && <Link to="/">
							<img
								src={logoText}
								alt="Logo"
								id="headerTextLogo"
								loading="lazy"
							/>
						</Link>}
						{(drawer && !showAppName)
							? <FontAwesomeIcon
								icon={faBars}
								size="2x"
								color="white"
								style={{
									cursor: "pointer",
									// marginLeft: -30,
									marginRight: 20,
									userSelect: "none",
									msUserSelect: "none",
									WebkitUserSelect: "none",
									MozUserSelect: "none"
								}}
								onClick={() => setDrawerOpen(!drawerOpen)}
							/>
							: null}
						<nav className="desktop nav">
							<ul className="main-nav">
								<li className="nav-item nav-link"><Link to={"/"}>{appText["Home"]}</Link></li>
								<li className="nav-item nav-link">{appText["About"]}</li>
							</ul>
							{/* {headerTitle && <h2 style={{ fontSize: 22, color: colors.success }}>{headerTitle}</h2>} */}
							<div id="middleSearch" className="searchInput">
								<Select
									id="categorySelect"
									value={selectedSearchCategory}
									onChange={(e) => setSelectedSearchCategory(e.target.value)}
									displayEmpty
									inputProps={{ 'aria-label': 'Without label' }}
								>
									<MenuItem value="all">All</MenuItem>
									<MenuItem value="mice">Mice</MenuItem>
									<MenuItem value="keyboards">Keyboards</MenuItem>
									<MenuItem value="laptops">Laptops</MenuItem>
									<MenuItem value="pcs">Tower PCs</MenuItem>
									<MenuItem value="monitors">Monitors</MenuItem>
								</Select>
								<input type="text" className="searchbox" placeholder="Search" />
								<FontAwesomeIcon color={colors.almasaMain} style={{ padding: 2, cursor: "pointer", alignSelf: "center" }} icon={faSearch} fontSize={"2.25em"} />
							</div>
							<ul className="secondary-nav">
								<SecondaryNavItem icon={faCartShopping} text="Shop" />
								<SecondaryNavItem id="categories" icon={faLayerGroup} text="Categories" />
								<SecondaryNavItem target="tel:201017221615" internal={false} icon={faPhone} text="Telephone" />
							</ul>
						</nav>
						<UserProfile />
					</div>
				</header>
			</Sticky>
		</>
	);
}