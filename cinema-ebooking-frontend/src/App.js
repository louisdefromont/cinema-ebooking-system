import Carousel from './Carousel';
import logo from './logo.svg';



function App() {
  const items = [
    {
      imageUrl: logo,
      title: 'Item 1'
    },
    {
      imageUrl: logo,
      title: 'Item 2'
    },
    {
      imageUrl: logo,
      title: 'Item 1'
    },
    {
      imageUrl: logo,
      title: 'Item 2'
    },
    {
      imageUrl: logo,
      title: 'Item 1'
    },
    {
      imageUrl: logo,
      title: 'Item 2'
    },
    {
      imageUrl: logo,
      title: 'Item 1'
    },
    {
      imageUrl: logo,
      title: 'Item 2'
    },
    {
      imageUrl: logo,
      title: 'Item 1'
    },
    {
      imageUrl: logo,
      title: 'Item 2'
    },
    {
      imageUrl: logo,
      title: 'Item 1'
    },
    {
      imageUrl: logo,
      title: 'Item 2'
    }
  ];

  return(
    <Carousel items={items} />
  );
}

export default App;
