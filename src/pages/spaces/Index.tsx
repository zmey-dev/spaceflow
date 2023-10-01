
import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { useBooking } from "@/contexts/BookingContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Search, Users } from "lucide-react";

const SpacesPage = () => {
  const { spaces } = useBooking();
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredSpaces = spaces.filter(
    (space) =>
      space.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      space.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      space.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="container py-8 md:py-12">
        <div className="mb-8 space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold">Available Spaces</h1>
          <p className="text-muted-foreground">
            Find and book the perfect workspace for your needs
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search spaces..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Space Grid */}
        {filteredSpaces.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-xl font-semibold mb-2">No spaces found</h2>
            <p className="text-muted-foreground">
              Try adjusting your search to find what you're looking for.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredSpaces.map((space) => (
              <div
                key={space.id}
                className="group overflow-hidden rounded-xl border bg-white shadow-sm transition-all hover:shadow-md"
              >
                <Link to={`/spaces/${space.id}`} className="block">
                  <div className="aspect-video w-full overflow-hidden">
                    <img
                      src={space.images[0]}
                      alt={space.name}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-xl">{space.name}</h3>
                      <Badge variant="outline">${space.pricePerHour}/hr</Badge>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                      {space.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {space.amenities.slice(0, 3).map((amenity) => (
                        <Badge key={amenity} variant="secondary" className="bg-cowork-50">
                          {amenity}
                        </Badge>
                      ))}
                      {space.amenities.length > 3 && (
                        <Badge variant="secondary" className="bg-cowork-50">
                          +{space.amenities.length - 3} more
                        </Badge>
                      )}
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{space.location}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Up to {space.capacity}</span>
                      </div>
                    </div>
                  </div>
                </Link>
                <div className="border-t p-4">
                  <Button className="w-full" asChild>
                    <Link to={`/spaces/${space.id}`}>View Details</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SpacesPage;
