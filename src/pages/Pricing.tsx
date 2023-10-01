
import { Layout } from "@/components/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const pricingPlans = [
  {
    name: "Basic",
    description: "For individuals and small teams needing occasional workspace.",
    price: "No membership fee",
    billing: "Pay only for what you book",
    features: [
      "Access to all spaces",
      "Hourly booking options",
      "Access during business hours",
      "Basic amenities included",
      "Cancellation up to 24h before",
    ],
    highlighted: false,
  },
  {
    name: "Pro",
    description: "For regular users who need consistent access to workspaces.",
    price: "$49",
    billing: "per month",
    features: [
      "All Basic features",
      "10% discount on all bookings",
      "Priority booking (48h advance access)",
      "4 hours of meeting room credits/month",
      "Premium amenities included",
      "Cancellation up to 12h before",
    ],
    highlighted: true,
  },
  {
    name: "Business",
    description: "For businesses needing flexible office solutions.",
    price: "$199",
    billing: "per month",
    features: [
      "All Pro features",
      "20% discount on all bookings",
      "Priority booking (72h advance access)",
      "20 hours of meeting room credits/month",
      "Dedicated support",
      "Cancellation up to 4h before",
    ],
    highlighted: false,
  },
];

const spaceTypes = [
  {
    name: "Hot Desk",
    basePrice: "$15",
    unit: "per hour",
    description: "Individual workspace in an open area",
  },
  {
    name: "Dedicated Desk",
    basePrice: "$25",
    unit: "per hour",
    description: "Personal desk in a shared environment",
  },
  {
    name: "Meeting Room (Small)",
    basePrice: "$35",
    unit: "per hour",
    description: "For 2-6 people with basic equipment",
  },
  {
    name: "Meeting Room (Large)",
    basePrice: "$50",
    unit: "per hour",
    description: "For 6-12 people with video conferencing",
  },
  {
    name: "Conference Room",
    basePrice: "$75",
    unit: "per hour",
    description: "For 12-20 people with full AV setup",
  },
  {
    name: "Event Space",
    basePrice: "$150",
    unit: "per hour",
    description: "For larger gatherings up to 50 people",
  },
];

const PricingPage = () => {
  return (
    <Layout>
      <div className="container py-8 md:py-12">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-lg text-muted-foreground">
            Choose the plan that works best for you, or pay as you go with no commitments.
          </p>
        </div>
        
        {/* Membership Plans */}
        <div className="grid gap-8 md:grid-cols-3 mb-16">
          {pricingPlans.map((plan, index) => (
            <div 
              key={index} 
              className={`rounded-xl border ${
                plan.highlighted 
                  ? "border-cowork-700 shadow-lg shadow-cowork-100" 
                  : "border-border"
              } overflow-hidden`}
            >
              {plan.highlighted && (
                <div className="bg-cowork-700 text-white py-2 text-center text-sm font-medium">
                  Most Popular
                </div>
              )}
              <div className="p-6 md:p-8">
                <h2 className="text-2xl font-bold">{plan.name}</h2>
                <p className="text-muted-foreground mt-2">{plan.description}</p>
                <div className="mt-6">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.price !== "No membership fee" && ` ${plan.billing}`}</span>
                </div>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className={`w-full mt-8 ${
                    plan.highlighted 
                      ? "bg-cowork-700 hover:bg-cowork-800" 
                      : ""
                  }`}
                  asChild
                >
                  <Link to="/signup">Choose {plan.name}</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Space Pricing */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Space Pricing</h2>
          <p className="text-center text-muted-foreground mb-8 max-w-3xl mx-auto">
            Below are our base rates for different types of spaces. Exact pricing may vary based on location, 
            amenities, and time of day. Members receive discounts according to their plan level.
          </p>
          
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {spaceTypes.map((type, index) => (
              <div key={index} className="border rounded-xl p-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold">{type.name}</h3>
                  <div className="text-right">
                    <span className="text-xl font-bold">{type.basePrice}</span>
                    <span className="text-sm text-muted-foreground"> {type.unit}</span>
                  </div>
                </div>
                <p className="text-muted-foreground">{type.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* FAQ */}
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Pricing FAQ</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Are there any hidden fees?</h3>
              <p className="text-muted-foreground">
                No, we believe in transparent pricing. The rates you see are the rates you pay, with no surprise charges.
                Any additional services are clearly marked and optional.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Can I change my plan later?</h3>
              <p className="text-muted-foreground">
                Yes, you can upgrade or downgrade your membership plan at any time. Changes will take effect at the start of your next billing cycle.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">What's included in the base price?</h3>
              <p className="text-muted-foreground">
                Base prices include fast Wi-Fi, access to common areas, and basic amenities like water and coffee.
                Premium amenities may vary by location and are clearly marked in each space listing.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Do you offer custom plans for larger teams?</h3>
              <p className="text-muted-foreground">
                Yes, we offer custom enterprise solutions for teams of 10 or more. Please contact our sales team for a personalized quote.
              </p>
            </div>
          </div>
        </div>
        
        {/* CTA */}
        <div className="bg-cowork-50 rounded-xl p-8 md:p-12 text-center">
          <h2 className="text-2xl font-bold mb-3">Ready to get started?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join thousands of professionals who have already discovered the flexibility and convenience of SpaceFlow.
            Sign up today and get access to our network of premium workspaces.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" asChild>
              <Link to="/signup">Create Account</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/spaces">Browse Spaces</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PricingPage;
