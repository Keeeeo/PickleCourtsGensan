import { Facebook, Mail, Linkedin, ShieldCheck, Users, MapPin } from 'lucide-react'

// TODO: replace these with your real outreach links before deploying.
const CONTACTS = {
  facebook: 'https://facebook.com/picklecourtsgensan',
  email: 'picklecourtsgensan@gmail.com',
  linkedin: 'https://linkedin.com/in/keith',
}

export default function AboutPage() {
  return (
    <main className="pb-16 bg-slate-50">
      {/* Hero: dark slate, matches the sidebar / header brand treatment */}
      <section className="relative overflow-hidden bg-slate court-lines px-4 py-16 md:px-8 md:py-24">
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.3em] text-court-light">
            About the project
          </p>
          <h1 className="mt-4 font-sans text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
            PickleCourts GenSan
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
            A community-built, non-commercial website directory for General Santos City's pickleball scene made to help players find a court.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 pt-8 md:px-8 md:pt-12">
        {/* Mission */}
        <section className="rounded-card border border-slate-100 bg-white p-6 shadow-card md:p-10">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-pickle/10 text-pickle-dark">
              <Users className="h-5 w-5" />
            </div>
            <h2 className="font-sans text-xl font-semibold text-slate-900 md:text-2xl">
              What is PickleCourts GenSan?
            </h2>
          </div>
          <p className="mt-4 text-sm leading-7 text-slate-600 md:text-base">
            PickleCourts GenSan is a community-driven, non-commercial directory built to solve a
            simple problem: it's genuinely hard to know where to play. Court hours change, new
            venues pop up, and details get passed around informally through group chats and
            Facebook posts. This site pulls that scattered information into one place, so players
            can easily locate, discover, and filter pickleball courts across General Santos City. They can filter
            by location, price, indoor or outdoor setup, and open-play or booking availability,
            without having to ask around every time.
          </p>

          <div className="mt-6 flex items-start gap-3 rounded-xl bg-court/5 px-4 py-3">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-court" />
            <p className="text-sm leading-6 text-slate-600">
              <span className="font-semibold text-slate-900">Developer note:</span> This platform
              was independently developed by <span className="font-semibold text-slate-900">Keith</span> as
              a free community resource for local players and court owners in General Santos City.
            </p>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="mt-8 rounded-card border border-amber-200 bg-amber-50 p-6 md:p-10">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h2 className="font-sans text-xl font-semibold text-slate-900 md:text-2xl">
              Non-Commercial Project Notice &amp; Fair Use Disclaimer
            </h2>
          </div>

          <ul className="mt-5 space-y-4 text-sm leading-7 text-slate-700 md:text-base">
            <li>
              <span className="font-semibold text-slate-900">Non-Profit / Non-Commercial:</span>{' '}
              PickleCourts GenSan is a strictly non-commercial, non-monetized website. The
              developer does not generate revenue, accept paid listings, or earn money from this
              directory.
            </li>
            <li>
              <span className="font-semibold text-slate-900">Intellectual Property Rights:</span>{' '}
              All court names, logos, pictures, and trademarks displayed on this site are the
              property of their respective owners. Their inclusion in this directory is strictly
              for informational and identification purposes only and does not imply official
              endorsement, partnership, or affiliation.
            </li>
            <li>
              <span className="font-semibold text-slate-900">Content Removal &amp; Takedown Requests:</span>{' '}
              We do not claim ownership of external brand assets or media, nor do we intend any
              commercial harm or copyright infringement. If you are a court owner or copyright
              holder and wish to update, replace, or request the removal of any photo, logo, or
              listing details, please reach out directly via Facebook Messenger or Email.
              Takedown requests will be processed promptly.
            </li>
          </ul>
        </section>

        {/* Contact */}
        <section className="mt-8 rounded-card border border-slate-100 bg-white p-6 text-center shadow-card md:p-10">
          <h2 className="font-sans text-xl font-semibold text-slate-900 md:text-2xl">Contact</h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600">
            Questions, corrections, or a takedown request? Reach out thru any of these ways.
          </p>

          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={CONTACTS.facebook}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-court px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-court/90 sm:w-auto"
            >
              <Facebook className="h-4 w-4" />
              Facebook
            </a>
            <a
              href={`mailto:${CONTACTS.email}`}
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-pickle px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-pickle-dark sm:w-auto"
            >
              <Mail className="h-4 w-4" />
              Email
            </a>
            <a
              href={CONTACTS.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50 sm:w-auto"
            >
              <Linkedin className="h-4 w-4 text-court" />
              LinkedIn
            </a>
          </div>
        </section>
      </div>
    </main>
  )
}
