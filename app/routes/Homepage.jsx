import { useState } from "react";
import Carousel from "../components/ui/Carousel";
import HomepageSection from "../components/ui/content/HomepageSection";
import ProductCard from "../components/ui/ProductCard";
import SectionDivider from "../components/ui/content/SectionDivider";
import WebsiteHeader from "../components/WebsiteHeader";
import Footer from "../components/ui/content/Footer";

export function meta() {
	return [
		{ title: "Al-Masa Egypt | Home" },
		{ name: "description", content: "Explore our bestsellers and latest arrivals in tech accessories and devices." },
		{ property: "og:title", content: "Al-Masa Egypt | Home" },
		{ property: "og:description", content: "Explore our bestsellers and latest arrivals in tech accessories and devices." }
	];
}

const bestsellers = [
	{ name: "Dell Latitude 5540 Core™ i7-1355U - 8GB RAM - 512GB ROM - Iris Xe iGPU", price: 54600, img: "https://almasa-egypt.com/product_Img_main/8280293Dell-Vostro-5540.jpg" },
	{ name: "Dell Latitude 5540 Core™ i5-1335U - 8GB RAM - 512GB ROM - Intel iGPU", price: 44100, img: "https://almasa-egypt.com/product_Img_main/6157626Dell-Vostro-5540.jpg" },
	{ name: "Dell Vostro 3520 Core™ i7-1255U - 16GB RAM - 512GB ROM - GeForce MX550 2GB", price: 27300, img: "https://almasa-egypt.com/product_Img_main/9908812Dell%20Vostro%203520%20.jpg" },
	{ name: "Dell Vostro 3520 Core™ i7-1255U - 8GB RAM - 512GB ROM - Intel UHD iGPU", price: 26670, img: "https://almasa-egypt.com/product_Img_main/9908812Dell%20Vostro%203520%20.jpg" },
	{ name: "Dell Vostro 3520 Core™ i5-1235U - 8GB RAM - 512GB ROM - Intel UHD iGPU", price: 20580, img: "https://almasa-egypt.com/product_Img_main/9908812Dell%20Vostro%203520%20.jpg" },
];


export default function Home() {
	return <>
		<WebsiteHeader />
		<HomepageSection sectionTitle="Bestsellers">
			<Carousel>
				{bestsellers.map((item, i) => (
					<ProductCard productName={item.name} price={item.price} imgUrl={item.img} key={i} />
				))}
			</Carousel>
		</HomepageSection>
		<SectionDivider />
		<HomepageSection sectionTitle="New Arrivals">
			<Carousel>
				{Array.from({ length: 5 }).map((_, i) => (
					<ProductCard key={i} />
				))}
			</Carousel>
		</HomepageSection>
		<SectionDivider m={0} />
		<Footer />
	</>;
}
