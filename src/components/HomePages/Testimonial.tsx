'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Great_Vibes } from 'next/font/google'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import { client } from '@/sanity/lib/client'  // Import your Sanity client

const VibeFont = Great_Vibes({ subsets: ['latin'], weight: ['400'] })

// TestimonialsSection component
export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<any[]>([])
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Fetch testimonials from Sanity
  useEffect(() => {
    const fetchTestimonials = async () => {
      const data = await client.fetch(`
        *[_type == "testimonial"] {
          _id,
          name,
          role,
          "image": profileImage.asset->url, // Ensure this is correct based on your schema
          quote,
          rating
        }
      `)
      setTestimonials(data)
    }
    
    fetchTestimonials()
  }, [])

  // Auto-advance testimonials
  useEffect(() => {
    if (!isAutoPlaying || testimonials.length === 0) return

    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [isAutoPlaying, testimonials])

  const handleTestimonialChange = (index: number) => {
    setCurrentTestimonial(index)
    setIsAutoPlaying(false)
  }

  return (
    <section className="bg-gradient-to-br from-black to-gray-900 text-white py-16 md:py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className={`${VibeFont.className} text-amber-500 text-4xl md:text-5xl mb-4`}>
            Testimonials
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold"><span className='text-amber-500'>Wh</span>
            at our clients are saying
          </h3>
        </div>

        <div className="bg-white/95 backdrop-blur-sm text-black p-8 md:p-12 rounded-2xl shadow-2xl relative">
          {testimonials.length > 0 && (
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative w-20 h-20 md:w-24 md:h-24">
                <Image
                  src={testimonials[currentTestimonial].image}
                  alt={testimonials[currentTestimonial].name}
                  fill
                  className="rounded-full border-4 border-white shadow-lg object-cover"
                />
              </div>
            </div>
          )}

          <div className="text-6xl md:text-7xl text-amber-500 opacity-30 absolute top-8 left-8">
            &quot;
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="pt-8"
            >
              <p className="text-gray-600 text-lg md:text-xl text-center mb-8">
                {testimonials[currentTestimonial].quote}
              </p>

              <div className="flex justify-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <motion.svg
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className={`w-6 h-6 mx-1 ${
                      i < testimonials[currentTestimonial].rating
                        ? 'text-amber-500'
                        : 'text-gray-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </motion.svg>
                ))}
              </div>

              <div className="text-center">
                <h4 className="font-bold text-xl md:text-2xl mb-2">
                  {testimonials[currentTestimonial].name}
                </h4>
                <p className="text-gray-500">{testimonials[currentTestimonial].role}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center items-center gap-4 mt-8">
          {testimonials.map((_, index) => (
            <Button
              key={index}
              onClick={() => handleTestimonialChange(index)}
              className={`w-3 h-3 p-0 rounded-full transition-all duration-300 ${
                index === currentTestimonial
                  ? 'bg-amber-500 scale-125'
                  : 'bg-gray-400 hover:bg-amber-400'
              }`}
              title={`View testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-amber-500 opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500 opacity-10 rounded-full translate-x-1/3 translate-y-1/3 blur-2xl" />
    </section>
  )
}