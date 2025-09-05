import React from "react";
import { 
  Ambulance,
  Stethoscope,
  Plus, 
  ArrowRight, 
  CheckCircle, 
  Clock, 
  Users, 
  Shield 
} from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  const services = [
    {
      id: 1,
      icon: <Ambulance className="w-6 h-6" />,
      title: "24/7 Emergency Care",
      description: "Immediate medical attention when you need it most, available around the clock.",
      gradient: "from-red-500 to-pink-500"
    },
    {
      id: 2,
      icon: <Clock className="w-6 h-6" />,
      title: "Doctor Scheduling",
      description: "Book appointments seamlessly with our intelligent scheduling system.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      id: 3,
      icon: <Shield className="w-6 h-6" />,
      title: "Comprehensive Care",
      description: "Complete healthcare solutions tailored to your individual needs.",
      gradient: "from-purple-500 to-indigo-500"
    },
  ];

  const features = [
    {
      icon: <Ambulance className="w-8 h-8" />,
      title: "Emergency Response",
      description: "Rapid emergency medical services with advanced life support capabilities."
    },
    {
      icon: <Plus className="w-8 h-8" />,
      title: "Digital Pharmacy",
      description: "Modern pharmaceutical services with digital prescriptions and home delivery."
    },
    {
      icon: <Stethoscope className="w-8 h-8" />,
      title: "Expert Treatment",
      description: "World-class medical treatments using cutting-edge technology and protocols."
    }
  ];

  const stats = [
    { number: "50K+", label: "Patients Treated" },
    { number: "24/7", label: "Emergency Support" },
    { number: "98%", label: "Satisfaction Rate" },
    { number: "15+", label: "Years Experience" }
  ];

  return (
    <main className="w-full min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100"></div>
        
        {/* Decorative Elements */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
                <Users className="w-4 h-4 mr-2" />
                Trusted by 50,000+ patients
              </div>
              
              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Healthcare
                <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  You Can Trust
                </span>
              </h1>
              
              {/* Description */}
              <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                Experience world-class medical care with our innovative platform. 
                We combine expert healthcare with modern technology to deliver 
                exceptional patient outcomes.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to={"/doctor/all"}>
                <button className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  Book Appointment
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                </Link>
                {/* <button className="inline-flex items-center justify-center px-8 py-4 bg-white hover:bg-gray-50 text-gray-900 font-semibold rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-all duration-200">
                  Learn More
                </button> */}
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center sm:text-left">
                    <div className="text-2xl sm:text-3xl font-bold text-gray-900">{stat.number}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Right Image/Visual */}
            <div className="relative">
              <div className="aspect-[4/3] bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 bg-white rounded-full shadow-lg flex items-center justify-center">
                    <Stethoscope className="w-16 h-16 text-blue-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="group relative bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:border-transparent transition-all duration-300 hover:-translate-y-1"
              >
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>
                
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br ${service.gradient} rounded-xl text-white mb-6 group-hover:scale-110 transition-transform duration-200`}>
                  {service.icon}
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-900">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {service.description}
                </p>
                
                {/* Link */}
                {/* <a
                  href="#"
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold text-sm group-hover:gap-2 transition-all duration-200"
                >
                  Learn more
                  <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a> */}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Always Ready to
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Serve You Better
              </span>
            </h2>
            <p className="text-xl text-gray-600">
              Our comprehensive healthcare platform combines cutting-edge technology 
              with compassionate care to deliver exceptional medical services.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group text-center p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-transparent hover:-translate-y-1"
              >
                {/* Icon Container */}
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl text-blue-600 mb-6 group-hover:scale-110 group-hover:shadow-lg transition-all duration-200">
                  {feature.icon}
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 sm:p-12 text-center text-white">
            <div className="max-w-3xl mx-auto">
              <CheckCircle className="w-16 h-16 mx-auto mb-6 opacity-90" />
              <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                Your Health is Our Priority
              </h3>
              <p className="text-blue-100 text-lg mb-8">
                Join thousands of satisfied patients who trust us with their healthcare needs.
                Experience the difference of personalized, professional medical care.
              </p>
              <Link to={"/userRegister"}>
              <button className="inline-flex items-center px-8 py-4 bg-white hover:bg-gray-50 text-blue-600 font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                Get Started Today
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;