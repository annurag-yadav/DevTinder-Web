import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-base-200 border-t border-white/10 text-neutral-content">
      <div className="max-w-7xl mx-auto px-8 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-28 gap-y-10">

        {/* ================= BRAND ================= */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-2 mb-3">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fillRule="evenodd"
              clipRule="evenodd"
              className="fill-current text-indigo-500"
            >
              <path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z" />
            </svg>
            <span className="text-lg font-semibold text-white">TalentLink</span>
          </div>
          <p className="text-sm text-white/50 leading-relaxed max-w-xs">
            Connecting developers, students, and professionals through skills,
            domains, and shared interests.
          </p>
        </div>

        {/* ================= PRODUCT ================= */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-white/40 mb-4">
            Product
          </h3>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/" className="text-white/60 hover:text-white transition">Feed</Link></li>
            <li><Link to="/connections" className="text-white/60 hover:text-white transition">Connections</Link></li>
            <li><Link to="/requests" className="text-white/60 hover:text-white transition">Requests</Link></li>
            <li><Link to="/profile" className="text-white/60 hover:text-white transition">Edit Profile</Link></li>
          </ul>
        </div>

        {/* ================= LEGAL ================= */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-white/40 mb-4">
            Legal
          </h3>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/terms" className="text-white/60 hover:text-white transition">Terms of Service</Link></li>
            <li><Link to="/privacy" className="text-white/60 hover:text-white transition">Privacy Policy</Link></li>
            <li><a href="mailto:youremail@example.com" className="text-white/60 hover:text-white transition">Contact</a></li>
          </ul>
        </div>

        {/* ================= CONNECT ================= */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-white/40 mb-4">
            Connect
          </h3>
          <div className="flex gap-3">
            {/* GitHub */}
            <a
              href="https://github.com/annurag-yadav"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" className="fill-current">
                <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-1.16-.02-2.11-3.2.7-3.87-1.36-3.87-1.36-.53-1.34-1.29-1.7-1.29-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.72 1.27 3.39.97.1-.75.41-1.27.74-1.56-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11.06 11.06 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.77.11 3.06.74.8 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.25 5.68.42.36.79 1.08.79 2.17 0 1.57-.01 2.83-.01 3.22 0 .31.21.66.79.55A10.51 10.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z"/>
              </svg>
            </a>
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/-anuragyadav"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" className="fill-current">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

     
    </footer>
  );
};

export default Footer;