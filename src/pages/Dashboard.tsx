
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Layout } from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { useBooking } from "@/contexts/BookingContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, Clock, MapPin, Plus } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { userBookings, getSpaceById, spaces } = useBooking();
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login?redirect=/dashboard");
    }
  }, [isAuthenticated, navigate]);
  
  if (!user) {
    return null;
  }
  
  const bookings = userBookings(user.id);
  
  // Upcoming bookings, sorted by start time
  const upcomingBookings = bookings
    .filter(
      (booking) => booking.status !== "cancelled" && new Date(booking.startTime) > new Date()
    )
    .sort((a, b) => a.startTime.getTime() - b.startTime.getTime())
    .slice(0, 3);
  
  // Featured spaces (different from upcoming bookings' spaces)
  const bookedSpaceIds = new Set(upcomingBookings.map(booking => booking.spaceId));
  const featuredSpaces = spaces
    .filter(space => !bookedSpaceIds.has(space.id))
    .slice(0, 3);

  return (
    <Layout>
      <div className="container py-8 md:py-12">
        <div className="flex flex-col gap-2 mb-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Welcome, {user.name}</h1>
            <p className="text-muted-foreground mt-1">
              Manage your bookings and discover new spaces
            </p>
          </div>
          <Button asChild>
            <Link to="/spaces">
              <Plus className="mr-2 h-4 w-4" /> Book a Space
            </Link>
          </Button>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Upcoming Bookings Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Upcoming Bookings</h2>
              <Button variant="link" asChild>
                <Link to="/bookings">View all</Link>
              </Button>
            </div>

            {upcomingBookings.length === 0 ? (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-8">
                    <h3 className="font-medium mb-2">No upcoming bookings</h3>
                    <p className="text-muted-foreground mb-4">
                      You don't have any upcoming bookings. Start by browsing our available spaces.
                    </p>
                    <Button asChild>
                      <Link to="/spaces">Browse Spaces</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {upcomingBookings.map((booking) => {
                  const space = getSpaceById(booking.spaceId);
                  
                  if (!space) return null;
                  
                  return (
                    <Card key={booking.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-lg">{space.name}</CardTitle>
                          <div className="text-sm font-medium">
                            {booking.status === "confirmed" ? (
                              <span className="text-green-600">Confirmed</span>
                            ) : (
                              <span className="text-yellow-600">Pending</span>
                            )}
                          </div>
                        </div>
                        <CardDescription>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            <span>{space.location}</span>
                          </div>
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="text-sm space-y-1">
                          <div className="flex items-center gap-2">
                            <CalendarDays className="h-4 w-4 text-muted-foreground" />
                            <span>{format(new Date(booking.startTime), "EEEE, MMMM d, yyyy")}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>
                              {format(new Date(booking.startTime), "h:mm a")} - 
                              {format(new Date(booking.endTime), "h:mm a")}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" size="sm" asChild className="w-full">
                          <Link to="/bookings">Manage Booking</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>

          {/* Recommended Spaces Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Recommended Spaces</h2>
              <Button variant="link" asChild>
                <Link to="/spaces">View all</Link>
              </Button>
            </div>

            <div className="space-y-4">
              {featuredSpaces.map((space) => (
                <Card key={space.id}>
                  <div className="flex h-full">
                    <div className="w-1/3">
                      <img
                        src={space.images[0]}
                        alt={space.name}
                        className="h-full w-full object-cover rounded-l-md"
                      />
                    </div>
                    <div className="w-2/3 flex flex-col">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{space.name}</CardTitle>
                        <CardDescription className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span>{space.location}</span>
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2 flex-1">
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {space.description}
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button size="sm" asChild className="w-full">
                          <Link to={`/spaces/${space.id}`}>View Details</Link>
                        </Button>
                      </CardFooter>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
