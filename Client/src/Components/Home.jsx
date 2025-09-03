import React from "react";
import doctor3 from "../assets/doctor3.jpg";
import { FaAmbulance, FaStethoscope } from "react-icons/fa";
import { GiCaduceus } from "react-icons/gi";

const Home = () => {
  const cards = [
    {
      id: 1,
      title: "Emergency Cases",
      desc: "Quick and reliable emergency services available 24/7 for your health and safety.",
      link: "LEARN MORE",
    },
    {
      id: 2,
      title: "Doctors Timetable",
      desc: "Check availability of doctors easily and book your appointment at your convenience.",
      link: "LEARN MORE",
    },
    {
      id: 3,
      title: "Opening Hours",
      desc: "We are open round the clock to provide you with the best medical assistance.",
      link: "LEARN MORE",
    },
  ];

  return (
    <main className="w-full min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full">
        <img
          src={doctor3}
          alt="Doctor"
          className="w-full h-[250px] sm:h-[400px] md:h-[500px] object-cover"
        />

        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="max-w-5xl text-center px-6">
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white leading-snug">
              We Provide Best{" "}
              <span className="text-blue-500">Medical</span> Services <br />
              That You Can <span className="text-blue-500">Trust!</span>
            </h1>
            <p className="text-sm sm:text-base text-gray-200 mt-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad rerum
              aspernatur ratione laborum ipsa laudantium odit exercitationem.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl transition">
                Get Appointment
              </button>
              <button className="border-2 border-blue-600 text-white hover:bg-blue-600 hover:text-white font-bold px-6 py-3 rounded-xl transition">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Cards Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card) => (
            <div
              key={card.id}
              className="bg-white shadow-md rounded-xl p-6 flex flex-col justify-between hover:shadow-xl transition transform hover:-translate-y-1"
            >
              <h2 className="text-xl font-bold text-blue-600 mb-3">
                {card.title}
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed flex-1">
                {card.desc}
              </p>
              <a
                href="#"
                className="mt-4 font-semibold text-blue-700 hover:underline text-sm"
              >
                {card.link}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-gray-50 dark:bg-gray-900 py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            We Are Always Ready <span className="text-blue-600">To</span> Help
            You & <br /> Your Family
          </h2>
          <p className="text-gray-500 dark:text-gray-300 max-w-2xl mx-auto mt-4">
            Lorem ipsum dolor sit amet consectetur adipiscing elit praesent
            aliquet, pretium.
          </p>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 mt-12">
            {/* Emergency Help */}
            <div className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition">
              <div className="w-20 h-20 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mb-4 hover:bg-blue-600 hover:text-white transition">
                <FaAmbulance size={36} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Emergency Help
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Quick response ambulance and emergency medical support.
              </p>
            </div>

            {/* Enriched Pharmacy */}
            <div className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition">
              <div className="w-20 h-20 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mb-4 hover:bg-blue-600 hover:text-white transition">
                <GiCaduceus size={36} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Enriched Pharmacy
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Wide range of medicines and pharmacy support available.
              </p>
            </div>

            {/* Medical Treatment */}
            <div className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition">
              <div className="w-20 h-20 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mb-4 hover:bg-blue-600 hover:text-white transition">
                <FaStethoscope size={36} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Medical Treatment
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Advanced treatments with modern equipment and expert doctors.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
