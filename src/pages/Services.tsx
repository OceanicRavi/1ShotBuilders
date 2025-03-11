import React from 'react';
import { motion } from 'framer-motion';
import { Building, Home, Building2, Warehouse, Factory, HardHat } from 'lucide-react';

const services = [
  {
    icon: Building,
    title: 'Commercial Construction',
    description: 'State-of-the-art office buildings and retail spaces built to your specifications.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    icon: Home,
    title: 'Residential Projects',
    description: 'Custom homes and residential complexes with premium finishes.',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    icon: Building2,
    title: 'Renovation Services',
    description: 'Transforming existing structures with modern upgrades and improvements.',
    image: 'https://images.unsplash.com/photo-1574359411659-15573a27d625?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    icon: Warehouse,
    title: 'Industrial Construction',
    description: 'Large-scale industrial facilities and warehouses built for efficiency.',
    image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    icon: Factory,
    title: 'Infrastructure Development',
    description: 'Public infrastructure projects that serve communities.',
    image: 'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    icon: HardHat,
    title: 'Project Management',
    description: 'Comprehensive project management services for construction projects.',
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  }
];

const Services = () => {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold text-white mb-4"
            >
              Our Services
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-blue-100 max-w-2xl mx-auto"
            >
              Comprehensive construction solutions tailored to your needs
            </motion.p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg overflow-hidden shadow-lg"
              >
                <div className="relative h-48">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-blue-600 p-2 rounded-full">
                    <service.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;