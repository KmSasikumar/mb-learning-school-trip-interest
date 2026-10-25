"use client";

import { useFormState, useFormStatus } from "react-dom";
import { submitInterest } from "./actions";
import { TRIPS } from "@/lib/trips";

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
  return (
    <>
      <h1>School Trip Interest</h1>
      <p>
        Pick a trip below, then register your interest. A teacher from your
        school can use the form — we will get back to you about the trip.
      </p>

      <section className="grid" aria-label="Sample trips">
        {TRIPS.map((trip) => (
          <article className="card" key={trip.id}>
            <h2>{trip.title}</h2>
            <p>{trip.duration}</p>
            <p>{trip.description}</p>
          </article>
        ))}
      </section>

      <h2>Register interest</h2>
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
      <p>
        <a href="/admin">Admin login</a>
      </p>
    </>
  );
}
