import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-[#133D86] px-10 py-2.5 border-b border-[#444] shadow-sm">
      <nav className="max-w-300 mx-auto flex items-center justify-between">
        <div className="flex items-center gap-6 text-[1.1em] font-medium text-[#eee]">
          <Link href="/"><Image src="/ravenue_unram_logo.png" alt="Ravenue" width={250} height={0} /></Link>
        </div>
        <div className="flex items-center space-x-8">
          <Link 
            href="/"
            className="text-[1.1em] font-medium text-[#eee] transition-colors duration-300 ease-in-out hover:text-[#F49D0A]">
            Home
          </Link>
          <Link 
            href="/login"
            className="text-[1.1em] font-medium text-[#eee] transition-colors duration-300 ease-in-out hover:text-[#F49D0A]">
            Login
          </Link>
          <Link 
            href="/booking"
            className="text-[1.1em] font-medium text-[#eee] transition-colors duration-300 ease-in-out hover:text-[#F49D0A]">
            Booking
          </Link>
          <Link 
            href="/management"
            className="text-[1.1em] font-medium text-[#eee] transition-colors duration-300 ease-in-out hover:text-[#F49D0A]">
            Management
          </Link>
        </div>
      </nav>
      
    </header>
  );
}