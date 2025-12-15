import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Calendar, Clock, MapPin, Users, Edit, Trash2, Eye } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";

interface CustomerEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  guests: number;
  status: 'draft' | 'confirmed' | 'completed' | 'cancelled';
  hotelVendor?: {
    id: string;
    name: string;
    contact: string;
  };
  totalCost: number;
}

interface CustomerEventManagementProps {
  customerId: string;
}

export function CustomerEventManagement({ customerId }: CustomerEventManagementProps) {
  const [events, setEvents] = useState<CustomerEvent[]>([
    {
      id: '1',
      title: 'Wedding Reception',
      description: 'Celebration of Sarah & John wedding',
      date: '2024-12-15',
      time: '18:00',
      location: 'Grand Hotel Ballroom',
      guests: 150,
      status: 'confirmed',
      hotelVendor: {
        id: 'v1',
        name: 'Grand Plaza Hotel',
        contact: 'events@grandplaza.com'
      },
      totalCost: 12500
    },
    {
      id: '2',
      title: 'Corporate Meeting',
      description: 'Annual company retreat and strategy meeting',
      date: '2024-11-28',
      time: '09:00',
      location: 'Business Center Conference Room',
      guests: 50,
      status: 'draft',
      totalCost: 3200
    }
  ]);

  const [editingEvent, setEditingEvent] = useState<CustomerEvent | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const getStatusColor = (status: CustomerEvent['status']) => {
    switch (status) {
      case 'confirmed': return 'default';
      case 'draft': return 'secondary';
      case 'completed': return 'outline';
      case 'cancelled': return 'destructive';
      default: return 'secondary';
    }
  };

  const handleEditEvent = (event: CustomerEvent) => {
    setEditingEvent({ ...event });
    setIsEditModalOpen(true);
  };

  const handleSaveEvent = () => {
    if (editingEvent) {
      setEvents(prev => prev.map(event => 
        event.id === editingEvent.id ? editingEvent : event
      ));
      setIsEditModalOpen(false);
      setEditingEvent(null);
    }
  };

  const handleDeleteEvent = (eventId: string) => {
    if (confirm('Are you sure you want to delete this event?')) {
      setEvents(prev => prev.filter(event => event.id !== eventId));
    }
  };

  const handleCancelEvent = (eventId: string) => {
    setEvents(prev => prev.map(event => 
      event.id === eventId 
        ? { ...event, status: 'cancelled' as const }
        : event
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2>My Events</h2>
          <p className="text-muted-foreground">Manage your event bookings and reservations</p>
        </div>
        <Button>Create New Event</Button>
      </div>

      <div className="grid gap-4">
        {events.map((event) => (
          <Card key={event.id} className="w-full">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {event.title}
                    <Badge variant={getStatusColor(event.status)}>
                      {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                    </Badge>
                  </CardTitle>
                  <CardDescription>{event.description}</CardDescription>
                </div>
                <div className="text-right">
                  <div className="font-medium">${event.totalCost.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Total Cost</div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{new Date(event.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{event.guests} guests</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{event.location}</span>
              </div>
              
              {event.hotelVendor && (
                <div className="bg-muted p-3 rounded-lg mb-4">
                  <div className="font-medium">Hotel Vendor</div>
                  <div className="text-sm text-muted-foreground">
                    {event.hotelVendor.name} • {event.hotelVendor.contact}
                  </div>
                </div>
              )}
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditEvent(event)}
                  disabled={event.status === 'completed' || event.status === 'cancelled'}
                >
                  <Edit className="h-4 w-4" />
                  Edit
                </Button>
                
                {event.status === 'confirmed' && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCancelEvent(event.id)}
                  >
                    Cancel Event
                  </Button>
                )}
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteEvent(event.id)}
                  disabled={event.status === 'confirmed'}
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </Button>
                
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4" />
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Event Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Event</DialogTitle>
          </DialogHeader>
          
          {editingEvent && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Event Title</Label>
                  <Input
                    id="title"
                    value={editingEvent.title}
                    onChange={(e) => setEditingEvent({
                      ...editingEvent,
                      title: e.target.value
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="guests">Number of Guests</Label>
                  <Input
                    id="guests"
                    type="number"
                    value={editingEvent.guests}
                    onChange={(e) => setEditingEvent({
                      ...editingEvent,
                      guests: parseInt(e.target.value) || 0
                    })}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={editingEvent.description}
                  onChange={(e) => setEditingEvent({
                    ...editingEvent,
                    description: e.target.value
                  })}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={editingEvent.date}
                    onChange={(e) => setEditingEvent({
                      ...editingEvent,
                      date: e.target.value
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={editingEvent.time}
                    onChange={(e) => setEditingEvent({
                      ...editingEvent,
                      time: e.target.value
                    })}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={editingEvent.location}
                  onChange={(e) => setEditingEvent({
                    ...editingEvent,
                    location: e.target.value
                  })}
                />
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button onClick={handleSaveEvent}>Save Changes</Button>
                <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}