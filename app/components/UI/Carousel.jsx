import { useSwipeable } from "react-swipeable";
import { useContext, useEffect, useRef, useState } from "react";
import "./Carousel.css"; // Create this next
import { AppThemeContext } from "../../contexts/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

export default function Carousel({ children, interval=5000 }) {
	const {
		dark,
		colors
	} = useContext(AppThemeContext);

	const [index, setIndex] = useState(0);
	const totalSlides = Array.isArray(children) ? children.length : 1;
	const autoPlayRef = useRef();

	const clampIndex = (i) => (i + totalSlides) % totalSlides;

	const goToSlide = (i) => setIndex(clampIndex(i));

	const swipeHandlers = useSwipeable({
		onSwipedLeft: () => goToSlide(index + 1),
		onSwipedRight: () => goToSlide(index - 1),
		trackMouse: true,
	});

	// Autoplay logic
	useEffect(() => {
		autoPlayRef.current = () => goToSlide(index + 1);
	});

	useEffect(() => {
		const play = () => autoPlayRef.current();
		const intervalId = setInterval(play, interval);
		return () => clearInterval(intervalId);
	}, [interval, index]);

	return (
		<div className="carousel-wrapper">
			<div className="carousel-inner" {...swipeHandlers} style={{ transform: `translateX(-${index * 100}%)` }}>
				{Array.isArray(children)
					? children.map((child, i) => (
						<div className="carousel-item" key={i}>
							{child}
						</div>
					))
					: <div className="carousel-item">{children}</div>}
			</div>
			<button className="nav-button prev" style={{ color: colors().primary }} onClick={() => goToSlide(index - 1)}><FontAwesomeIcon icon={faAngleLeft} /></button>
			<button className="nav-button next" style={{ color: colors().primary }} onClick={() => goToSlide(index + 1)}><FontAwesomeIcon icon={faAngleRight} /></button>
			<div className="carousel-dots">
				{Array.isArray(children) &&
					children.map((_, i) => (
						<button
							key={i}
							className={`dot`}
							style={{ backgroundColor: index === i ? colors().success : "#ccc" }}
							onClick={() => goToSlide(i)}
						/>
					))}
			</div>
		</div>
	);
}