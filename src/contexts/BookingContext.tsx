import { createContext, useContext, useState, ReactNode } from "react";
import { Booking, Space, TimeSlot } from "@/types";
import {
  bookings as mockBookings,
  spaces as mockSpaces,
  timeSlots as mockTimeSlots,
  createBooking as mockCreateBooking,
  cancelBooking as mockCancelBooking,
  confirmBooking as mockConfirmBooking,
  getAvailableTimeSlots as mockGetAvailableTimeSlots,
  getUserBookings as mockGetUserBookings,
} from "@/lib/mock-data";
import { useToast } from "@/components/ui/use-toast";

interface BookingContextType {
  bookings: Booking[];
  spaces: Space[];
  timeSlots: TimeSlot[];
  userBookings: (userId: string) => Booking[];
  availableTimeSlots: (spaceId: string, date: Date) => TimeSlot[];
  createBooking: (userId: string, spaceId: string, startTime: Date, endTime: Date, notes?: string) => Promise<Booking>;
  cancelBooking: (bookingId: string) => Promise<boolean>;
  confirmBooking: (bookingId: string) => Promise<boolean>;
  getSpaceById: (spaceId: string) => Space | undefined;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [spaces] = useState<Space[]>(mockSpaces);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>(mockTimeSlots);
  const { toast } = useToast();

  const userBookings = (userId: string) => {
    return bookings.filter(booking => booking.userId === userId);
  };

  const availableTimeSlots = (spaceId: string, date: Date) => {
    return mockGetAvailableTimeSlots(spaceId, date);
  };

  const createBooking = async (
    userId: string,
    spaceId: string,
    startTime: Date,
    endTime: Date,
    notes?: string
  ) => {
    return new Promise<Booking>((resolve) => {
      setTimeout(() => {
        try {
          const newBooking = mockCreateBooking(userId, spaceId, startTime, endTime, notes);
          setBookings([...bookings, newBooking]);
          
          const updatedTimeSlots = timeSlots.map(slot => {
            if (
              slot.spaceId === spaceId &&
              slot.start >= startTime &&
              slot.end <= endTime
            ) {
              return { ...slot, isAvailable: false };
            }
            return slot;
          });
          
          setTimeSlots(updatedTimeSlots);
          
          toast({
            title: "Booking created",
            description: "Your booking has been created successfully",
          });
          
          resolve(newBooking);
        } catch (error) {
          toast({
            title: "Booking failed",
            description: error instanceof Error ? error.message : "Failed to create booking",
            variant: "destructive",
          });
          throw error;
        }
      }, 500);
    });
  };

  const cancelBooking = async (bookingId: string) => {
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        const success = mockCancelBooking(bookingId);
        
        if (success) {
          const updatedBookings = bookings.map(booking => {
            if (booking.id === bookingId) {
              return { ...booking, status: "cancelled" as const };
            }
            return booking;
          });
          
          setBookings(updatedBookings);
          
          const cancelledBooking = bookings.find(b => b.id === bookingId);
          
          if (cancelledBooking) {
            const updatedTimeSlots = timeSlots.map(slot => {
              if (
                slot.spaceId === cancelledBooking.spaceId &&
                slot.start >= cancelledBooking.startTime &&
                slot.end <= cancelledBooking.endTime
              ) {
                return { ...slot, isAvailable: true };
              }
              return slot;
            });
            
            setTimeSlots(updatedTimeSlots);
          }
          
          toast({
            title: "Booking cancelled",
            description: "Your booking has been cancelled successfully",
          });
        } else {
          toast({
            title: "Cancellation failed",
            description: "Failed to cancel booking",
            variant: "destructive",
          });
        }
        
        resolve(success);
      }, 500);
    });
  };

  const confirmBooking = async (bookingId: string) => {
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        const success = mockConfirmBooking(bookingId);
        
        if (success) {
          const updatedBookings = bookings.map(booking => {
            if (booking.id === bookingId) {
              return { ...booking, status: "confirmed" as const };
            }
            return booking;
          });
          
          setBookings(updatedBookings);
          
          toast({
            title: "Booking confirmed",
            description: "The booking has been confirmed successfully",
          });
        } else {
          toast({
            title: "Confirmation failed",
            description: "Failed to confirm booking",
            variant: "destructive",
          });
        }
        
        resolve(success);
      }, 500);
    });
  };

  const getSpaceById = (spaceId: string) => {
    return spaces.find(space => space.id === spaceId);
  };

  return (
    <BookingContext.Provider
      value={{
        bookings,
        spaces,
        timeSlots,
        userBookings,
        availableTimeSlots,
        createBooking,
        cancelBooking,
        confirmBooking,
        getSpaceById,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
}
