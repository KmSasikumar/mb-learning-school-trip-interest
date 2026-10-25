"use client";

import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { submitInterest } from "./actions";
import { TRIPS } from "@/lib/trips";

const TRIP_ICONS: Record<string, string> = {
  "jaipur-heritage": "🏰",
  "london-universities": "🎓",
  "singapore-stem": "🔬",
};

const TRIP_CLASSES: Record<string, string> = {
  "jaipur-heritage": "card-jaipur",
  "london-universities": "card-london",
  "singapore-stem": "card-singapore",
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending} type="submit">
      {pending ? "Saving…" : "Register interest"}
    </button>
  );
}

export default function HomePage() {
  const [state, formAction] = useFormState(submitInterest, { ok: false });
  const [expandedTrip, setExpandedTrip] = useState<string | null>(null);
  return (
    <>
      <section className="hero">
        <p className="eyebrow">For teachers · 3 sample trips</p>
        <h1>School Trip Interest</h1>
        <p className="lede">
          Pick a trip below, then register your interest. A teacher from your
          school can use the form — we will get back to you about the trip.
        </p>
      </section>

      <section className="grid" aria-label="Sample trips">
        {TRIPS.map((trip) => {
          const expanded = expandedTrip === trip.id;
          return (
            <article
              className={`card ${TRIP_CLASSES[trip.id] ?? ""}`}
              key={trip.id}
            >
              <div className="card-visual" aria-hidden="true">
                {TRIP_ICONS[trip.id] ?? "✈️"}
              </div>
              <div className="card-body">
                <h2>{trip.title}</h2>
                <p className="duration">{trip.duration}</p>
                <p>{trip.description}</p>
                <p>
                  <button
                    aria-expanded={expanded}
                    className="details-toggle"
                    onClick={() =>
                      setExpandedTrip(expanded ? null : trip.id)
                    }
                    type="button"
                  >
                    {expanded ? "Hide trip details" : "View trip details"}
                  </button>
                </p>
                {expanded && (
                  <div className="trip-details">
                    <p className="sample-note">
                      Sample trip — the itinerary below is illustrative
                      only. Price on enquiry; no dates or booking terms
                      are shown here.
                    </p>
                    <h3>Sample itinerary</h3>
                    <ol>
                      {trip.itinerary.map((day) => (
                        <li key={day}>{day}</li>
                      ))}
                    </ol>
                    <h3>Who it suits</h3>
                    <p>{trip.suits}</p>
                    <h3>What is included (sample)</h3>
                    <ul>
                      {trip.includes.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </section>

      <section className="form-card" aria-label="Register interest">
        <h2>Register interest</h2>
        <p className="lede">
          Tell us who you are and which trip your students are interested in.
        </p>
        {state.ok && (
          <p className="success" role="status">
            Thank you — your interest has been saved.
          </p>
        )}
        {state.error && (
          <p className="error" role="alert">
            {state.error}
          </p>
        )}
        <form action={formAction}>
          <label htmlFor="name">Name</label>
          <input id="name" name="name" required />

          <label htmlFor="school">School</label>
          <input id="school" name="school" required />

          <label htmlFor="email">Email</label>
          <input id="email" name="email" required type="email" />

          <label htmlFor="phone">Phone</label>
          <input id="phone" name="phone" required type="tel" />

          <label htmlFor="trip">Trip</label>
          <select id="trip" name="trip" required defaultValue="">
            <option value="" disabled>
              Choose a trip
            </option>
            {TRIPS.map((trip) => (
              <option key={trip.id} value={trip.id}>
                {trip.title}
              </option>
            ))}
          </select>

          <label htmlFor="students">Number of students</label>
          <input id="students" min="1" name="students" required step="1" type="number" />

          <p>
            <SubmitButton />
          </p>
        </form>
        <p className="form-foot">
          <a href="/admin">Admin login</a>
        </p>
      </section>
    </>
  );
}
