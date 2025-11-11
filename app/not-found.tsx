// app/not-found.tsx
import Link from "next/link";
import { Home, ShoppingBag, Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-32 w-80 h-80 bg-[#8BBE67] rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-[#6F8F58] rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#A8D672] rounded-full mix-blend-multiply filter blur-xl opacity-5 animate-pulse delay-500"></div>
        </div>

        {/* Main Content */}
        <div className="relative z-10">
          {/* Logo/Brand */}
          <div className="mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-[#8BBE67] to-[#6F8F58] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-2xl font-bold text-white">Z</span>
            </div>
            <h1 className="text-2xl font-bold text-[#8BBE67]">
              Zarwa Organics
            </h1>
          </div>

          {/* 404 Number */}
          <div className="mb-8">
            <div className="text-9xl font-bold text-gray-800 mb-4 relative">
              <span className="bg-gradient-to-br from-[#8BBE67] to-[#6F8F58] bg-clip-text text-transparent">
                404
              </span>
              <div className="absolute -inset-4 bg-gradient-to-r from-[#8BBE67] to-[#6F8F58] rounded-full blur-lg opacity-20 -z-10"></div>
            </div>
          </div>

          {/* Message */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Oops! Page Not Found
            </h2>
            <p className="text-lg text-gray-600 max-w-md mx-auto leading-relaxed">
              The page you're looking for seems to have grown away. Don't worry
              - even the best hair needs proper navigation!
            </p>
          </div>

          {/* Illustration/Icon */}
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#8BBE67] to-[#6F8F58] rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute inset-4 bg-white rounded-full shadow-lg flex items-center justify-center">
                <div className="text-4xl">🌿</div>
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white text-sm font-bold">?</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button
              asChild
              className="bg-[#8BBE67] hover:bg-[#6F8F58] text-white px-8 py-3 text-base font-semibold shadow-lg transition-all duration-200 hover:scale-105"
            >
              <Link href="/" className="flex items-center gap-2">
                <Home className="w-5 h-5" />
                Back to Home
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="border-[#8BBE67] text-[#8BBE67] hover:bg-[#8BBE67] hover:text-white px-8 py-3 text-base font-semibold transition-all duration-200 hover:scale-105"
            >
              <Link href="/shop" className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                Continue Shopping
              </Link>
            </Button>
          </div>

          {/* Help Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-green-100 shadow-sm max-w-md mx-auto">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center justify-center gap-2">
              <Phone className="w-5 h-5 text-[#8BBE67]" />
              Need Help?
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              Can't find what you're looking for? Our team is here to help!
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="text-[#8BBE67] hover:text-[#6F8F58]"
              >
                <Link href="https://wa.me/923143988998" target="_blank">
                  💬 WhatsApp Support
                </Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="text-[#8BBE67] hover:text-[#6F8F58]"
              >
                <Link href="tel:03143988998">📞 Call Us</Link>
              </Button>
            </div>
          </div>

          {/* Fun Facts */}
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500 italic">
              While you're here, did you know? Our hair growth oil contains 100%
              natural ingredients! 🌱
            </p>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="fixed bottom-10 left-10 animate-bounce">
        <div className="w-6 h-6 bg-[#8BBE67] rounded-full opacity-20"></div>
      </div>
      <div className="fixed top-20 right-20 animate-bounce delay-300">
        <div className="w-4 h-4 bg-[#6F8F58] rounded-full opacity-30"></div>
      </div>
      <div className="fixed bottom-32 right-32 animate-pulse">
        <div className="w-8 h-8 bg-[#A8D672] rounded-full opacity-15"></div>
      </div>
    </div>
  );
}
