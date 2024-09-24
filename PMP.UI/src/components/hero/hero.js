import React, { useEffect } from 'react';
import "../../pages/customer/customer.css";

const Hero = () => {
    useEffect(() => {
        const slide = () => {
            let num = 0;
            const rotatorStyle = document.getElementById('rotator').style;
            const intervalId = setInterval(() => {
                num = (num + 1) % 1000;
                rotatorStyle.backgroundPosition = `${-5 * num}px`;
            }, 100);
            return () => clearInterval(intervalId);
        };
        slide();
    }, []);

    return (
        <div
            id="rotator"
            className="relative mt-2"
            style={{
                backgroundImage: "url('https://files.readme.io/d03acb0-Shperical_o_panoramic.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: 'calc(70vh)', // Adjusted height to account for margin
            }}
        >
            {/* Darkened overlay */}
            <div
                className="absolute inset-0 bg-indigo-900 opacity-25"
            ></div>
            {/* Text content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <h1 className="text-5xl font-bold mb-4">Welcome to our Real Estate Portal</h1>
                <p className="text-2xl">Find your dream home with ease</p>
            </div>
        </div>
    );
};

export default Hero;
