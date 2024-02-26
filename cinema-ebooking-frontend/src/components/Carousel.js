import React, { useRef, useState } from 'react';
import './Carousel.css';
// import Modal from './Modal';
import ReactPlayer from 'react-player';
import Button from '@mui/material/Button';

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

	// Temp trailer player
	const[tUrl, setTUrl] = useState("");
	const[openTrailer, setOpenTrailer] = useState(false);
 
	//Modal
	// const[openModal, setOpenModal] = useState(false);
	// const[test, setTest] = useState([]);

	return (
	<>
		<div className="carousel-container">
			<div className="carousel" ref={carouselRef}>
				{items.map((item, index) => (
					<div key={index} className="carousel-item" onClick={item.onClick}>
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

		<div className='tContainer'>
			
			{openTrailer && <button
            	onClick={() => {
                setOpenTrailer(false);
              	}}
				className='titleCloseBtn'
            	> close </button>
			}
			{openTrailer && <ReactPlayer className='trailer' url={tUrl} />}
			
		</div>
	</>
	);
};