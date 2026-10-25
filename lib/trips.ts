export const TRIPS = [
  {
    description:
      "Science centres, a university lab visit, and hands-on STEM workshops.",
    duration: "5 days",
    id: "singapore-stem",
    includes: [
      "Guided science centre visits",
      "University lab visit and STEM workshops",
      "Group travel and guided sightseeing",
    ],
    itinerary: [
      "Day 1 — Arrive and settle in, orientation walk",
      "Day 2 — Science centre visit and hands-on exhibits",
      "Day 3 — University lab visit and STEM workshops",
      "Day 4 — Applied science workshops and team challenge",
      "Day 5 — Final showcase and return",
    ],
    suits: "Students interested in science, technology, and hands-on problem solving.",
    title: "Singapore STEM",
  },
  {
    description:
      "Palaces, forts, and living craft traditions, with guided heritage walks.",
    duration: "4 days",
    id: "jaipur-heritage",
    includes: [
      "Guided palace and fort visits",
      "Heritage walks with local guides",
      "Craft demonstrations by local artisans",
    ],
    itinerary: [
      "Day 1 — Arrive and settle in, evening heritage walk",
      "Day 2 — Palace visits and royal history",
      "Day 3 — Fort visit and craft traditions",
      "Day 4 — Local markets and return",
    ],
    suits: "Students interested in history, culture, and traditional crafts.",
    title: "Jaipur Heritage",
  },
  {
    description:
      "Campus tours and subject talks at London universities, plus city sightseeing.",
    duration: "6 days",
    id: "london-universities",
    includes: [
      "Campus tours at London universities",
      "Subject talks and Q&A sessions",
      "Guided city sightseeing",
    ],
    itinerary: [
      "Day 1 — Arrive and settle in, orientation walk",
      "Day 2 — First university campus tour and subject talk",
      "Day 3 — Second university campus tour and subject talk",
      "Day 4 — Third university visit and student Q&A",
      "Day 5 — City sightseeing and museums",
      "Day 6 — Final reflections and return",
    ],
    suits: "Students exploring university options and subjects to study next.",
    title: "London Universities",
  },
] as const;

export type TripId = (typeof TRIPS)[number]["id"];

export const TRIP_IDS: TripId[] = TRIPS.map((t) => t.id);

export function tripTitle(id: string): string {
  return TRIPS.find((t) => t.id === id)?.title ?? id;
}

export type InterestInput = {
  email: string;
  name: string;
  phone: string;
  school: string;
  students: number;
  trip: string;
};

/** Pure validation, shared by the form action. Returns an error string or null. */
export function validateInterest(input: InterestInput): string | null {
  if (!input.name.trim()) return "Name is required.";
  if (!input.school.trim()) return "School is required.";
  if (!input.email.trim()) return "Email is required.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email.trim()))
    return "Enter a valid email address.";
  if (!input.phone.trim()) return "Phone is required.";
  if (!TRIP_IDS.includes(input.trip as TripId))
    return "Trip must be one of the three listed trips.";
  if (!Number.isInteger(input.students) || input.students <= 0)
    return "Number of students must be a positive whole number.";
  return null;
}
