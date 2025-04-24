
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { useBooking } from "@/contexts/BookingContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, isAdmin } = useAuth();
  const { bookings, spaces, confirmBooking } = useBooking();
  
  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      navigate("/login");
    }
  }, [isAuthenticated, isAdmin, navigate]);
  
  if (!user || !isAdmin) {
    return null;
  }
  
  // Stats
  const totalBookings = bookings.length;
  const pendingBookings = bookings.filter(booking => booking.status === "pending").length;
  const confirmedBookings = bookings.filter(booking => booking.status === "confirmed").length;
  const cancelledBookings = bookings.filter(booking => booking.status === "cancelled").length;
  const totalRevenue = bookings
    .filter(booking => booking.status === "confirmed")
    .reduce((sum, booking) => sum + booking.totalPrice, 0);
  
  const handleConfirmBooking = async (bookingId: string) => {
    await confirmBooking(bookingId);
  };

  return (
    <Layout>
      <div className="container py-8 md:py-12">
        <div className="flex flex-col gap-2 mb-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Manage spaces, bookings, and users
            </p>
          </div>
        </div>
        
        {/* Stats Section */}
        <div className="grid gap-4 mb-8 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Spaces
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{spaces.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Bookings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalBookings}</div>
              <div className="text-xs text-muted-foreground mt-1">
                <span className="text-green-600">{confirmedBookings} confirmed</span> • 
                <span className="text-yellow-600 ml-1">{pendingBookings} pending</span> • 
                <span className="text-red-600 ml-1">{cancelledBookings} cancelled</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
              <div className="text-xs text-muted-foreground mt-1">
                From {confirmedBookings} confirmed bookings
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Pending Approvals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingBookings}</div>
            </CardContent>
          </Card>
        </div>
        
        {/* Admin Navigation Tabs */}
        <Tabs defaultValue="spaces" className="mb-8">
          <TabsList className="mb-6">
            <TabsTrigger value="spaces" asChild>
              <Link to="/admin/spaces">Spaces Management</Link>
            </TabsTrigger>
            <TabsTrigger value="bookings" asChild>
              <Link to="/admin/bookings">Bookings Management</Link>
            </TabsTrigger>
            <TabsTrigger value="users" asChild>
              <Link to="/admin/users">Users Management</Link>
            </TabsTrigger>
          </TabsList>
        </Tabs>
        
        {/* Pending Approvals Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Pending Approvals</h2>
            <Button variant="outline" size="sm" asChild>
              <Link to="/admin/bookings">View All Bookings</Link>
            </Button>
          </div>
          
          {pendingBookings === 0 ? (
            <Card>
              <CardContent className="py-6">
                <div className="text-center">
                  <p className="text-muted-foreground">
                    No pending bookings requiring approval.
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {bookings
                .filter(booking => booking.status === "pending")
                .slice(0, 5)
                .map(booking => {
                  const space = spaces.find(space => space.id === booking.spaceId);
                  if (!space) return null;
                  
                  return (
                    <Card key={booking.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between">
                          <div>
                            <CardTitle className="text-lg">{space.name}</CardTitle>
                            <div className="text-sm text-muted-foreground">
                              Booking ID: {booking.id}
                            </div>
                          </div>
                          <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="grid gap-2 sm:grid-cols-3">
                          <div>
                            <div className="text-xs text-muted-foreground">Date & Time</div>
                            <div className="text-sm">
                              {new Date(booking.startTime).toLocaleDateString()} • 
                              {new Date(booking.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
                              {new Date(booking.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-muted-foreground">Total Price</div>
                            <div className="text-sm">${booking.totalPrice.toFixed(2)}</div>
                          </div>
                          <div>
                            <div className="text-xs text-muted-foreground">Created At</div>
                            <div className="text-sm">{new Date(booking.createdAt).toLocaleDateString()}</div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button
                          size="sm"
                          className="mr-2"
                          onClick={() => handleConfirmBooking(booking.id)}
                        >
                          Approve
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                          <Link to="/admin/bookings">View Details</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  );
                })}
            </div>
          )}
        </div>
        
        {/* Recent Spaces Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Recent Spaces</h2>
            <Button variant="outline" size="sm" asChild>
              <Link to="/admin/spaces">View All Spaces</Link>
            </Button>
          </div>
          
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {spaces.slice(0, 3).map(space => (
              <Card key={space.id}>
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={space.images[0]}
                    alt={space.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{space.name}</CardTitle>
                  <div className="text-sm text-muted-foreground">
                    {space.location} • Capacity: {space.capacity}
                  </div>
                </CardHeader>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link to={`/admin/spaces`}>Manage Space</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
