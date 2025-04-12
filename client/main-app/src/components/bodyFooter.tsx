import Link from "next/link"
import { Facebook, Twitter, Instagram , MapPin, Phone, Mail } from 'lucide-react'
import { Youtube } from 'lucide-react';

function BodyFooter() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 px-6 sm:px-10 py-12 bg-gray-900">
      {/* Column 1 - About */}
      <div className="col-span-2 md:col-span-1">
        <h3 className="text-white font-bold mb-6 text-xl">About Us</h3>
        <p className="text-gray-400 mb-6 text-sm leading-relaxed">
          Cinevie+ is Vietnam's premier cinema experience, offering the latest movies in state-of-the-art theaters with exceptional comfort and service.
        </p>
        <div className="flex space-x-4">
          <Link href="#" className="w-9 h-9 rounded-full bg-gray-800 hover:bg-red-600 flex items-center justify-center text-gray-300 hover:text-white transition-colors">
            <Facebook size={18} />
          </Link>
          <Link href="#" className="w-9 h-9 rounded-full bg-gray-800 hover:bg-red-600 flex items-center justify-center text-gray-300 hover:text-white transition-colors">
            <Twitter size={18} />
          </Link>
          <Link href="#" className="w-9 h-9 rounded-full bg-gray-800 hover:bg-red-600 flex items-center justify-center text-gray-300 hover:text-white transition-colors">
            <Instagram size={18} />
          </Link>
          <Link href="#" className="w-9 h-9 rounded-full bg-gray-800 hover:bg-red-600 flex items-center justify-center text-gray-300 hover:text-white transition-colors">
            <Youtube size={18} />
          </Link>
        </div>
      </div>

      {/* Column 2 - Quick Links */}
      <div>
        <h3 className="text-white font-bold mb-6 text-xl">Quick Links</h3>
        <ul className="text-gray-400 space-y-3">
          <li className="transition-transform hover:translate-x-1">
            <Link href="#" className="hover:text-red-500 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
              Get in Touch
            </Link>
          </li>
          <li className="transition-transform hover:translate-x-1">
            <Link href="#" className="hover:text-red-500 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
              Help Center
            </Link>
          </li>
          <li className="transition-transform hover:translate-x-1">
            <Link href="#" className="hover:text-red-500 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
              Live Chat
            </Link>
          </li>
          <li className="transition-transform hover:translate-x-1">
            <Link href="#" className="hover:text-red-500 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
              How it Works
            </Link>
          </li>
          <li className="transition-transform hover:translate-x-1">
            <Link href="#" className="hover:text-red-500 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
              FAQs
            </Link>
          </li>
        </ul>
      </div>

      {/* Column 3 - Our Brands */}
      <div>
        <h3 className="text-white font-bold mb-6 text-xl">Our Brands</h3>
        <ul className="text-gray-400 space-y-3">
          <li className="transition-transform hover:translate-x-1">
            <Link href="#" className="hover:text-red-500 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
              Cinevie+ Sư Vạn Hạnh
            </Link>
          </li>
          <li className="transition-transform hover:translate-x-1">
            <Link href="#" className="hover:text-red-500 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
              Cinevie+ Hùng Vương
            </Link>
          </li>
          <li className="transition-transform hover:translate-x-1">
            <Link href="#" className="hover:text-red-500 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
              Cinevie+ Hoàng Văn Thụ
            </Link>
          </li>
        </ul>
      </div>

      {/* Column 4 - Contact */}
      <div className="col-span-2 md:col-span-1">
        <h3 className="text-white font-bold mb-6 text-xl">Contact Us</h3>
        <ul className="text-gray-400 space-y-4">
          <li className="flex items-start gap-3">
            <MapPin size={20} className="text-red-500 mt-1 flex-shrink-0" />
            <span>QL22 District, HUFLIT Campus Hóc Môn </span>
          </li>
          <li className="flex items-center gap-3">
            <Phone size={20} className="text-red-500 flex-shrink-0" />
            <span>+84 (0) 123 456 789</span>
          </li>
          <li className="flex items-center gap-3">
            <Mail size={20} className="text-red-500 flex-shrink-0" />
            <span>support@cinevie.com</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default BodyFooter
