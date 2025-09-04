import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#0f172a] text-white py-10 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Logo & About */}
        <div>
          <h2 className="text-2xl font-bold text-blue-500">DoctorZ</h2>
          <p className="mt-3 text-sm text-gray-400 leading-relaxed">
            Providing trusted healthcare services with care and innovation. We
            are committed to your health and well-being.
          </p>
        </div>

        {/* Quick Links */}
        <nav aria-label="Footer">
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-400">
            <li>
              <Link to="/" className="hover:text-blue-500 transition">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/userDashboard/about"
                className="hover:text-blue-500 transition"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link to="/doctor/all" className="hover:text-blue-500 transition">
                Doctors
              </Link>
            </li>
            <li>
              <Link to="/labs" className="hover:text-blue-500 transition">
                Labs
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-blue-500 transition">
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <p className="text-gray-400">📍 Bhilai, India</p>
          <p className="text-gray-400">
            📞{" "}
            <a
              href="tel:+919876543210"
              className="hover:text-blue-500 transition"
            >
              +91 98765 43210
            </a>
          </p>
          <p className="text-gray-400">
            ✉️{" "}
            <a
              href="mailto:support@doctorz.com"
              className="hover:text-blue-500 transition"
            >
              support@doctorz.com
            </a>
          </p>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-blue-500 transition"
            >
              <Facebook size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="hover:text-blue-500 transition"
            >
              <Twitter size={20} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-blue-500 transition"
            >
              <Instagram size={20} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-blue-500 transition"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-gray-500 text-sm">
        © {year} • powered by{" "}
        <a
          href="https://www.zager.in"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 underline underline-offset-2"
        >
          Zager Digital Services
        </a>
      </div>
    </footer>
  );
}

export default Footer;
