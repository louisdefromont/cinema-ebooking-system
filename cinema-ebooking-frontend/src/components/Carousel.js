import React, { useEffect, useRef, useState } from 'react';
import './Carousel.css';
import ReactPlayer from 'react-player';

export default function Carousel({ items, search }) {
	const carouselRef = useRef(null);
	const [newItems, setNewItems] = useState(items);

	const handleLeftClick = () => {
		carouselRef.current.scrollBy({
			left: -600,
			behavior: 'smooth',
		});
	};

	const handleRightClick = () => {
		carouselRef.current.scrollBy({
			left: 600,
			behavior: 'smooth',
		});
	};

	useEffect(() => {
		if(search === '<') {
			const filteredItems = items.filter((item) =>
            	new Date(item.date) - new Date() < 0
        	);
        
        	setNewItems(filteredItems);
		}else if (search === '>') {
			const filteredItems = items.filter((item) =>
            	new Date(item.date) - new Date() > 0
        	);
        
        	setNewItems(filteredItems);
		} else {
			const filterTerm = search;
        	const filteredItems = items.filter((item) =>
            item.genres.toLowerCase().includes(filterTerm.toLowerCase())
        	);
        
        	setNewItems(filteredItems);
		}
	}, [search, items]);

	// trailer player
	const[tUrl, setTUrl] = useState("");
	const[openTrailer, setOpenTrailer] = useState(false);

	return (
	<>
		<div className="carousel-container">
			<div className="carousel" ref={carouselRef}>
				{newItems.map((item, index) => (
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