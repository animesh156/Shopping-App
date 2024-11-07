import { Carousel } from "@material-tailwind/react";

function Carasouel() {
  return (
    <>
      <Carousel
        className="mb-10 "
        autoplay={true}
        loop={true}
        autoplayDelay={4000}
        prevArrow={({ handlePrev }) => (
          <button onClick={handlePrev} className="absolute top-1/2 left-0 transform -translate-y-1/2 text-red-500  hover:text-red-700">
            &#9664; {/* Left arrow icon */}
          </button>
        )}
        nextArrow={({ handleNext }) => (
          <button onClick={handleNext} className="absolute top-1/2 right-0 transform -translate-y-1/2 text-red-500  hover:text-red-700">
            &#9654; {/* Right arrow icon */}
          </button>
        )}
      >
        <img
          src="https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg"
          alt="image 1"
          className="h-80 w-full object-scale-down px-6"
        />
        <img
          src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
          alt="image 2"
          className="h-80 w-full object-scale-down px-6"
        />
        <img
          src="https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg"
          alt="image 3"
          className="h-80 w-full object-scale-down px-6"
        />

<img
          src="https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg"
          alt="image 3"
          className="h-80 w-full object-scale-down px-6"
        />

<img
          src="https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg"
          alt="image 3"
          className="h-80 w-full object-scale-down px-6"
        />

<img
          src="https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg"
          alt="image 3"
          className="h-80 w-full object-scale-down px-6"
        />

      </Carousel>
    </>
  );
}

export default Carasouel;
