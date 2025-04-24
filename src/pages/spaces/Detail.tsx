
import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { format } from "date-fns";
import { CalendarIcon, Check, MapPin, Users } from "lucide-react";
import { Layout } from "@/components/Layout";
import { useBooking } from "@/contexts/BookingContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const SpaceDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { getSpaceById, availableTimeSlots } = useBooking();
  const { isAuthenticated } = useAuth();
  const [date, setDate] = useState<Date>(new Date());
  
  if (!id) {
    navigate("/spaces");
    return null;
  }
  
  const space = getSpaceById(id);
  
  if (!space) {
    navigate("/spaces");
    return null;
  }
  
  const slots = availableTimeSlots(id, date);
  const hasAvailableSlots = slots.length > 0;

  return (
    <Layout>
      <div className="container py-8 md:py-12">
        <div className="grid gap-6 md:grid-cols-[2fr_1fr] lg:grid-cols-[2fr_1fr] lg:gap-12">
          {/* Left Column - Space Details */}
          <div className="space-y-6">
            {/* Breadcrumbs */}
            <div className="flex items-center text-sm">
              <Link to="/spaces" className="text-muted-foreground hover:text-foreground">
                Spaces
              </Link>
              <span className="mx-2">/</span>
              <span>{space.name}</span>
            </div>

            {/* Space Name and Location */}
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">{space.name}</h1>
              <div className="mt-2 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">{space.location}</span>
              </div>
            </div>

            {/* Space Images */}
            <div className="space-y-4">
              <div className="aspect-video overflow-hidden rounded-xl">
                <img
                  src={space.images[0]}
                  alt={space.name}
                  className="h-full w-full object-cover"
                />
              </div>
              {space.images.length > 1 && (
                <div className="grid grid-cols-2 gap-4">
                  {space.images.slice(1).map((image, index) => (
                    <div key={index} className="aspect-video overflow-hidden rounded-xl">
                      <img
                        src={image}
                        alt={`${space.name} - ${index + 2}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Space Description */}
            <div>
              <h2 className="text-xl font-semibold mb-2">About this space</h2>
              <p className="text-muted-foreground">{space.description}</p>
            </div>

            {/* Space Amenities */}
            <div>
              <h2 className="text-xl font-semibold mb-3">Amenities</h2>
              <div className="grid grid-cols-2 gap-2">
                {space.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Capacity and Price */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                  Capacity
                </h3>
                <div className="flex items-center gap-1">
                  <Users className="h-5 w-5" />
                  <span className="text-lg font-medium">
                    Up to {space.capacity} {space.capacity === 1 ? "person" : "people"}
                  </span>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                  Price
                </h3>
                <div className="text-lg font-medium">
                  ${space.pricePerHour} <span className="text-sm text-muted-foreground">per hour</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Widget */}
          <div>
            <div className="rounded-xl border bg-white shadow-sm p-6 sticky top-24">
              <h2 className="text-lg font-semibold mb-4">Book this space</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Select date</h3>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="center">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={(date) => date && setDate(date)}
                        initialFocus
                        disabled={(date) => {
                          const today = new Date();
                          today.setHours(0, 0, 0, 0);
                          const maxDate = new Date();
                          maxDate.setDate(maxDate.getDate() + 30);
                          return date < today || date > maxDate;
                        }}
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Availability</h3>
                  {hasAvailableSlots ? (
                    <div className="text-sm text-green-600 flex items-center gap-1">
                      <Check className="h-4 w-4" />
                      <span>{slots.length} slots available on {format(date, "PP")}</span>
                    </div>
                  ) : (
                    <div className="text-sm text-muted-foreground">
                      No availability on selected date. Please try another date.
                    </div>
                  )}
                </div>

                <div className="pt-2">
                  <Button className="w-full" disabled={!hasAvailableSlots} asChild>
                    {isAuthenticated ? (
                      <Link to={`/spaces/${id}/booking?date=${date.toISOString()}`}>
                        Book Now
                      </Link>
                    ) : (
                      <Link to={`/login?redirect=/spaces/${id}/booking?date=${date.toISOString()}`}>
                        Sign in to Book
                      </Link>
                    )}
                  </Button>
                </div>
                
                <div className="text-center text-xs text-muted-foreground mt-2">
                  Free cancellation up to 24 hours before your booking
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SpaceDetailPage;
