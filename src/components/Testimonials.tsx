import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    quote: "Fast and secure background check service",
    name: "Verified Process",
    title: "15-minute average processing time",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80"
  },
  {
    quote: "Bank-level security and data protection",
    name: "Secure Service",
    title: "256-bit SSL encryption",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80"
  },
  {
    quote: "Official Canadian police database check",
    name: "Official Verification",
    title: "Nationally recognized results",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80"
  },
  {
    quote: "Digital delivery of results",
    name: "Instant Access",
    title: "Secure PDF certificate",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80"
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((current) => (current + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((current) => 
      current === 0 ? testimonials.length - 1 : current - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((current) => 
      (current + 1) % testimonials.length
    );
  };

  return (
    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 relative">
      <div className="flex items-start space-x-4">
        <img
          src={testimonials[currentIndex].image}
          alt={testimonials[currentIndex].name}
          className="w-12 h-12 rounded-full object-cover border-2 border-primary"
        />
        <div className="flex-1">
          <p className="text-gray-600 text-sm italic mb-2">
            {testimonials[currentIndex].quote}
          </p>
          <p className="text-primary font-semibold">
            {testimonials[currentIndex].name}
          </p>
          <p className="text-gray-500 text-sm">
            {testimonials[currentIndex].title}
          </p>
        </div>
      </div>

      <div className="absolute top-1/2 -translate-y-1/2 left-2">
        <button
          onClick={goToPrevious}
          className="p-1 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
        >
          <ChevronLeft className="h-4 w-4 text-gray-600" />
        </button>
      </div>

      <div className="absolute top-1/2 -translate-y-1/2 right-2">
        <button
          onClick={goToNext}
          className="p-1 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
        >
          <ChevronRight className="h-4 w-4 text-gray-600" />
        </button>
      </div>

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-primary' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
}