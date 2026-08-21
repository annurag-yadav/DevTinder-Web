import axios from "axios";
import { BaseURL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const {
    _id, firstName, lastName, photoUrl, about, skills, domains,
    experienceMonths, currentStatus, role, organization,
    matchScore, matchPercentage,
  } = user;

  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        `${BaseURL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.error("Connection request error:", err);
    }
  };

  const match = matchScore ?? matchPercentage;

  return (
    <div className="w-full max-w-sm mx-auto rounded-2xl bg-base-200 border border-white/10 shadow-lg overflow-hidden">

      {/* ================= PHOTO ================= */}
      <div className="relative h-72 bg-base-300">
        <img
          src={photoUrl}
          alt={`${firstName} profile`}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src =
              "https://api.dicebear.com/7.x/initials/svg?seed=" +
              encodeURIComponent(`${firstName} ${lastName}`);
          }}
        />
        {/* subtle gradient so text over the photo (if any) stays legible */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/50 to-transparent" />

        {match !== undefined && (
          <span className="absolute top-3 right-3 rounded-full bg-emerald-500/90 text-white text-xs font-semibold px-3 py-1 shadow">
            {match}% Match
          </span>
        )}
      </div>

      <div className="p-5 space-y-4">

        {/* ================= NAME / ROLE ================= */}
        <div>
          <h2 className="text-lg font-semibold leading-tight">
            {firstName} {lastName}
          </h2>
          <p className="text-sm text-white/50">
            {role || currentStatus || "TalentLink User"}
          </p>
        </div>

        {/* ================= ABOUT ================= */}
        {about && (
          <p className="text-sm text-white/70 leading-relaxed line-clamp-3">
            {about}
          </p>
        )}

        {/* ================= DOMAINS ================= */}
        {domains?.length > 0 && (
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-white/40 mb-2">
              Domains
            </h3>
            <div className="flex flex-wrap gap-2">
              {domains.map((domain) => (
                <span
                  key={domain}
                  className="text-xs font-medium px-2.5 py-1 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/20"
                >
                  {domain}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* ================= SKILLS ================= */}
        {skills?.length > 0 && (
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-white/40 mb-2">
              Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="text-xs font-medium px-2.5 py-1 rounded-full bg-pink-500/15 text-pink-300 border border-pink-500/20"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* ================= EXPERIENCE / ORG ================= */}
        <div className="grid grid-cols-2 gap-3 pt-1 text-sm">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-white/40 mb-1">
              Experience
            </h3>
            <p>{experienceMonths > 0 ? `${experienceMonths} months` : "Fresher"}</p>
          </div>
          {organization && (
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-white/40 mb-1">
                Organization
              </h3>
              <p>{organization}</p>
            </div>
          )}
        </div>

        {/* ================= BUTTONS ================= */}
        <div className="flex gap-3 pt-3">
          <button
            className="flex-1 rounded-lg border border-white/15 py-2.5 text-sm font-medium text-white/70 hover:bg-white/5 transition"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="flex-1 rounded-lg bg-emerald-600 py-2.5 text-sm font-semibold text-white hover:bg-emerald-500 transition"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Interested
          </button>
        </div>

      </div>
    </div>
  );
};

export default UserCard;