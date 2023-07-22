import React, { useState } from "react";
import { Link } from "react-router-dom";
// import Icon
import { MdOutlineArrowDropDown } from "react-icons/md";
import {PiTextAlignLeftBold} from "react-icons/pi";
import {TbArrowNarrowLeft} from "react-icons/tb";
import {IoCloseCircle} from "react-icons/io5";
// import data
import { categories } from "../data/categories";

function CategoryBar() {
  // Local State
  const [openSubMenu, setOpenSubMenu] = useState('');
  const [hambOpen, setHambOpen] = useState(false);
  // Event Handlers 
  const handleClickOpen = (cat) => {
    setOpenSubMenu(cat);
  };

  const handleClickClose = () => {
    setOpenSubMenu("");
  }

  const handleHoverOpen = (cat) => {
    if (!hambOpen && cat !== openSubMenu) setOpenSubMenu(cat);
  }
  
  const handleHoverClose = () => {
    if (!hambOpen) setOpenSubMenu("");
  };
  
  const openHambMenu = () => {
    setHambOpen(true)
    document.body.style.overflow = 'hidden';
  };

  const closeHambMenu = (e) => {
    const nav = e.currentTarget.firstChild;
    // if clicked area is a link OR outside nav close it
    if (e.target.tagName === 'A' || !nav.contains(e.target)) {
      setHambOpen(false);
      document.body.style.overflow = 'visible';
    }
  }

  return (
    <div className="mb-2 xl:border-b-[1px] xl:border-b-gray-300 max-[1440px]:inline-block">
      {/* All categories button */}
      <button
        className="xl:hidden flex items-center p-1 text-xl rounded-md transition-colors  hover:text-accent"
        onClick={openHambMenu}
      >
        <PiTextAlignLeftBold className="block text-2xl mr-1" />
        ALL CATEGORIES
      </button>
      {/* {hambOpen && (
        <div className="absolute top-0 left-0 w-full h-full z-10 bg-black/50" onClick={closeHambMenu}></div>
      )} */}

      <div
        className={`${
          hambOpen
            ? "absolute top-0 left-0 w-full h-screen z-10 bg-black/70"
            : "max-[1440px]:w-0 max-[1440px]:h-0"
        }`}
        onClick={closeHambMenu}
      >
        <nav
          className={`bg-white rounded-md max-[1440px]:overflow-x-hidden max-[1440px]:absolute max-[1440px]:z-20 max-[1440px]:w-[200px] max-[1440px]:h-screen max-[1440px]:top-0 max-[1440px]:-left-[200px] max-[1440px]:px-4 max-[1440px]:py-2 max-[1440px]:border-x max-[1440px]:border-x-gray-300 max-[1440px]:transition-transform max-[1440px]:duration-[400ms] ${
            hambOpen ? "translate-x-full" : "max-[1440px]:-translate-x-full "
          }`}
        >
          <ul
            className={`flex items-center xl:justify-between xl:gap-x-4 max-[1440px]:flex-col max-[1440px]:justify-start`}
          >
            {hambOpen && (
              <li className="w-full mt-2 mb-4">
                <p className="font-bold">Shop by Category</p>
              </li>
            )}
            {Object.keys(categories).map((cat) => {
              if (cat === "women" || cat === "men") {
                return (
                  <li
                    onMouseLeave={handleHoverClose}
                    className="max-[1440px]:w-full xl:relative"
                    key={cat}
                  >
                    <div
                      className={`${
                        hambOpen ? "py-1" : "py-1.5"
                      } cursor-pointer flex items-center justify-between capitalize select-none hover:text-accent transition-colors`}
                      onClick={() => handleClickOpen(cat)}
                      onMouseEnter={() => handleHoverOpen(cat)}
                    >
                      {cat}{" "}
                      <MdOutlineArrowDropDown
                        className="max-[1440px]:-rotate-90"
                      />
                    </div>
                    <nav
                      className={`absolute top-0 left-0 z-20 bg-white rounded-md px-4 py-2 border border-gray-300 transition-transform xl:w-[125px] xl:mt-9 xl:shadow-lg xl:scale-y-0 xl:origin-top xl:duration-200 max-[1440px]:block max-[1440px]:w-[200px] max-[1440px]:h-screen max-[1440px]:duration-[400ms] ${
                        openSubMenu === cat
                          ? "xl:scale-y-100 max-[1440px]:translate-x-0"
                          : "xl:scale-y-0 max-[1440px]:translate-x-full"
                      }`}
                    >
                      <ul className="flex flex-col xl:gap-y-1">
                        {hambOpen && (
                          <li className="w-full">
                            <button
                              className="flex items-center w-full my-2 transition-colors hover:text-accent"
                              onClick={handleClickClose}
                            >
                              <TbArrowNarrowLeft className="mr-2" />
                              Back
                            </button>
                          </li>
                        )}
                        {Object.keys(categories[cat]).map((subCat) => {
                          return (
                            <li key={subCat}>
                              <Link
                                to={`/${subCat}`}
                                className="block py-1 transition-colors hover:text-accent hover:underline"
                              >
                                {categories[cat][subCat].name}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </nav>
                  </li>
                );
              } else {
                return (
                  <li key={cat} className="max-[1440px]:w-full">
                    <Link
                      to={`/${cat}`}
                      className="block py-1.5 rounded-md capitalize transition-colors hover:text-accent hover:underline"
                    >
                      {cat.replaceAll("-", " ")}
                    </Link>
                  </li>
                );
              }
            })}
          </ul>
        </nav>
        <IoCloseCircle
          className={`xl:hidden max-[1440px]:w-8 max-[1440px]:h-14 max-[1440px]:absolute max-[1440px]:-top-14 max-[1440px]:left-[210px] max-[1440px]:z-10 max-[1440px]:text-white max-[1440px]:cursor-pointer max-[1440px]:transition-all max-[1440px]:duration-[400ms] max-[1440px]:hover:text-black/90 ${
            hambOpen && "translate-y-full"
          }`}
        />
      </div>
    </div>
  );
}

export default CategoryBar;
