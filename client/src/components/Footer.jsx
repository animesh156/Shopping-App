import { FaGithub } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa";


const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center md:text-left">
          {/* Column 1: Logo & Description */}
          <div>
            <h2 className="text-2xl font-bold text-pink-500">Shopsy</h2>
            <p className="mt-2 text-gray-300">
              Your one-stop shop for exclusive collections and top brands.
            </p>
          </div>

         

          {/* Column 3: Social Media */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Follow Us</h3>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="https://github.com/animesh156" className="hover:text-pink-400">
               <FaGithub size={20}/>
              </a>
              <a href="https://x.com/Animesh47166828" className="hover:text-pink-400">
                <BsTwitterX size={20}/>
              </a>
             
              <a href="https://www.linkedin.com/in/animesh95/" className="hover:text-pink-400">
                <FaLinkedin size={20}/>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="text-center border-t border-gray-700 mt-6 pt-4 text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} Shopsy. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
