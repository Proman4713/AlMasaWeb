import Carousel from "../components/UI/Carousel";
import HomepageSection from "../components/UI/HomepageSection";
import WebsiteHeader from "../components/WebsiteHeader";
import { Welcome } from "../welcome/welcome";

export function meta() {
	return [
		{ title: "Al-Masa Egypt | Home" }
	];
}

export default function Home() {
	return <>
		<WebsiteHeader />
		<HomepageSection>
			<Carousel>
				<h1>2</h1>
				<h1>3</h1>
				<h1>3</h1>
				<h1>2</h1>
				<h1>2 </h1>
			</Carousel>
		</HomepageSection>
	</>;
}
