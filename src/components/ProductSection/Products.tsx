import React, { useEffect, useState } from "react";
import "./Products.css";
import LeftArrow from "../assets/icons/LeftArrow";
import RightArrow from "../assets/icons/RightArrow";
import axios from "axios";
import LoadingCategoies, { LoadingProducts } from "./Other";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import LinkIcon from "../assets/icons/LinkIcon";

interface CategoryI {
  loadingCategory: boolean;
  categoryData: string[];
}
interface ProductObjI {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
}

interface ProductDataI {
  loadingProducts: boolean;
  menClothingData: ProductObjI[];
  womensClothingData: ProductObjI[];
  jewelleryData: ProductObjI[];
  electronicsData: ProductObjI[];
}

const Products = () => {
  const [categories, setCategories] = useState<CategoryI>({
    categoryData: [],
    loadingCategory: true,
  });
  const [activeCategory, setActiveCategory] = useState<string | null>(
    "jewelery"
  );
  const [products, setProducts] = useState<ProductDataI>({
    loadingProducts: true,
    menClothingData: [],
    womensClothingData: [],
    jewelleryData: [],
    electronicsData: [],
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards] = useState(3);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + visibleCards < jewelleryData.length
        ? prevIndex + 1
        : prevIndex
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };
  const { categoryData, loadingCategory } = categories;
  const {
    electronicsData,
    jewelleryData,
    loadingProducts,
    menClothingData,
    womensClothingData,
  } = products;
  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products/categories")
      .then((resp) => {
        setCategories({
          categoryData: resp.data,
          loadingCategory: false,
        });
        axios
          .get("https://fakestoreapi.com/products")
          .then((resp) => {
            let tempMenClothingData: ProductObjI[] = [];
            let tempWomenClothingData: ProductObjI[] = [];
            let tempJewelleryData: ProductObjI[] = [];
            let tempElectronicData: ProductObjI[] = [];
            resp.data.forEach((item: any) => {
              let obj: ProductObjI = {
                id: item.id,
                title: item.title,
                image: item.image,
                price: item.price,
                description: item.description,
              };
              if (item.category === "men's clothing")
                tempMenClothingData.push(obj);
              else if (item.category === "jewelery")
                tempJewelleryData.push(obj);
              else if (item.category === "electronics")
                tempElectronicData.push(obj);
              else if (item.category === "women's clothing")
                tempWomenClothingData.push(obj);
            });
            setProducts({
              loadingProducts: false,
              electronicsData: tempElectronicData,
              jewelleryData: tempJewelleryData,
              menClothingData: tempMenClothingData,
              womensClothingData: tempWomenClothingData,
            });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const getActiveProducts = (activeCategory: string | null) => {
    let dataArray: ProductObjI[] = [];
    if (activeCategory === "men's clothing") dataArray = menClothingData;
    else if (activeCategory === "jewelery") dataArray = jewelleryData;
    else if (activeCategory === "electronics") dataArray = electronicsData;
    else if (activeCategory === "women's clothing")
      dataArray = womensClothingData;
    return (
      <div className="product--main--container">
        <div className="carousel--container">
          <div
            className="carousel--inner"
            style={{ transform: `translateX(-${currentIndex * 43}%)` }}
          >
            {dataArray.map((item: ProductObjI) => (
              <div key={item.id} className="product--container">
                <div className="image--container">
                  <img
                    src={item.image}
                    alt="item.image.png"
                    className="product--image"
                  />
                  <div className="link--icon--container">
                    <LinkIcon />
                  </div>
                </div>
                <div className="product--title">
                  {item.title.toLocaleUpperCase()}
                </div>
                <p className="product--description">
                  {item.description.slice(0, 50)}
                </p>
                <strong className="product--price">${item.price}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="products--heading--container">
        <div className="products--left--container">
          <h2 className="product--heading">New products</h2>
        </div>
        <div className="products--right--container">
          <button className="product--btn" onClick={() => handlePrev()}>
            <LeftArrow />
          </button>
          <button className="product--btn" onClick={() => handleNext()}>
            <RightArrow />
          </button>
        </div>
      </div>
      <div className="product--section--container">
        <div className="categories--container">
          {loadingCategory ? (
            <LoadingCategoies />
          ) : (
            <>
              {categoryData.map((item: string, index: number) => (
                <div
                  key={index}
                  className={`category ${
                    activeCategory === item ? "active--category" : ""
                  }`}
                  onClick={() => {
                    setActiveCategory(item);
                    setCurrentIndex(0);
                  }}
                >
                  {item.charAt(0).toLocaleUpperCase() + item.slice(1)}
                </div>
              ))}
            </>
          )}
        </div>
        <div className="product--carousel--section">
          {loadingProducts ? (
            <LoadingProducts />
          ) : (
            getActiveProducts(activeCategory)
          )}
        </div>
      </div>
      <div className="products--button--container--bottom">
        <button className="product--btn" onClick={() => handlePrev()}>
          <LeftArrow />
        </button>
        <button className="product--btn" onClick={() => handleNext()}>
          <RightArrow />
        </button>
      </div>
    </>
  );
};

export default Products;
