
import { Layout } from "@/components/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock, CreditCard, Search } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Browse Spaces",
    description: "Search through our wide selection of coworking spaces and meeting rooms to find the perfect spot for your needs.",
  },
  {
    icon: CalendarDays,
    title: "Select Date & Time",
    description: "Choose your preferred date and check real-time availability of your selected space.",
  },
  {
    icon: CreditCard,
    title: "Make a Booking",
    description: "Complete your booking by entering your details and confirming your reservation.",
  },
  {
    icon: Clock,
    title: "Enjoy Your Space",
    description: "Show up at the scheduled time and make use of the high-quality facilities we provide.",
  },
];

const FAQs = [
  {
    question: "How far in advance can I make a booking?",
    answer: "You can book a space up to 30 days in advance, subject to availability. For longer-term arrangements, please contact us directly.",
  },
  {
    question: "What is your cancellation policy?",
    answer: "We offer free cancellations up to 24 hours before your booking start time. After that, cancellations may incur a fee.",
  },
  {
    question: "Can I modify my booking after it's confirmed?",
    answer: "Yes, you can modify your booking details up to 24 hours before your scheduled time, subject to availability.",
  },
  {
    question: "Are there any additional fees?",
    answer: "The price displayed is all-inclusive with no hidden fees. Any optional add-ons will be clearly marked during the booking process.",
  },
  {
    question: "What amenities are included with the spaces?",
    answer: "Each space listing details the amenities included, such as Wi-Fi, whiteboards, coffee facilities, etc. Check the specific space listing for more information.",
  },
];

const HowItWorksPage = () => {
  return (
    <Layout>
      <div className="container py-8 md:py-12">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">How SpaceFlow Works</h1>
          <p className="text-lg text-muted-foreground">
            Book workspace in minutes. It's that simple.
          </p>
        </div>
        
        {/* Steps Section */}
        <div className="mb-16">
          <div className="grid gap-10 md:gap-16 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-cowork-50 mb-5">
                  <step.icon className="h-8 w-8 text-cowork-700" />
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Booking Process Explanation */}
        <div className="bg-cowork-50 rounded-xl p-8 mb-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">The Booking Process</h2>
            <div className="space-y-8">
              <div className="grid md:grid-cols-[1fr_3fr] gap-6 items-start">
                <div className="bg-white p-5 rounded-lg text-center">
                  <span className="text-4xl font-bold text-cowork-700">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Create an Account</h3>
                  <p className="text-muted-foreground mb-2">
                    Sign up for an account to start booking spaces. We'll ask for basic information to set up your profile.
                  </p>
                  <Link to="/signup" className="text-cowork-700 font-medium hover:underline">
                    Sign up now →
                  </Link>
                </div>
              </div>
              
              <div className="grid md:grid-cols-[1fr_3fr] gap-6 items-start">
                <div className="bg-white p-5 rounded-lg text-center">
                  <span className="text-4xl font-bold text-cowork-700">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Browse Available Spaces</h3>
                  <p className="text-muted-foreground mb-2">
                    Search through our catalog of workspaces and meeting rooms. Filter by capacity, amenities, location, and more.
                  </p>
                  <Link to="/spaces" className="text-cowork-700 font-medium hover:underline">
                    Explore spaces →
                  </Link>
                </div>
              </div>
              
              <div className="grid md:grid-cols-[1fr_3fr] gap-6 items-start">
                <div className="bg-white p-5 rounded-lg text-center">
                  <span className="text-4xl font-bold text-cowork-700">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Make Your Booking</h3>
                  <p className="text-muted-foreground mb-2">
                    Select your desired date and time slot. Complete the booking process by providing any necessary details and confirming your reservation.
                  </p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-[1fr_3fr] gap-6 items-start">
                <div className="bg-white p-5 rounded-lg text-center">
                  <span className="text-4xl font-bold text-cowork-700">4</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Manage Your Bookings</h3>
                  <p className="text-muted-foreground mb-2">
                    Access your dashboard to view, modify, or cancel your bookings at any time. Receive email confirmations and reminders for your upcoming reservations.
                  </p>
                  <Link to="/bookings" className="text-cowork-700 font-medium hover:underline">
                    View your bookings →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {FAQs.map((faq, index) => (
              <div key={index} className="border-b border-cowork-100 pb-6 last:border-b-0">
                <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Book Your Space?</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Start exploring our available spaces and find the perfect spot for your next meeting, work session, or event.
          </p>
          <Button size="lg" asChild>
            <Link to="/spaces">Browse Spaces</Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default HowItWorksPage;
