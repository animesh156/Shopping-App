import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useNavigate } from "react-router-dom";

const topProducts = [
  {
    name: "Amazon Echo Plus",
    image:
      "https://cdn.dummyjson.com/products/images/mobile-accessories/Amazon%20Echo%20Plus/2.png",
    rate: 3,
  },
  {
    name: "Apple Airpods",
    image:
      "https://cdn.dummyjson.com/products/images/mobile-accessories/Apple%20Airpods/1.png",
    rate: 4,
  },
  {
    name: "Monopod",
    image:
      "https://cdn.dummyjson.com/products/images/mobile-accessories/Monopod/2.png",
    rate: 4,
  },

  {
    name: "Man Short Sleeve Shirt",
    image:
      "https://cdn.dummyjson.com/products/images/mens-shirts/Man%20Short%20Sleeve%20Shirt/3.png",
    rate: 5,
  },

  {
    name: "Men Check Shirt",
    image:
      "https://cdn.dummyjson.com/products/images/mens-shirts/Men%20Check%20Shirt/3.png",
    rate: 3,
  },

  {
    name: "Nike Air Jordan ",
    image:
      "https://cdn.dummyjson.com/products/images/mens-shoes/Nike%20Air%20Jordan%201%20Red%20And%20Black/3.png",
    rate: 3,
  },
];

function Carousel() {
  const navigate = useNavigate()

  return (

    <div className="max-w-4xl mx-auto my-10">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={true}
      >
        {topProducts.map((product, index) => (
          <SwiperSlide key={index}>
           <div className="card bg-gray-100 h-80 md:h-96 dark:bg-neutral-900 md:w-64 w-56  shadow-md mx-auto">
<figure className="bg-gradient-to-b from-pink-50 to-pink-200">
  <img className="h-40 md:h-52" src={product.image} alt={product.name} />
</figure>

<div className="m-auto space-y-2">
  <h2 className=" text-center">{product.name}</h2>
  <button className="btn  bg-rose-500" onClick={() => navigate('/login')}>Buy Now</button>

  {/* Rating */}
  <div className="rating rating-xs flex justify-center mt-1 mb-5">
    {[1, 2, 3, 4, 5].map((star) => (
      <input
        key={star}
        type="radio"
        name={`rating-${product.name}`}
        className="mask mask-star-2 bg-red-600"
        aria-label={`${star} star`}
        defaultChecked={product.rate === star}
        disabled
      />
    ))}
  </div>
</div>
</div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Carousel;






