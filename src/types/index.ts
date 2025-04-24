
export type UserRole = "admin" | "client";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Space {
  id: string;
  name: string;
  description: string;
  capacity: number;
  amenities: string[];
  pricePerHour: number;
  images: string[];
  location: string;
}

export interface TimeSlot {
  id: string;
  start: Date;
  end: Date;
  isAvailable: boolean;
  spaceId: string;
}

export interface Booking {
  id: string;
  userId: string;
  spaceId: string;
  startTime: Date;
  endTime: Date;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: Date;
  totalPrice: number;
  notes?: string;
}
