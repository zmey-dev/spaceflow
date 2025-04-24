
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "@/contexts/AuthContext";
import { BookingProvider } from "@/contexts/BookingContext";

import HomePage from "@/pages/Index";
import SpacesPage from "@/pages/spaces/Index";
import SpaceDetailPage from "@/pages/spaces/Detail";
import BookingPage from "@/pages/spaces/Booking";
import LoginPage from "@/pages/Login";
import SignupPage from "@/pages/Signup";
import ProfilePage from "@/pages/Profile";
import BookingsPage from "@/pages/Bookings";
import DashboardPage from "@/pages/Dashboard";
import AdminDashboardPage from "@/pages/admin/Dashboard";
import AdminSpacesPage from "@/pages/admin/Spaces";
import AdminBookingsPage from "@/pages/admin/Bookings";
import AdminUsersPage from "@/pages/admin/Users";
import HowItWorksPage from "@/pages/HowItWorks";
import PricingPage from "@/pages/Pricing";
import ContactPage from "@/pages/Contact";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <BookingProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/spaces" element={<SpacesPage />} />
              <Route path="/spaces/:id" element={<SpaceDetailPage />} />
              <Route path="/spaces/:id/booking" element={<BookingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/bookings" element={<BookingsPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/admin" element={<AdminDashboardPage />} />
              <Route path="/admin/spaces" element={<AdminSpacesPage />} />
              <Route path="/admin/bookings" element={<AdminBookingsPage />} />
              <Route path="/admin/users" element={<AdminUsersPage />} />
              <Route path="/how-it-works" element={<HowItWorksPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </BookingProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
