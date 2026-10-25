import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  description:
    "Register interest in a school trip: Singapore STEM, Jaipur Heritage, or London Universities.",
  title: "School Trip Interest",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <div className="wrap">
            <div className="brand">
              <span className="brand-mark" aria-hidden="true">
                ✈️
              </span>
              <span>
                <span className="brand-name">School Trip Interest</span>
                <br />
                <span className="brand-tag">
                  Three sample trips, one simple sign-up for teachers
                </span>
              </span>
            </div>
          </div>
        </header>
        <main>
          <div className="wrap">{children}</div>
        </main>
        <footer className="site-footer">
          <div className="wrap">
            <p>
              School Trip Interest — sample trips for teachers.{" "}
              <a href="/admin">Admin login</a>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
