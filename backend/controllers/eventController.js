// controllers/eventController.js

export const getEventTypes = (req, res) => {
  const eventTypes = [
    { id: "wedding", name: "Wedding" },
    { id: "birthday", name: "Birthday" },
    { id: "corporate", name: "Corporate Event" },
    { id: "engagement", name: "Engagement" },
    { id: "party", name: "Party" },
    { id: "other", name: "Other Events" }
  ];

  res.json(eventTypes);
};
