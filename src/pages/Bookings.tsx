
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Layout } from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { useBooking } from "@/contexts/BookingContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock, MapPin } from "lucide-react";

const BookingsPage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { userBookings, getSpaceById, cancelBooking } = useBooking();
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login?redirect=/bookings");
    }
  }, [isAuthenticated, navigate]);
  
  if (!user) {
    return null;
  }
  
  const bookings = userBookings(user.id);
  
  const upcomingBookings = bookings.filter(
    (booking) => booking.status !== "cancelled" && new Date(booking.startTime) > new Date()
  );
  
  const pastBookings = bookings.filter(
    (booking) => booking.status !== "cancelled" && new Date(booking.startTime) <= new Date()
  );
  
  const cancelledBookings = bookings.filter(
    (booking) => booking.status === "cancelled"
  );
  
  const handleCancelBooking = async (bookingId: string) => {
    setIsLoading(true);
    try {
      await cancelBooking(bookingId);
    } finally {
      setIsLoading(false);
    }
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Confirmed</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Pending</Badge>;
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Cancelled</Badge>;
      default:
        return null;
    }
  };
  
  const BookingCard = ({ booking }: { booking: any }) => {
    const space = getSpaceById(booking.spaceId);
    
    if (!space) {
      return null;
    }
    
    return (
      <Card>
        <CardHeader className="pb-2 pt-4 px-4">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg font-semibold">{space.name}</CardTitle>
            {getStatusBadge(booking.status)}
          </div>
        </CardHeader>
        <CardContent className="pb-3 pt-0 px-4">
          <div className="text-sm space-y-2">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
              <span>{format(new Date(booking.startTime), "EEEE, MMMM d, yyyy")}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>
                {format(new Date(booking.startTime), "h:mm a")} - {format(new Date(booking.endTime), "h:mm a")}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{space.location}</span>
            </div>
            {booking.notes && (
              <div className="pt-1">
                <p className="text-xs font-medium">Notes:</p>
                <p className="text-muted-foreground">{booking.notes}</p>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="pt-0 px-4 flex justify-between">
          <Button variant="outline" asChild>
            <Link to={`/spaces/${space.id}`}>View Space</Link>
          </Button>
          {booking.status !== "cancelled" && new Date(booking.startTime) > new Date() && (
            <Button variant="destructive" onClick={() => handleCancelBooking(booking.id)} disabled={isLoading}>
              Cancel
            </Button>
          )}
        </CardFooter>
      </Card>
    );
  };
  
  const NoBookingsMessage = ({ type }: { type: string }) => (
    <div className="text-center py-12">
      <h3 className="text-lg font-medium mb-2">No {type} bookings</h3>
      <p className="text-muted-foreground mb-4">
        {type === "upcoming"
          ? "You don't have any upcoming bookings."
          : type === "past"
          ? "You don't have any past bookings."
          : "You don't have any cancelled bookings."}
      </p>
      <Button asChild>
        <Link to="/spaces">Browse Spaces</Link>
      </Button>
    </div>
  );

  return (
    <Layout>
      <div className="container py-8 md:py-12">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">My Bookings</h1>
          <p className="text-muted-foreground mt-1">
            Manage all your bookings in one place
          </p>
        </div>

        <Tabs defaultValue="upcoming">
          <TabsList className="mb-6">
            <TabsTrigger value="upcoming">
              Upcoming ({upcomingBookings.length})
            </TabsTrigger>
            <TabsTrigger value="past">
              Past ({pastBookings.length})
            </TabsTrigger>
            <TabsTrigger value="cancelled">
              Cancelled ({cancelledBookings.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming">
            {upcomingBookings.length === 0 ? (
              <NoBookingsMessage type="upcoming" />
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {upcomingBookings.map((booking) => (
                  <BookingCard key={booking.id} booking={booking} />
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="past">
            {pastBookings.length === 0 ? (
              <NoBookingsMessage type="past" />
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {pastBookings.map((booking) => (
                  <BookingCard key={booking.id} booking={booking} />
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="cancelled">
            {cancelledBookings.length === 0 ? (
              <NoBookingsMessage type="cancelled" />
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {cancelledBookings.map((booking) => (
                  <BookingCard key={booking.id} booking={booking} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default BookingsPage;
