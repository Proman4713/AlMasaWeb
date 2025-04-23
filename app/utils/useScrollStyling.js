import { useEffect } from "react";

export function useScrollStyling(colors, forceBG) {
	useEffect(() => {
		function scrollFunction() {
			const header = document.querySelector("header");
			if (!header) return;

			if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
				header.style.padding = '5px 10px';
				if (forceBG === "translucent") return;
				header.classList.remove('header-transparent');
			} else {
				header.style.padding = '24px 10px';
				if (forceBG === "opaque") return;
				header.classList.add('header-transparent');
			}
		}

		const changeHeaderStyles = () => {
			const innerWrapper = document.querySelector(".sticky-inner-wrapper");
			const outerWrapper = document.querySelector(".sticky-outer-wrapper");
			if (innerWrapper && outerWrapper) {
				const rect = outerWrapper.getBoundingClientRect();
				innerWrapper.style.width = (rect.width || rect.right - rect.left) + "px";
			}
		};

		const handleScroll = () => {
			scrollFunction();
			setTimeout(changeHeaderStyles, 20);
		};

		window.addEventListener("scroll", handleScroll);
		window.addEventListener("resize", changeHeaderStyles);

		changeHeaderStyles();

		return () => {
			window.removeEventListener("scroll", handleScroll);
			window.removeEventListener("resize", changeHeaderStyles);
		};
	}, [colors]);
}