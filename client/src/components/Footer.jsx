import React from "react";
import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import { BsDeviceHdd, BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitterX } from "react-icons/bs";
const FooterCom = () => {
  return (
    <Footer container className="border border-t-8 border-teal-500  ">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div className="mt-5 ">
            <Link
              to="/"
              className=" whitespace-nowrap font-semibold dark:text-white text-black text-l"
            >
              <span className="text-emerald-800 px-2 py-1 bg-gradient-to-r from-orange-300 via-red-300 to-pink-400 rounded-lg ">
                {"Aniket's"}
              </span>
              Blog
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8  mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="About" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://www.100jsprojects.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  100 Js Projects
                </Footer.Link>
                <Footer.Link
                  href="/about"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {"Aniket's"} Blog
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="FOllow Us" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://www.github.com/bamof25th"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github
                </Footer.Link>
                <Footer.Link href="#" target="_blank" rel="noopener noreferrer">
                  Discord
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://www.github.com/bamof25th"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Privacy Policy
                </Footer.Link>
                <Footer.Link href="#" target="_blank" rel="noopener noreferrer">
                  Term & Conditions
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex  sm:items-center  sm:justify-between">
          <Footer.Copyright
            href="#"
            year={new Date().getFullYear()}
            by="Aniket Baghel"
          />
        <div className="flex gap-6 mt-4 sm:mt-0 sm:justify-center">
          <Footer.Icon href="#" icon={BsFacebook }  />
          <Footer.Icon href="#" icon={BsTwitterX }  />
          <Footer.Icon href="https://www.github.com/bamof25th" icon={BsGithub }  />
          <Footer.Icon href="#" icon={BsInstagram }  />
          <Footer.Icon href="#" icon={BsDribbble }  />
        </div>
        </div>
      </div>
    </Footer>
  );
};

export default FooterCom;
