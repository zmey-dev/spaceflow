
import { Booking, Space, TimeSlot, User } from "@/types";

// Mock Users
export const users: User[] = [
  {
    id: "user-1",
    name: "John Doe",
    email: "john@example.com",
    role: "client",
    avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=100&auto=format&fit=crop",
  },
  {
    id: "user-2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "client",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&auto=format&fit=crop",
  },
  {
    id: "admin-1",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&auto=format&fit=crop",
  },
];

// Mock Spaces
export const spaces: Space[] = [
  {
    id: "space-1",
    name: "Creative Studio",
    description: "A bright and airy space perfect for creative work and collaboration. Features large windows with natural light and comfortable seating.",
    capacity: 8,
    amenities: ["High-speed WiFi", "Whiteboard", "Coffee Machine", "Projector", "Air Conditioning"],
    pricePerHour: 25,
    images: [
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1497215842964-222b430dc094?q=80&w=1200&auto=format&fit=crop",
    ],
    location: "Floor 2, East Wing",
  },
  {
    id: "space-2",
    name: "Meeting Room A",
    description: "Professional meeting room equipped with the latest technology for presentations and video conferences.",
    capacity: 6,
    amenities: ["Video Conferencing", "Smart TV", "Whiteboard", "High-speed WiFi", "Water Dispenser"],
    pricePerHour: 35,
    images: [
      "https://images.unsplash.com/photo-1517502884422-41eaead166d4?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1564069114553-7215e1ff1890?q=80&w=1200&auto=format&fit=crop",
    ],
    location: "Floor 1, North Wing",
  },
  {
    id: "space-3",
    name: "Conference Room",
    description: "Large conference room ideal for team meetings, workshops, and corporate events.",
    capacity: 20,
    amenities: ["Projector", "Sound System", "Video Conferencing", "Whiteboard", "High-speed WiFi", "Coffee Service"],
    pricePerHour: 50,
    images: [
      "https://images.unsplash.com/photo-1517502884422-41eaead166d4?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1462826303085-db5745029389?q=80&w=1200&auto=format&fit=crop",
    ],
    location: "Floor 3, West Wing",
  },
  {
    id: "space-4",
    name: "Quiet Zone",
    description: "Private space designed for focused work with soundproof walls and ergonomic furniture.",
    capacity: 1,
    amenities: ["High-speed WiFi", "Ergonomic Chair", "Adjustable Desk", "Reading Lamp", "Air Conditioning"],
    pricePerHour: 15,
    images: [
      "https://images.unsplash.com/photo-1554295405-abb8fd54f153?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1498409785966-ab341407de6e?q=80&w=1200&auto=format&fit=crop",
    ],
    location: "Floor 2, South Wing",
  },
  {
    id: "space-5",
    name: "Innovation Hub",
    description: "Collaborative space with flexible furniture and writable walls, perfect for brainstorming sessions.",
    capacity: 12,
    amenities: ["Writable Walls", "Flexible Furniture", "High-speed WiFi", "Smart TV", "Coffee Machine"],
    pricePerHour: 40,
    images: [
      "https://images.unsplash.com/photo-1520881363902-a0ff4e722963?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600508774634-4e11d34730e2?q=80&w=1200&auto=format&fit=crop",
    ],
    location: "Floor 4, Central Area",
  },
];

// Helper function to generate date objects for the next 7 days
const generateDates = () => {
  const dates = [];
  const today = new Date();
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    dates.push(date);
  }
  
  return dates;
};

// Helper function to generate time slots for a given date and space
const generateTimeSlotsForDate = (date: Date, spaceId: string): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const startHour = 8; // 8 AM
  const endHour = 20; // 8 PM
  
  for (let hour = startHour; hour < endHour; hour++) {
    const start = new Date(date);
    start.setHours(hour, 0, 0, 0);
    
    const end = new Date(date);
    end.setHours(hour + 1, 0, 0, 0);
    
    // Randomly determine availability (80% chance of being available)
    const isAvailable = Math.random() > 0.2;
    
    slots.push({
      id: `slot-${spaceId}-${date.toISOString()}-${hour}`,
      start,
      end,
      isAvailable,
      spaceId,
    });
  }
  
  return slots;
};

// Generate time slots for all spaces for the next 7 days
export const generateTimeSlots = (): TimeSlot[] => {
  const dates = generateDates();
  let allSlots: TimeSlot[] = [];
  
  spaces.forEach(space => {
    dates.forEach(date => {
      const slotsForDate = generateTimeSlotsForDate(date, space.id);
      allSlots = [...allSlots, ...slotsForDate];
    });
  });
  
  return allSlots;
};

// Initialize time slots
export const timeSlots: TimeSlot[] = generateTimeSlots();

// Generate some mock bookings
const generateMockBookings = (): Booking[] => {
  const bookings: Booking[] = [];
  const bookedSlots: TimeSlot[] = timeSlots.filter(slot => !slot.isAvailable).slice(0, 15);
  
  bookedSlots.forEach((slot, index) => {
    const userId = users[index % users.length].id;
    
    bookings.push({
      id: `booking-${index + 1}`,
      userId,
      spaceId: slot.spaceId,
      startTime: slot.start,
      endTime: slot.end,
      status: Math.random() > 0.2 ? "confirmed" : "pending",
      createdAt: new Date(slot.start.getTime() - 1000 * 60 * 60 * 24 * Math.floor(Math.random() * 7)), // Random creation date within the last 7 days
      totalPrice: spaces.find(s => s.id === slot.spaceId)?.pricePerHour || 0,
      notes: Math.random() > 0.7 ? "Please prepare the room with extra chairs." : undefined,
    });
  });
  
  return bookings;
};

export const bookings: Booking[] = generateMockBookings();

// Current user for session management
export const currentUser: User = users[0];

// Authentication functions
export const login = (email: string, password: string): User | null => {
  // Simple mock authentication
  const user = users.find(u => u.email === email);
  return user || null;
};

export const getCurrentUser = (): User => {
  return currentUser;
};

// Booking management functions
export const getUserBookings = (userId: string): Booking[] => {
  return bookings.filter(booking => booking.userId === userId);
};

export const getAvailableTimeSlots = (spaceId: string, date: Date): TimeSlot[] => {
  const targetDate = new Date(date);
  targetDate.setHours(0, 0, 0, 0);
  
  return timeSlots.filter(slot => {
    const slotDate = new Date(slot.start);
    slotDate.setHours(0, 0, 0, 0);
    
    return slot.spaceId === spaceId && 
           slotDate.getTime() === targetDate.getTime() && 
           slot.isAvailable;
  });
};

export const createBooking = (
  userId: string,
  spaceId: string,
  startTime: Date,
  endTime: Date,
  notes?: string
): Booking => {
  const space = spaces.find(s => s.id === spaceId);
  
  if (!space) {
    throw new Error("Space not found");
  }
  
  // Calculate number of hours (simplified)
  const hours = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);
  
  const newBooking: Booking = {
    id: `booking-${bookings.length + 1}`,
    userId,
    spaceId,
    startTime,
    endTime,
    status: "pending",
    createdAt: new Date(),
    totalPrice: space.pricePerHour * hours,
    notes,
  };
  
  bookings.push(newBooking);
  
  // Update availability of the time slots
  timeSlots.forEach(slot => {
    if (
      slot.spaceId === spaceId &&
      slot.start >= startTime &&
      slot.end <= endTime
    ) {
      slot.isAvailable = false;
    }
  });
  
  return newBooking;
};

export const cancelBooking = (bookingId: string): boolean => {
  const bookingIndex = bookings.findIndex(b => b.id === bookingId);
  
  if (bookingIndex === -1) {
    return false;
  }
  
  const booking = bookings[bookingIndex];
  booking.status = "cancelled";
  
  // Update availability of the time slots
  timeSlots.forEach(slot => {
    if (
      slot.spaceId === booking.spaceId &&
      slot.start >= booking.startTime &&
      slot.end <= booking.endTime
    ) {
      slot.isAvailable = true;
    }
  });
  
  return true;
};

export const confirmBooking = (bookingId: string): boolean => {
  const booking = bookings.find(b => b.id === bookingId);
  
  if (!booking) {
    return false;
  }
  
  booking.status = "confirmed";
  return true;
};
