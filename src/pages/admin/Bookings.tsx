
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Layout } from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { useBooking } from "@/contexts/BookingContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

const AdminBookingsPage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, isAdmin } = useAuth();
  const { bookings, spaces, confirmBooking, cancelBooking } = useBooking();
  
  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      navigate("/login");
    }
  }, [isAuthenticated, isAdmin, navigate]);
  
  if (!user || !isAdmin) {
    return null;
  }
  
  const handleConfirmBooking = async (bookingId: string) => {
    await confirmBooking(bookingId);
  };
  
  const handleCancelBooking = async (bookingId: string) => {
    await cancelBooking(bookingId);
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-100 text-green-800">Confirmed</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>;
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="container py-8 md:py-12">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">Bookings Management</h1>
          <p className="text-muted-foreground mt-1">
            View and manage all bookings across your spaces
          </p>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Space</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((booking) => {
                const space = spaces.find(space => space.id === booking.spaceId);
                if (!space) return null;
                
                return (
                  <TableRow key={booking.id}>
                    <TableCell className="font-medium">{booking.id}</TableCell>
                    <TableCell>{space.name}</TableCell>
                    <TableCell>
                      {format(new Date(booking.startTime), "MMM d, yyyy")}
                      <div className="text-sm text-muted-foreground">
                        {format(new Date(booking.startTime), "h:mm a")} - {format(new Date(booking.endTime), "h:mm a")}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(booking.status)}</TableCell>
                    <TableCell>${booking.totalPrice.toFixed(2)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {booking.status === "pending" && (
                            <DropdownMenuItem onClick={() => handleConfirmBooking(booking.id)}>
                              Confirm Booking
                            </DropdownMenuItem>
                          )}
                          {booking.status !== "cancelled" && (
                            <DropdownMenuItem onClick={() => handleCancelBooking(booking.id)}>
                              Cancel Booking
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </Layout>
  );
};

export default AdminBookingsPage;
