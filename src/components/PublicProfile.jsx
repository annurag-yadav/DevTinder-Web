import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BaseURL } from "../utils/constants";

const PublicProfile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [requestStatus, setRequestStatus] = useState(null); // "interested" | "ignored" | null

  const getPublicProfile = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.get(`${BaseURL}/profile/${userId}`, {
        withCredentials: true,
      });

      setUser(res?.data?.data);
    } catch (err) {
      console.error("Public profile error:", err);
      setError(err?.response?.data?.message || "Unable to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPublicProfile();
  }, [userId]);

  const handleSendRequest = async (status) => {
    try {
      await axios.post(
        `${BaseURL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      setRequestStatus(status);
    } catch (err) {
      console.error("Connection request error:", err);
    }
  };

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-indigo-500" />
      </div>
    );
  }

  // ================= ERROR =================
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 px-4 text-center">
        <p className="text-red-400 text-lg">{error}</p>
        <button
          className="rounded-lg border border-white/15 px-5 py-2.5 text-sm font-medium text-white/70 hover:bg-white/5 transition"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    );
  }

  // ================= NOT FOUND =================
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <p className="text-lg text-white/70">User not found</p>
        <button
          className="rounded-lg border border-white/15 px-5 py-2.5 text-sm font-medium text-white/70 hover:bg-white/5 transition"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <div className="rounded-2xl bg-base-200 border border-white/10 shadow-lg overflow-hidden">

        {/* ================= HEADER / PHOTO ================= */}
        <div className="relative h-40 bg-gradient-to-br from-indigo-600/30 to-pink-600/20">
          {user.matchPercentage !== undefined && (
            <span className="absolute top-4 right-4 rounded-full bg-emerald-500/90 text-white text-xs font-semibold px-3 py-1 shadow">
              {user.matchPercentage}% Match
            </span>
          )}

          <img
            src={user.photoUrl}
            alt={`${user.firstName} profile`}
            className="w-28 h-28 rounded-full object-cover border-4 border-base-200 absolute -bottom-14 left-1/2 -translate-x-1/2"
            onError={(e) => {
              e.currentTarget.src =
                "https://api.dicebear.com/7.x/initials/svg?seed=" +
                encodeURIComponent(`${user.firstName} ${user.lastName}`);
            }}
          />
        </div>

        <div className="pt-18 pb-8 px-6 sm:px-8 text-center mt-14">

          {/* ================= NAME / ROLE ================= */}
          <h1 className="text-xl font-semibold">
            {user.firstName} {user.lastName}
          </h1>
          <p className="text-sm text-white/50 mt-1">
            {user.role || user.currentStatus || "TalentLink User"}
          </p>

          {/* ================= ABOUT ================= */}
          <p className="text-sm text-white/70 leading-relaxed mt-4 max-w-md mx-auto">
            {user.about || "No information available"}
          </p>

          {/* ================= COMMON DOMAINS/SKILLS ================= */}
          {(user.commonDomains?.length > 0 || user.commonSkills?.length > 0) && (
            <div className="mt-6 rounded-xl bg-indigo-500/10 border border-indigo-500/20 p-4 text-left">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-indigo-300 mb-3">
                In Common
              </h3>
              <div className="flex flex-wrap gap-2">
                {user.commonDomains?.map((domain) => (
                  <span
                    key={domain}
                    className="text-xs font-medium px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-200 border border-indigo-500/30"
                  >
                    {domain}
                  </span>
                ))}
                {user.commonSkills?.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs font-medium px-2.5 py-1 rounded-full bg-pink-500/20 text-pink-200 border border-pink-500/30"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* ================= DOMAINS ================= */}
          <div className="mt-6 text-left">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-white/40 mb-2">
              Domains
            </h3>
            <div className="flex flex-wrap gap-2">
              {user.domains?.length > 0 ? (
                user.domains.map((domain) => (
                  <span
                    key={domain}
                    className="text-xs font-medium px-2.5 py-1 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/20"
                  >
                    {domain}
                  </span>
                ))
              ) : (
                <p className="text-sm text-white/40">No domains added</p>
              )}
            </div>
          </div>

          {/* ================= SKILLS ================= */}
          <div className="mt-5 text-left">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-white/40 mb-2">
              Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {user.skills?.length > 0 ? (
                user.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs font-medium px-2.5 py-1 rounded-full bg-pink-500/15 text-pink-300 border border-pink-500/20"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <p className="text-sm text-white/40">No skills added</p>
              )}
            </div>
          </div>

          {/* ================= EXPERIENCE / ORG ================= */}
          <div className="mt-6 grid grid-cols-2 gap-4 text-left border-t border-white/10 pt-5">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-white/40 mb-1">
                Experience
              </h3>
              <p className="text-sm">
                {user.experienceMonths > 0 ? `${user.experienceMonths} months` : "Fresher"}
              </p>
            </div>
            {user.organization && (
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wide text-white/40 mb-1">
                  Organization
                </h3>
                <p className="text-sm">{user.organization}</p>
              </div>
            )}
          </div>

          {/* ================= ACTIONS ================= */}
          {requestStatus ? (
            <p className="mt-8 text-sm text-emerald-400 font-medium">
              {requestStatus === "interested"
                ? "Request sent — you've marked interest in this profile."
                : "You've ignored this profile."}
            </p>
          ) : (
            <div className="flex gap-3 mt-8">
              <button
                className="flex-1 rounded-lg border border-white/15 py-2.5 text-sm font-medium text-white/70 hover:bg-white/5 transition"
                onClick={() => handleSendRequest("ignored")}
              >
                Ignore
              </button>
              <button
                className="flex-1 rounded-lg bg-indigo-600 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 transition"
                onClick={() => handleSendRequest("interested")}
              >
                Interested
              </button>
            </div>
          )}

          <button
            className="mt-4 text-sm text-white/40 hover:text-white/70 transition"
            onClick={() => navigate(-1)}
          >
            ← Go back
          </button>

        </div>
      </div>
    </div>
  );
};

export default PublicProfile;