import { useSwipeable } from "react-swipeable";
import { useContext, useEffect, useRef, useState } from "react";
import "./Carousel.css";
import { AppThemeContext } from "../../contexts/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

export default function Carousel({ children, interval=5000 }) {
	const {
		dark,
		colors
	} = useContext(AppThemeContext);

	const [paused, setPaused] = useState(false);
	const [index, setIndex] = useState(0);

	const slides = Array.isArray(children) ? children : [children];
	const totalSlides = Array.isArray(children) ? children.length : 1;

	const clampIndex = (i) => (i + totalSlides) % totalSlides;

	const goToSlide = (i) => setIndex(clampIndex(i));

	const swipeHandlers = useSwipeable({
		onSwipedLeft: () => goToSlide(index + 1),
		onSwipedRight: () => goToSlide(index - 1),
		trackMouse: true,
	});

	// Autoplay logic
	useEffect(() => {
		if (paused) return;
		const intervalId = setInterval(() => {
			setIndex(prev => clampIndex(prev + 1));
		}, interval);
		return () => clearInterval(intervalId);
	}, [paused, interval, totalSlides]);

	return (
		<div className="carousel-wrapper" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
			<div className="carousel-inner" {...swipeHandlers} style={{ transform: `translateX(-${index * 100}%)` }}>
				{slides.map((child, i) => (
					<div className="carousel-item" key={i}>
						{child}
					</div>
				))}
			</div>
			<button aria-label="Previous slide" className="nav-button prev" style={{ color: dark ? colors.tertiary : colors.primary }} onClick={() => goToSlide(index - 1)}><FontAwesomeIcon icon={faAngleLeft} /></button>
			<button aria-label="Next slide" className="nav-button next" style={{ color: dark ? colors.tertiary : colors.primary }} onClick={() => goToSlide(index + 1)}><FontAwesomeIcon icon={faAngleRight} /></button>
			<div className="carousel-dots">
				{slides.length > 1 &&
					slides.map((_, i) => (
						<button
							key={i}
							className={`dot`}
							style={{ backgroundColor: index === i ? colors.success : "#ccc" }}
							onClick={() => goToSlide(i)}
						/>
				))}
			</div>
		</div>
	);
}