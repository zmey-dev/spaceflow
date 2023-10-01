
import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useBooking } from "@/contexts/BookingContext";
import { CalendarDays, Check, Clock, MapPin } from "lucide-react";

const features = [
  {
    icon: CalendarDays,
    title: "Easy Booking",
    description: "Book your workspace in seconds with our intuitive booking system.",
  },
  {
    icon: MapPin,
    title: "Prime Locations",
    description: "Choose from various meeting rooms and workspaces in convenient locations.",
  },
  {
    icon: Clock,
    title: "Flexible Hours",
    description: "Book by the hour, half-day, or full-day according to your needs.",
  },
];

const Index = () => {
  const { isAuthenticated } = useAuth();
  const { spaces } = useBooking();
  
  // Featured spaces (first 3)
  const featuredSpaces = spaces.slice(0, 3);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-cowork-50 to-background pt-16 pb-20 md:pt-24 md:pb-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 md:grid-cols-2 md:gap-10 lg:grid-cols-[1fr_500px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Find Your Perfect Workspace
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl">
                  Book meeting rooms, conference halls, and coworking spaces effortlessly. Your professional environment awaits.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" asChild>
                  <Link to="/spaces">Browse Spaces</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/how-it-works">How It Works</Link>
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200&auto=format&fit=crop"
                alt="Modern coworking space"
                className="w-full h-auto rounded-xl shadow-lg object-cover aspect-[4/3]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
              Why Choose SpaceFlow?
            </h2>
            <p className="mt-4 text-muted-foreground md:text-lg">
              Streamlined booking process. Professional spaces. Flexible options.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center space-y-2 p-4 rounded-lg"
              >
                <div className="p-3 rounded-full bg-cowork-50">
                  <feature.icon className="h-6 w-6 text-cowork-700" />
                </div>
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Spaces Section */}
      <section className="py-12 md:py-20 bg-cowork-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
            <div>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
                Featured Spaces
              </h2>
              <p className="mt-2 text-muted-foreground md:text-lg">
                Discover our most popular workspaces and meeting rooms.
              </p>
            </div>
            <Button asChild variant="outline">
              <Link to="/spaces">View All Spaces</Link>
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredSpaces.map((space) => (
              <div
                key={space.id}
                className="group overflow-hidden rounded-xl border bg-white shadow-sm transition-all hover:shadow-md"
              >
                <Link to={`/spaces/${space.id}`} className="block">
                  <div className="aspect-video w-full overflow-hidden">
                    <img
                      src={space.images[0]}
                      alt={space.name}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-xl">{space.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                      {space.description}
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{space.location}</span>
                      </div>
                      <div className="font-medium">
                        ${space.pricePerHour}/hour
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 bg-cowork-700 text-white">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 md:grid-cols-2 items-center">
            <div>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
                Ready to book your workspace?
              </h2>
              <p className="mt-4 text-cowork-100 md:text-lg">
                Join our community of professionals and find the perfect environment for your business needs.
              </p>
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-cowork-200" />
                  <span>No subscription required</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-cowork-200" />
                  <span>Pay only for what you need</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-cowork-200" />
                  <span>Free cancellations up to 24 hours</span>
                </div>
              </div>
              <div className="mt-8">
                <Button
                  size="lg"
                  className="bg-white text-cowork-700 hover:bg-cowork-100"
                  asChild
                >
                  {isAuthenticated ? (
                    <Link to="/spaces">Find a Space</Link>
                  ) : (
                    <Link to="/signup">Get Started</Link>
                  )}
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <img
                src="https://images.unsplash.com/photo-1517502884422-41eaead166d4?q=80&w=1200&auto=format&fit=crop"
                alt="Meeting room workspace"
                className="w-full h-auto rounded-xl shadow-lg object-cover aspect-[4/3]"
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
