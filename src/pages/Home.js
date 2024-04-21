import NavBar from "../features/navbar/Navbar";
import ProductList from "../features/product/components/ProductList";
import Navigation from "../features/navbar/Navigation";
import ImageCarousel from "../features/carousel/Categories.js";
import Slider from "../features/slider/Slider.js";
import Tabs from "../features/Tabs/Tabs.js";
import { Fragment, useState, useEffect } from 'react';

import { Link } from "react-router-dom";
import { selectLoggedInUser } from "../features/auth/authSlice.js";
import { useSelector } from 'react-redux';

function Home() {
    const user = useSelector(selectLoggedInUser);
    const homePageSlides = [
        "https://i.pinimg.com/originals/51/82/ac/5182ac536727d576c78a9320ac62de30.jpg",
        "https://wallpapercave.com/wp/wp3386769.jpg",
        "https://wallpaperaccess.com/full/809523.jpg",
        "https://getwallpapers.com/wallpaper/full/5/c/0/606489.jpg",
    ];

    return (
        <div className="w-full">
            {user ? (
                <NavBar>
                    <div className="flex flex-col max-h-[45vh]">
                        <Slider slides={homePageSlides} />
                    </div>
                    <Tabs />
                    <ImageCarousel />
                    <ProductList />
                </NavBar>
            ) : (
                <div className="flex flex-col max-h-[45vh]">
                    <Slider slides={homePageSlides} />
                    <Tabs />
                    <ImageCarousel />
                    <ProductList />
                </div>
            )}
        </div>
    );
}

export default Home;
