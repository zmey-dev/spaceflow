
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { useBooking } from "@/contexts/BookingContext";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Plus } from "lucide-react";

const AdminSpacesPage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, isAdmin } = useAuth();
  const { spaces } = useBooking();
  
  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      navigate("/login");
    }
  }, [isAuthenticated, isAdmin, navigate]);
  
  if (!user || !isAdmin) {
    return null;
  }

  return (
    <Layout>
      <div className="container py-8 md:py-12">
        <div className="flex flex-col gap-2 mb-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Spaces Management</h1>
            <p className="text-muted-foreground mt-1">
              Add, edit, and manage your coworking spaces
            </p>
          </div>
          <Button asChild>
            <Link to="/admin">
              <Plus className="mr-2 h-4 w-4" /> Add New Space
            </Link>
          </Button>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Amenities</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {spaces.map((space) => (
                <TableRow key={space.id}>
                  <TableCell className="font-medium">{space.name}</TableCell>
                  <TableCell>{space.location}</TableCell>
                  <TableCell>{space.capacity}</TableCell>
                  <TableCell>${space.pricePerHour}/hour</TableCell>
                  <TableCell>
                    <div className="max-w-[200px] truncate">
                      {space.amenities.join(", ")}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" asChild>
                      <Link to="/admin">
                        <Pencil className="h-4 w-4" />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Layout>
  );
};

export default AdminSpacesPage;
