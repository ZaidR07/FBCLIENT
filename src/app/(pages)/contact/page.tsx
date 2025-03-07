"use client";
import { useState } from "react";
import Image from "next/image";
import { WhatsappIcon, PhoneIcon } from "@/app/Icons";
import { useRouter } from "next/navigation";


const ContactUs = () => {

  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Your message has been sent!");
  };

  return (
    <>
      <nav
        className="w-full h-[8vh] lg:h-[10vh] shadow-lg lg:shadow-2xl flex items-center gap-2 px-3 cursor-pointer"
        onClick={() => router.back()}
      >
        <span className="text-3xl lg:text-4xl font-extrabold text-[#f97316]">&larr;</span>
        <span className="text-[#f97316] text-2xl lg:text-3xl mt-2">Back</span>
      </nav>
      <div className="min-h-screen flex flex-col lg:flex-row gap-4 items-center lg:justify-center  bg-gray-100 px-4 relative">
      
      {/* Background Graphic */}

      <div className="bg-white mt-4 lg:-mt-12 shadow-lg rounded-lg px-6 py-4 max-w-lg w-full relative z-10">
        <div className="flex justify-center ">
          <Image
            src="/envelope1.png"
            alt="Contact Graphic"
            width={300}
            height={100}
          />
        </div>
        <form className=" space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400"
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Your Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400"
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400"
            rows={3}
            required
          ></textarea>
          <button
            type="submit"
            className="w-full bg-[#FF5D00] text-white py-3 rounded-lg hover:bg-orange-600 transition"
          >
            Send Message
          </button>
        </form>
      </div>

      {/* Floating WhatsApp & Phone Sidebar */}
      <div className="hidden relative lg:inline gap-4 bg-[#fff] shadow-2xl lg:p-4 px-8 py-2 rounded-2xl">
        <div className="bg-green-500 text-white p-6 lg:p-4 rounded-full shadow-lg cursor-pointer flex items-center gap-2 hover:bg-green-600 transition">
          <a
            href="https://wa.me/1234567890"
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsappIcon width={30} fill={"#fff"} />
          </a>
        </div>
        <div className="bg-blue-500 mt-4 text-white p-4 rounded-full shadow-lg cursor-pointer flex items-center gap-2 hover:bg-blue-600 transition">
          <a
            href="tel:+1234567890" // Dial the phone number when clicked
          >
            <PhoneIcon width={30} fill={"#fff"} />
          </a>
        </div>
      </div>
      
      <div  className="lg:hidden absolute bottom-32 right-10 bg-green-500 text-white p-4 lg:p-4 rounded-full shadow-lg cursor-pointer flex items-center gap-2 hover:bg-green-600 transition">
          <a
            href="https://wa.me/1234567890"
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsappIcon width={28} fill={"#fff"} />
          </a>
        </div>
      <div className="lg:hidden absolute bottom-32 right-28 bg-blue-500 mt-4 text-white p-4 rounded-full shadow-lg cursor-pointer flex items-center gap-2 hover:bg-blue-600 transition">
        <a
          href="tel:+1234567890" // Dial the phone number when clicked
        >
          <PhoneIcon width={30} fill={"#fff"} />
        </a>
      </div>
    </div>
    </>
    
  );
};

export default ContactUs;
