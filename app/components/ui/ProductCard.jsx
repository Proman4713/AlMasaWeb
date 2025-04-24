import "./ProductCard.css";
import { useContext, useMemo } from "react";
import { AppThemeContext } from "../../contexts/colors";
import logo_landscape from "../../assets/images/logo_landscape.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons/faCartPlus";
import { faHeart } from "@fortawesome/free-solid-svg-icons/faHeart";

export default function ProductCard({ productName="Al-Masa's Product", imgUrl=logo_landscape, price="0" }) {
	const {
		dark,
		colors
	} = useContext(AppThemeContext);

	const productCardStyles = useMemo(() => ({
		container: {
			display: "flex",
			flexDirection: "column",
			backgroundColor: imgUrl === logo_landscape ? colors.almasaMain : "white",//colors.almasaMain,
			backgroundImage: `url(${imgUrl})`,
			backgroundSize: "contain",
			backgroundRepeat: "no-repeat",
			backgroundPosition: "center",
			justifyContent: "center",
			alignContent: "center",
			height: 400,
			width: 600,
			// borderRadius: "40px",
			clipPath: `polygon(
    5% 0%, 95% 0%,    /* Top side */
    100% 5%, 100% 95%, /* Right side */
    95% 100%, 5% 100%, /* Bottom side */
    0% 95%, 0% 5%      /* Left side */
  )`,
		},
		overlay: {
			display: "flex",
			flexDirection: "column",
			flex: 1,
			justifyContent: "space-between",
			padding: "20px",
			background: `linear-gradient(180deg,
				rgba(0, 0, 0, 0.5) 0%,
				rgba(0, 0, 0, 0.25) 20%,
				rgba(0, 0, 0, 0.1) 30%,

				rgba(0, 0, 0, 0.1) 70%,
				rgba(0, 0, 0, 0.25) 80%,
				rgba(0, 0, 0, 0.5) 100%
			)`,
			// borderRadius: "40px"
		},
		cardText: {
			margin: 0,
			fontFamily: "Orbitron, monospace",
		},
		nameText: {
			fontSize: `${45 - ((productName.length - 10) / 3)}px`,
			color: "white"
		},
		priceText: {
			fontSize: "35px",
			textAlign: "right",
			color: "white"
		},
		price: {
			fontFamily: "Inter, sans-serif",
			fontSize: "30px",
			textShadow: `${dark ? "#000" : "#fff"} 0px 0 8px`,
			color: colors.tertiary,
			userSelect: "all",
			msUserSelect: "all",
			WebkitUserSelect: "all",
			MozUserSelect: "all"
		}
	}), [colors, imgUrl, productName]);

	return (
		<>
			<div className="productCard" style={productCardStyles.container}>
				<div style={productCardStyles.overlay}>
					<h1 style={{ ...productCardStyles.cardText, ...productCardStyles.nameText }}>{productName}</h1>
					<div style={{ flexDirection: "row", display: "flex", justifyContent: "space-between" }}>
						<div style={{ flexDirection: "row", display: "flex", justifyContent: "space-between", width: "20%" }}>
							<button aria-label="Add to cart" className="cardActionButton" style={{ color: colors.success }}><FontAwesomeIcon icon={faCartPlus} /></button>
							<button aria-label="Add to wishlist" className="cardActionButton" style={{ color: "red" }}><FontAwesomeIcon icon={faHeart} /></button>
						</div>
						<h1 style={{ ...productCardStyles.cardText, ...productCardStyles.priceText }}>Price: <span style={productCardStyles.price}>{new Intl.NumberFormat('en-US').format(price) + " £"}</span></h1>
					</div>
				</div>
			</div>
		</>
	);
}