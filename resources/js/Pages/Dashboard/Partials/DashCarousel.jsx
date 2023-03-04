import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import dashcarousel_explore from "../../../../../public/storage/dashcarousel_explore.jpg";
import dashcarousel_community from "../../../../../public/storage/dashcarousel_community.jpg";
import dashcarousel_marketplace from "../../../../../public/storage/dashcarousel_marketplace.jpg";
dashcarousel_community;
export default function DashCarousel() {
    return (
        <div className="carousel-wrapper m-auto w-5/6 custom-font-outline">
            <Carousel infiniteLoop useKeyboardArrows autoPlay>
                <a href="/explore">
                    <div className="carousel-container h-2/6">
                        <img src={dashcarousel_explore} />
                        <div class="text-on-image text-teal-900 outline">
                            <h1 className="text-8xl text-rose-400 mb-1">
                                Explore
                            </h1>
                            <p className="text-3xl text-rose-400">
                                Browse featured albums, discover what's new or
                                look for exactly what you need!
                            </p>
                        </div>
                    </div>
                </a>
                <a href="/community/friends">
                    <div className="carousel-container h-2/6">
                        <img src={dashcarousel_community} />
                        <div class="text-on-image outline text-teal-900 w-5/6">
                            <h1 className="text-8xl text-gray-700 mb-1">
                                Community
                            </h1>
                            <p className="text-3xl text-gray-700">
                                Connect with your friends, chat with other
                                buyers and sellers, share your love of music
                                with others!
                            </p>
                        </div>
                    </div>
                </a>
                <a href="/marketplace">
                    <div className="carousel-container h-2/6">
                        <img src={dashcarousel_marketplace} />
                        <div class="text-on-image outline text-teal-900">
                            <h1 className="text-8xl text-amber-600 mb-1">
                                Marketplace
                            </h1>
                            <p className="text-3xl text-amber-600">
                                Your online record store. Post albums for sale
                                and buy your most-wanted Wishlist items!
                            </p>
                        </div>
                    </div>
                </a>
            </Carousel>
        </div>
    );
}
