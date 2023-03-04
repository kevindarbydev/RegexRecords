import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import dashcarousel_explore from "../../../../../public/storage/dashcarousel_explore.jpg";
import dashcarousel_community from "../../../../../public/storage/dashcarousel_community.jpg";
import dashcarousel_marketplace from "../../../../../public/storage/dashcarousel_marketplace.jpg";
dashcarousel_community;
export default function DashCarousel() {
    return (
        <div className="carousel-wrapper m-8">
            <Carousel infiniteLoop useKeyboardArrows autoPlay swipeable>
                <div className="carousel-container h-2/6">
                    <img className=" w-3" src={dashcarousel_explore} />
                    <div class="text-on-image outline">
                        <h1 className="text-8xl text-slate-50 drop-shadow-lg shadow-black">
                            Explore
                        </h1>
                        <p className="text-3xl text-slate-50 drop-shadow-lg shadow-black">
                            Browse featured albums, discover what's new or look
                            for exactly what you need!
                        </p>
                    </div>
                </div>
                <div className="carousel-container h-2/6">
                    <img className=" w-3" src={dashcarousel_community} />
                    <div class="text-on-image outline">
                        <h1 className="text-8xl text-gray-700 drop-shadow-lg shadow-black">
                            Community
                        </h1>
                        <p className="text-3xl text-gray-700 drop-shadow-lg shadow-black">
                            Connect with your friends, chat with other buyers
                            and sellers, share your love of music with others!
                        </p>
                    </div>
                </div>
                <div className="carousel-container h-2/6">
                    <img className=" w-3" src={dashcarousel_marketplace} />
                    <div class="text-on-image outline">
                        <h1 className="text-8xl text-amber-600 drop-shadow-lg shadow-black">
                            Marketplace
                        </h1>
                        <p className="text-3xl text-amber-600 drop-shadow-lg shadow-black">
                            Your online record store. Post albums for sale and
                            buy your most-wanted Wishlist items!
                        </p>
                    </div>
                </div>
            </Carousel>
        </div>
    );
}
