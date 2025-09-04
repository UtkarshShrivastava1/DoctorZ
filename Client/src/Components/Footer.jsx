import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

function Footer() {
  return (
    <footer className=" w-full bg-[#0f172a] text-white py-10 border-t border-gray-700">
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
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-400">
            <li>
              <a href="/" className="hover:text-blue-500 transition">
                Home
              </a>
            </li>
            <li>
              <a
                href="/userDashboard/about"
                className="hover:text-blue-500 transition"
              >
                About Us
              </a>
            </li>
            <li>
              <a href="/doctors" className="hover:text-blue-500 transition">
                Doctors
              </a>
            </li>
            <li>
              <a href="/labs" className="hover:text-blue-500 transition">
                Labs
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-blue-500 transition">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <p className="text-gray-400">📍 Bhilai, India</p>
          <p className="text-gray-400">📞 +91 98765 43210</p>
          <p className="text-gray-400">✉️ support@DoctorZ.com</p>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-blue-500 transition">
              <Facebook size={20} />
            </a>
            <a href="#" className="hover:text-blue-500 transition">
              <Twitter size={20} />
            </a>
            <a href="#" className="hover:text-blue-500 transition">
              <Instagram size={20} />
            </a>
            <a href="#" className="hover:text-blue-500 transition">
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} MediLab. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;
