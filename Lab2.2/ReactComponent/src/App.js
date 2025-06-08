import NavbarComponent from './components/NavbarComponent';
import CarouselComponent from './components/CarouselComponent';
import CardComponent from './components/CardComponent';
import ReservationForm from './components/ReservationForm';

function App() {
  return (
    <div className="bg-dark text-white">
      <NavbarComponent />
      <CarouselComponent />
      <CardComponent />
      <ReservationForm />
    </div>
  );
}

export default App;
