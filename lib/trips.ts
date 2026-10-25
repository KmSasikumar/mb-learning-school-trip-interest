export const TRIPS = [
  {
    description:
      "Science centres, a university lab visit, and hands-on STEM workshops.",
    duration: "5 days",
    id: "singapore-stem",
    title: "Singapore STEM",
  },
  {
    description:
      "Palaces, forts, and living craft traditions, with guided heritage walks.",
    duration: "4 days",
    id: "jaipur-heritage",
    title: "Jaipur Heritage",
  },
  {
    description:
      "Campus tours and subject talks at London universities, plus city sightseeing.",
    duration: "6 days",
    id: "london-universities",
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
