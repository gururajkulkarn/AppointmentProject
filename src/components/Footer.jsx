import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div >
          <img className="mb-5 w-40 " src={assets.logo} alt="" />
          <p className="w-full md:w-2/3 text-gray-600 leading-6">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed illo
            ad odio optio. Ad, repellendus illum vel iste maxime eius cumque
            ipsam exercitationem ipsa modi velit eveniet similique architecto
            enim quibusdam iusto accusantium!
          </p>
        </div>


      <div>
        <p className="text-xl font-medium mb-5">Company</p>

        <ul className="flex flex-col gap-2 text-gray-600">
          <li>Home</li>
          <li>About Us</li>
          <li>Contact</li>
          <li>Privacy</li>
        </ul>
      </div>

      <div>
        <p className="text-xl font-medium mb-5">Get In Touch</p>
        <ul className="flex flex-col gap-2 text-gray-600">
          <li>+1-212</li>
          <li>g@gmail.com</li>
        </ul>
      </div>

      </div>
    </div>
  );
};

export default Footer;
