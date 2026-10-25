"use client";

import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { TRIPS, tripTitle } from "@/lib/trips";

type Row = {
  created_at: string;
  email: string;
  id: number;
  name: string;
  phone: string;
  school: string;
  students: number;
  trip: string;
};

export default function AdminPage() {
  const supabase = getSupabaseBrowserClient();
  const [user, setUser] = useState<User | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [rows, setRows] = useState<Row[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    if (!supabase) {
      setAuthChecked(true);
      return;
    }
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setAuthChecked(true);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!supabase || !user) return;
    supabase
      .from("trip_interests")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (error) setLoadError(error.message);
        else setRows((data ?? []) as Row[]);
      });
  }, [supabase, user]);

  async function handleLogin(event: React.FormEvent) {
    event.preventDefault();
    setLoginError(null);
    if (!supabase) {
      setLoginError("Database is not configured yet.");
      return;
    }
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) setLoginError(error.message);
  }

  async function handleLogout() {
    if (supabase) await supabase.auth.signOut();
    setRows([]);
  }

  if (!supabase) {
    return (
      <>
        <h1>Admin</h1>
        <p className="error">
          Database is not configured yet. Set NEXT_PUBLIC_SUPABASE_URL and
          NEXT_PUBLIC_SUPABASE_ANON_KEY.
        </p>
      </>
    );
  }

  if (!authChecked) return <p>Loading…</p>;

  if (!user) {
    return (
      <>
        <h1>Admin login</h1>
        <p>Sign in with your Supabase email account to view submissions.</p>
        {loginError && (
          <p className="error" role="alert">
            {loginError}
          </p>
        )}
        <form onSubmit={handleLogin}>
          <label htmlFor="admin-email">Email</label>
          <input
            id="admin-email"
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
            value={email}
          />
          <label htmlFor="admin-password">Password</label>
          <input
            id="admin-password"
            onChange={(e) => setPassword(e.target.value)}
            required
            type="password"
            value={password}
          />
          <p>
            <button type="submit">Sign in</button>
          </p>
        </form>
        <p>
          <a href="/">Back to the public page</a>
        </p>
      </>
    );
  }

  const totals = TRIPS.map((trip) => ({
    students: rows
      .filter((r) => r.trip === trip.id)
      .reduce((sum, r) => sum + r.students, 0),
    title: trip.title,
  }));
  const visible = filter === "all" ? rows : rows.filter((r) => r.trip === filter);

  return (
    <>
      <h1>Admin — submissions</h1>
      <p className="admin-bar">
        Signed in as {user.email}. <button onClick={handleLogout}>Sign out</button>
      </p>
      {loadError && (
        <p className="error" role="alert">
          {loadError}
        </p>
      )}

      <h2>Total students per trip</h2>
      <ul className="totals">
        {totals.map((t) => (
          <li key={t.title}>
            {t.title}: {t.students}
          </li>
        ))}
        <li>
          All trips: {rows.reduce((sum, r) => sum + r.students, 0)}
        </li>
      </ul>

      <label htmlFor="filter-trip">Filter by trip</label>
      <select
        id="filter-trip"
        onChange={(e) => setFilter(e.target.value)}
        value={filter}
      >
        <option value="all">All trips</option>
        {TRIPS.map((trip) => (
          <option key={trip.id} value={trip.id}>
            {trip.title}
          </option>
        ))}
      </select>

      <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>School</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Trip</th>
            <th>Students</th>
            <th>Submitted</th>
          </tr>
        </thead>
        <tbody>
          {visible.map((row) => (
            <tr key={row.id}>
              <td>{row.name}</td>
              <td>{row.school}</td>
              <td>{row.email}</td>
              <td>{row.phone}</td>
              <td>{tripTitle(row.trip)}</td>
              <td>{row.students}</td>
              <td>{new Date(row.created_at).toLocaleString()}</td>
            </tr>
          ))}
          {visible.length === 0 && (
            <tr>
              <td colSpan={7}>No submissions yet for this filter.</td>
            </tr>
          )}
        </tbody>
      </table>
      </div>
      <p>
        <a href="/">Back to the public page</a>
      </p>
    </>
  );
}
