"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Login() {
    const [showPassword, setShowPassword] =  useState(false);
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md flex flex-col items-center">
                <div className="mb-6">
                    <h1 className="text-3xl sm:text-3xl font-bold text-[#133D86] tracking-tight">
                        Login
                    </h1>
                </div>
                <form className="w-full flex flex-col gap-4">
                    <input 
                        type="text" 
                        placeholder="Email" 
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#133D86]"
                    />
                    <div className="relative w-full">
                        <input 
                            type={showPassword ? "text" : "password"} 
                            placeholder="Password" 
                            className="w-full px-4 py-2 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#133D86]"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                            {showPassword ? (
                                <Image src="/openeye.png" alt="Open Eye" width={20} height={20} />
                            ) : (
                                <Image src="/closeeye.png" alt="Close Eye" width={20} height={20} />
                            )}
                        </button>
                    </div>
                    <button 
                        type="submit" 
                        className="w-full bg-[#133D86] text-white py-2 rounded-md font-semibold hover:bg-[#0d2a5e] transition duration-200"
                    >
                        Login
                    </button>
                    <div>
                        <p className="text-gray-600 text-left text-sm leading-relaxed">
                            Belum punya akun?
                            <Link 
                                href="/register"
                                className="text-[#F4B042] ml-1 text-sm transition-colors duration-300 ease-in-out hover:text-[#b88431]">
                                Daftar disini
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}