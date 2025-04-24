
import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { format } from "date-fns";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Layout } from "@/components/Layout";
import { useBooking } from "@/contexts/BookingContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { CalendarDays, Clock, Info, MapPin, Users } from "lucide-react";

// Form schema
const formSchema = z.object({
  startSlot: z.string().min(1, "Please select a start time"),
  endSlot: z.string().min(1, "Please select an end time"),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const BookingPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const dateParam = queryParams.get("date");
  const [selectedDate, setSelectedDate] = useState<Date>(
    dateParam ? new Date(dateParam) : new Date()
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { getSpaceById, availableTimeSlots, createBooking } = useBooking();
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(`/login?redirect=${location.pathname}${location.search}`);
    }
  }, [isAuthenticated, navigate, location]);

  if (!id) {
    navigate("/spaces");
    return null;
  }

  const space = getSpaceById(id);

  if (!space) {
    navigate("/spaces");
    return null;
  }

  const availableSlots = availableTimeSlots(id, selectedDate);

  if (availableSlots.length === 0) {
    navigate(`/spaces/${id}`);
    return null;
  }

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startSlot: "",
      endSlot: "",
      notes: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    if (!user) return;

    setIsSubmitting(true);
    try {
      const startSlot = availableSlots.find((slot) => slot.id === data.startSlot);
      const endSlot = availableSlots.find((slot) => slot.id === data.endSlot);

      if (!startSlot || !endSlot) {
        throw new Error("Invalid time slots selected");
      }

      await createBooking(
        user.id,
        space.id,
        startSlot.start,
        endSlot.end,
        data.notes
      );

      navigate("/bookings");
    } catch (error) {
      console.error("Booking failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const watchStartSlot = form.watch("startSlot");
  
  // Filter end slots based on selected start slot
  const availableEndSlots = availableSlots.filter((slot) => {
    if (!watchStartSlot) return false;
    
    const startSlot = availableSlots.find((s) => s.id === watchStartSlot);
    if (!startSlot) return false;
    
    return slot.start >= startSlot.start;
  });

  // Calculate total price
  const calculateTotalPrice = () => {
    const startSlot = availableSlots.find((slot) => slot.id === watchStartSlot);
    const endSlot = availableSlots.find((slot) => slot.id === form.watch("endSlot"));

    if (!startSlot || !endSlot) return 0;

    const hours = (endSlot.end.getTime() - startSlot.start.getTime()) / (1000 * 60 * 60);
    return space.pricePerHour * hours;
  };

  return (
    <Layout>
      <div className="container py-8 md:py-12">
        <div className="mb-8 space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold">Book {space.name}</h1>
          <p className="text-muted-foreground">
            Complete your booking details
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-[1fr_350px]">
          {/* Left Column - Booking Form */}
          <div>
            <Card>
              <CardContent className="pt-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <CalendarDays className="h-5 w-5" />
                        <span>
                          Booking for <span className="font-medium text-foreground">{format(selectedDate, "EEEE, MMMM d, yyyy")}</span>
                        </span>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <FormField
                          control={form.control}
                          name="startSlot"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Start Time</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select start time" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {availableSlots.map((slot) => (
                                    <SelectItem key={slot.id} value={slot.id}>
                                      {format(slot.start, "h:mm a")}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="endSlot"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>End Time</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                disabled={!watchStartSlot}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select end time" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {availableEndSlots.map((slot) => (
                                    <SelectItem key={slot.id} value={slot.id}>
                                      {format(slot.end, "h:mm a")}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="notes"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Special Requests (Optional)</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Any special requirements or notes for your booking..."
                                className="resize-none"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Processing..." : "Confirm Booking"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Booking Summary */}
          <div>
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-lg font-semibold mb-4">Booking Summary</h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Space</h3>
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-md overflow-hidden">
                        <img
                          src={space.images[0]}
                          alt={space.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium">{space.name}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {space.location}
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Details</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4 text-muted-foreground" />
                        <span>{format(selectedDate, "EEEE, MMMM d, yyyy")}</span>
                      </div>
                      {watchStartSlot && form.watch("endSlot") && (
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {format(
                              availableSlots.find((s) => s.id === watchStartSlot)?.start || new Date(),
                              "h:mm a"
                            )}{" "}
                            -{" "}
                            {format(
                              availableSlots.find((s) => s.id === form.watch("endSlot"))?.end || new Date(),
                              "h:mm a"
                            )}
                          </span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>
                          Up to {space.capacity} {space.capacity === 1 ? "person" : "people"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Pricing</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>${space.pricePerHour} x hourly rate</span>
                        <span>${space.pricePerHour}/hour</span>
                      </div>
                      {watchStartSlot && form.watch("endSlot") && (
                        <>
                          <div className="flex justify-between font-medium">
                            <span>Total</span>
                            <span>${calculateTotalPrice().toFixed(2)}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="rounded-md bg-blue-50 p-3 flex gap-2">
                    <Info className="h-5 w-5 text-blue-500 shrink-0" />
                    <div className="text-sm text-blue-700">
                      Free cancellation up to 24 hours before your booking.
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BookingPage;
