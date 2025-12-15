import { useState, useEffect } from "react";

import { EventTypeSelection } from "../../components/EventTypeSelection";
import { VendorCategorySelection } from "../../components/VendorCategorySelection";
import { VendorListingPage } from "../../components/VendorListingPage";
import VendorDetailsPage from "../../components/VendorDetailsPage";

export default function EventsModule() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  const [eventTypes, setEventTypes] = useState([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [vendors, setVendors] = useState([]);
  const [vendorDetails, setVendorDetails] = useState(null);

  const [selectedEvent, setSelectedEvent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedVendorId, setSelectedVendorId] = useState("");

  // STEP 1 — Load event types
  useEffect(() => {
    fetch("/api/events/types")
      .then(res => res.json())
      .then(setEventTypes)
      .catch(() => setEventTypes([]));
  }, []);

  // STEP 2 — Load categories
  useEffect(() => {
    if (!selectedEvent) return;

    fetch(`/api/vendors/categories`)
      .then(res => res.json())
      .then(setCategories)
      .catch(() => setCategories([]));
  }, [selectedEvent]);

  // STEP 3 — Load vendors
  useEffect(() => {
    if (!selectedEvent || !selectedCategory) return;

    fetch(`/api/vendors/list?category=${selectedCategory}`)
      .then(res => res.json())
      .then(setVendors)
      .catch(() => setVendors([]));
  }, [selectedCategory]);

  // STEP 4 — Load vendor details
  useEffect(() => {
    if (!selectedVendorId) return;

    fetch(`/api/vendors/details/${selectedVendorId}`)
      .then(res => res.json())
      .then(data => setVendorDetails(data))
      .catch(() => setVendorDetails(null));
  }, [selectedVendorId]);

  return (
    <div className="container py-10">

      {step === 1 && (
        <EventTypeSelection
          eventTypes={eventTypes}
          onSelectType={(id) => {
            setSelectedEvent(id);
            setStep(2);
          }}
        />
      )}

      {step === 2 && (
        <VendorCategorySelection
          categories={categories}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            setStep(3);
          }}
          onBack={() => setStep(1)}
        />
      )}

      {step === 3 && (
  <VendorListingPage
    eventType={selectedEvent}
    category={selectedCategory}
    onBack={() => setStep(2)}
    onViewVendor={(vendorId) => {
      setSelectedVendorId(vendorId);
      setStep(4);
    }}
  />
)}

      

      {step === 4 && vendorDetails && (
        <VendorDetailsPage
          vendor={vendorDetails}
          onBack={() => setStep(3)}
          onBookNow={() => {}}
        />
      )}

    </div>
  );
}
