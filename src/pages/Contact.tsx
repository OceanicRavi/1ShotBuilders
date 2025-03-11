import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { InlineWidget } from 'react-calendly';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false); // Track form submission

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await emailjs.send(
        'service_3wzk7ct', // Replace with your EmailJS service ID
        'template_z68pq9h', // Replace with your EmailJS template ID
        {
          user_name: formData.name,
          user_email: formData.email,
          user_phone: formData.phone,
          user_message: formData.message,
        },
        'LcWqq09z0xheaKPiq' // Replace with your EmailJS public key
      );

      // Show Thank You message after successful submission
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-bold text-white mb-4">
            Contact Us
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-xl text-blue-100 max-w-2xl mx-auto">
            Get in touch with our team for your construction needs
          </motion.p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              
              {isSubmitted ? ( // Show Thank You message if submitted
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-green-600">Thank you for your message!</h3>
                  <p className="text-gray-600 mt-2">We'll get back to you as soon as possible.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" required />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" required />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                    <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={4} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" required />
                  </div>
                  <button type="submit" className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors">Send Message</button>
                </form>
              )}
            </motion.div>

            {/* Contact Information */}
            <div className="space-y-8">
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4"><Phone className="h-6 w-6 text-blue-600 mt-1" /><div><h3 className="font-medium text-gray-900">Phone</h3><p className="text-gray-600">+64 02 2042 9642</p></div></div>
                  <div className="flex items-start space-x-4"><Mail className="h-6 w-6 text-blue-600 mt-1" /><div><h3 className="font-medium text-gray-900">Email</h3><p className="text-gray-600">we@1shotbuilders.co.nz</p></div></div>
                  <div className="flex items-start space-x-4"><MapPin className="h-6 w-6 text-blue-600 mt-1" /><div><h3 className="font-medium text-gray-900">Address</h3><p className="text-gray-600">20 Keats Place, Blockhouse Bay, NZ 0600</p></div></div>
                  <div className="flex items-start space-x-4"><Clock className="h-6 w-6 text-blue-600 mt-1" /><div><h3 className="font-medium text-gray-900">Hours</h3><p className="text-gray-600">Monday - Friday: 8:00 AM - 6:00 PM</p><p className="text-gray-600">Saturday: 9:00 AM - 2:00 PM</p></div></div>
                </div>
              </motion.div>

              {/* Calendly Integration */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Schedule a Consultation</h2>
                <InlineWidget url="https://calendly.com/18ravibhatt" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
