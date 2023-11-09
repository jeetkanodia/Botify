import { useState } from "react";
import { NavLink } from "react-router-dom";
import { RiCloseLine } from "react-icons/ri";

import logo from "../assets/logo.png";
import { links } from "../assets/constants";

const NavLinks = ({ handleClick }) => {
  return (
    <div className="mt-10">
      {links.map((link) => (
        <NavLink
          key={link.name}
          to={link.to}
          className="flex flex-row justify-start items-center my-8 text-sm font-medium text-gray-400 hover:text-cyan-400"
          onClick={() => handleClick && handleClick()}
        >
          <link.icon className="w-6 h-6 mr-2" />
          {link.name}
        </NavLink>
      ))}
    </div>
  );
};

const Sidebar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <div className="md:flex hidden flex-col py-10 w-[240px] px-4 bg-[#191624] ">
        <img src={logo} alt="logo" className="w-full h-14 object-contain" />
        <NavLinks />
      </div>
    </>
  );
};

export default Sidebar;
