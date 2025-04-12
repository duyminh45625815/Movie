import Link from "next/link"

function EndFooter() {
  return (
    <div className="w-full flex flex-col md:flex-row md:justify-between items-center px-6 sm:px-10 py-6 text-gray-400 text-sm bg-gray-900/80">
      <div className="mb-4 md:mb-0 text-center md:text-left">
        © 2024 <span className="text-red-500">Cinevie+</span>. All rights reserved.
      </div>

      <div className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2 mb-4 md:mb-0">
        <Link href="#" className="hover:text-red-500 transition-colors">
          Terms & Conditions
        </Link>
        <Link href="#" className="hover:text-red-500 transition-colors">
          Privacy Policy
        </Link>
        <Link href="#" className="hover:text-red-500 transition-colors">
          Cookie Policy
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-xs text-gray-500">Payment Methods:</span>
        <div className="flex gap-2">
          <div className="w-10 h-6 bg-gray-800 rounded flex items-center justify-center">
            <span className="text-xs font-bold text-blue-500">VISA</span>
          </div>
          <div className="w-10 h-6 bg-gray-800 rounded flex items-center justify-center">
            <span className="text-xs font-bold text-red-500">MC</span>
          </div>
          <div className="w-10 h-6 bg-gray-800 rounded flex items-center justify-center">
            <span className="text-xs font-bold text-yellow-500">PP</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EndFooter

