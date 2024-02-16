import React, { useRef } from 'react';
import './Carousel.css';

export default function Carousel({ items }) {
	const carouselRef = useRef(null);

	const handleLeftClick = () => {
		carouselRef.current.scrollBy({
			left: -400,
			behavior: 'smooth',
		});
	};

	const handleRightClick = () => {
		carouselRef.current.scrollBy({
			left: 400,
			behavior: 'smooth',
		});
	};

	return (
		<div className="carousel-container">
			<div className="carousel" ref={carouselRef}>
				{items.map((item, index) => (
					<div key={index} className="carousel-item">
						<img src={item.imageUrl} alt={item.title} />
						<h3>{item.title}</h3>
					</div>
				))}
			</div>
			<button className="carousel-btn prev" onClick={handleLeftClick}>
				&#10094;
			</button>
			<button className="carousel-btn next" onClick={handleRightClick}>
				&#10095;
			</button>
		</div>
	);
};