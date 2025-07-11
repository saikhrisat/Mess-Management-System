
'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Users, Smile, ThumbsUp, ShieldCheck, BarChart, Phone, Mail, MapPin } from 'lucide-react';

const useScrollAnimation = () => {
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const currentRefs = refs.current;
    currentRefs.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      currentRefs.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !refs.current.includes(el)) {
      refs.current.push(el);
    }
  };

  return addToRefs;
};


const ElegantStar = ({ filled = true }: { filled?: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className={`w-6 h-6 transition-colors duration-300 ${
      filled ? 'text-accent fill-current' : 'text-gray-300 fill-current'
    }`}
  >
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

const StarRating = ({ rating, className }: { rating: number; className?: string }) => (
  <div className={`flex ${className}`}>
    {[...Array(5)].map((_, i) => (
      <ElegantStar key={i} filled={i < rating} />
    ))}
  </div>
);


export default function Home() {
  const addToRefs = useScrollAnimation();

  const reviews = [
    {
      name: 'Priya Sharma',
      role: 'Student',
      review: 'MessMate has made my life so much easier! I can see the menu, manage my payments, and give feedback all in one place. No more confusion!',
      avatar: 'https://placehold.co/80x80.png',
      initials: 'PS',
      rating: 5,
    },
    {
      name: 'Rajesh Kumar',
      role: 'Mess Manager',
      review: 'Managing expenses and inventory was a headache. With MessMate, everything is automated and transparent. It has saved me hours of work every week.',
      avatar: 'https://placehold.co/80x80.png',
      initials: 'RK',
      rating: 5,
    },
    {
      name: 'Anjali Desai',
      role: 'Mess Owner',
      review: 'This platform provides incredible insights into my business. Customer satisfaction is up, and food wastage is down. Highly recommended!',
      avatar: 'https://placehold.co/80x80.png',
      initials: 'AD',
      rating: 4,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-transparent">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section
          id="home"
          ref={addToRefs}
          className="reveal text-center flex flex-col items-center justify-center min-h-[90vh] px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-4xl">
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold font-headline tracking-tight text-foreground">
              Welcome to <span className="text-primary">MessMate</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl max-w-3xl mx-auto text-foreground/80">
              The ultimate solution for managing mess operations, tracking finances, and enhancing communication between owners, managers, and students.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
              <Button size="lg" asChild className="font-bold text-lg bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300">
                <Link href="/register">Get Started</Link>
              </Button>
              <Button size="lg" variant="ghost" asChild className="group font-bold text-lg text-foreground hover:bg-transparent hover:text-primary transition-colors duration-300">
                <a href="#about">
                  Learn More <span className="inline-block transform group-hover:translate-x-2 transition-transform duration-300">→</span>
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" ref={addToRefs} className="reveal bg-background/70 backdrop-blur-md">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold font-headline text-foreground">What is MessMate?</h2>
              <p className="mt-4 text-lg max-w-3xl mx-auto text-foreground/80">
                MessMate is a comprehensive web application designed to streamline every aspect of mess management. Our goal is to create a seamless, transparent, and efficient experience for everyone involved.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <Card className="bg-card/50 border-0 shadow-xl p-8 transform hover:-translate-y-2 transition-transform duration-300">
                <CardHeader>
                  <div className="mx-auto bg-primary/20 rounded-full w-20 h-20 flex items-center justify-center mb-4">
                    <ShieldCheck className="h-10 w-10 text-primary" />
                  </div>
                  <CardTitle className="font-headline text-2xl">Streamlined Operations</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/80">Eliminate paperwork, reduce manual errors, and manage menus, inventory, and payments with ease.</p>
                </CardContent>
              </Card>
              <Card className="bg-card/50 border-0 shadow-xl p-8 transform hover:-translate-y-2 transition-transform duration-300">
                <CardHeader>
                  <div className="mx-auto bg-primary/20 rounded-full w-20 h-20 flex items-center justify-center mb-4">
                    <Users className="h-10 w-10 text-primary" />
                  </div>
                  <CardTitle className="font-headline text-2xl">Enhanced Communication</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/80">A central platform for students, managers, and owners to interact, provide feedback, and stay updated.</p>
                </CardContent>
              </Card>
              <Card className="bg-card/50 border-0 shadow-xl p-8 transform hover:-translate-y-2 transition-transform duration-300">
                <CardHeader>
                  <div className="mx-auto bg-primary/20 rounded-full w-20 h-20 flex items-center justify-center mb-4">
                    <BarChart className="h-10 w-10 text-primary" />
                  </div>
                  <CardTitle className="font-headline text-2xl">Financial Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/80">Track expenses, manage revenue, and gain clear visibility into the financial health of your mess.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Satisfaction Metrics Section */}
        <section id="metrics" ref={addToRefs} className="reveal">
          <div className="container mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl md:text-5xl font-bold font-headline text-foreground">Loved by Our Community</h2>
            <p className="mt-4 text-lg max-w-2xl mx-auto text-foreground/80">
              We are committed to providing an exceptional experience, and the results speak for themselves.
            </p>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-transparent border-0">
                <CardHeader className="flex flex-col items-center">
                  <Smile className="h-12 w-12 text-primary mb-4" />
                  <p className="text-4xl font-bold font-headline">95%</p>
                  <CardDescription className="text-lg">Satisfaction Rate</CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-transparent border-0">
                <CardHeader className="flex flex-col items-center">
                  <Users className="h-12 w-12 text-primary mb-4" />
                  <p className="text-4xl font-bold font-headline">5,000+</p>
                  <CardDescription className="text-lg">Active Users</CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-transparent border-0">
                <CardHeader className="flex flex-col items-center">
                  <ThumbsUp className="h-12 w-12 text-primary mb-4" />
                  <p className="text-4xl font-bold font-headline">4.8/5</p>
                  <CardDescription className="text-lg">Average Rating</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Client Reviews Section */}
        <section id="reviews" ref={addToRefs} className="reveal bg-background/70 backdrop-blur-md">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl md:text-5xl font-bold font-headline text-center text-foreground mb-16">
              What Our Clients Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {reviews.map((review, index) => (
                <Card key={index} className="flex flex-col bg-card/50 border-0 shadow-xl transform hover:-translate-y-2 transition-transform duration-300">
                  <CardContent className="pt-8 flex-grow">
                     <p className="text-foreground/80 italic text-lg leading-relaxed">"{review.review}"</p>
                  </CardContent>
                  <CardHeader>
                    <div className="flex items-center">
                      <Avatar className="h-16 w-16 mr-4">
                        <AvatarImage src={review.avatar} alt={review.name} data-ai-hint="person portrait" />
                        <AvatarFallback>{review.initials}</AvatarFallback>
                      </Avatar>
                      <div className="flex-grow">
                        <p className="font-bold font-headline text-xl">{review.name}</p>
                        <p className="text-sm text-foreground/70">{review.role}</p>
                      </div>
                      <StarRating rating={review.rating} />
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Us Section */}
        <section id="contact" ref={addToRefs} className="reveal">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold font-headline">Get In Touch</h2>
                <p className="mt-4 text-lg max-w-3xl mx-auto text-foreground/80">
                  Have questions or want a demo? Fill out the form below, and we'll get back to you shortly.
                </p>
            </div>
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                  <h3 className="text-3xl font-headline font-bold">Contact Information</h3>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/20 rounded-full">
                      <Mail className="h-6 w-6 text-primary"/>
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">Email Us</h4>
                      <a href="mailto:support@messmate.com" className="text-foreground/80 hover:text-primary transition-colors">support@messmate.com</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/20 rounded-full">
                      <Phone className="h-6 w-6 text-primary"/>
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">Call Us</h4>
                      <a href="tel:+1234567890" className="text-foreground/80 hover:text-primary transition-colors">+1 (234) 567-890</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/20 rounded-full">
                      <MapPin className="h-6 w-6 text-primary"/>
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">Find Us</h4>
                      <p className="text-foreground/80">123 Culinary Lane, Foodie City, 45678</p>
                    </div>
                  </div>
              </div>
               <Card className="bg-card/80 backdrop-blur-sm p-4 sm:p-8 shadow-2xl">
                <CardContent className="p-0">
                  <form className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <Input placeholder="Your Name" className="bg-background/80 h-12 text-base" />
                      <Input type="email" placeholder="Your Email" className="bg-background/80 h-12 text-base" />
                    </div>
                    <Input placeholder="Subject" className="bg-background/80 h-12 text-base" />
                    <Textarea placeholder="Your Message" rows={6} className="bg-background/80 text-base" />
                    <Button type="submit" size="lg" className="w-full font-bold text-lg bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
