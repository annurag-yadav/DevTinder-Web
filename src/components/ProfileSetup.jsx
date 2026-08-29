import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BaseURL } from "../utils/constants";
import { addUser } from "../utils/userSlice";

const ProfileSetup = () => {
  const [domains, setDomains] = useState([]);
  const [skills, setSkills] = useState([]);
  const [customDomain, setCustomDomain] = useState("");
  const [customSkill, setCustomSkill] = useState("");
  const [experienceYears, setExperienceYears] = useState(0);
  const [experienceMonths, setExperienceMonths] = useState(0);
  const [currentStatus, setCurrentStatus] = useState("Student");
  const [role, setRole] = useState("");
  const [organization, setOrganization] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const domainOptions = [
    "Web Development",
    "Mobile Development",
    "Cloud Computing",
    "Cyber Security",
    "AI / ML",
    "Data Science",
    "DevOps",
    "Blockchain",
    "UI / UX",
    "Game Development",
  ];

  const skillOptions = [
    "JavaScript",
    "React",
    "Node.js",
    "Express.js",
    "MongoDB",
    "Java",
    "Python",
    "C++",
    "AWS",
    "Docker",
    "SQL",
    "Git",
  ];

  const handleDomainChange = (domain) => {
    if (domains.includes(domain)) {
      setDomains(domains.filter((item) => item !== domain));
    } else {
      setDomains([...domains, domain]);
    }
  };

  const handleSkillChange = (skill) => {
    if (skills.includes(skill)) {
      setSkills(skills.filter((item) => item !== skill));
    } else {
      setSkills([...skills, skill]);
    }
  };

  const addCustomDomain = () => {
    const value = customDomain.trim();
    if (!value) return;
    if (!domains.includes(value)) {
      setDomains([...domains, value]);
    }
    setCustomDomain("");
  };

  const addCustomSkill = () => {
    const value = customSkill.trim();
    if (!value) return;
    if (!skills.includes(value)) {
      setSkills([...skills, value]);
    }
    setCustomSkill("");
  };

  // Custom entries the user typed in — anything selected that isn't a preset option
  const customDomains = domains.filter((d) => !domainOptions.includes(d));
  const customSkills = skills.filter((s) => !skillOptions.includes(s));

  const handleSubmit = async () => {
    try {
      setError("");

      if (domains.length === 0) {
        setError("Please select at least one domain.");
        return;
      }

      const totalExperienceMonths =
        Number(experienceYears) * 12 + Number(experienceMonths);

      setLoading(true);

      const res = await axios.patch(
        BaseURL + "/profile/complete",
        {
          domains,
          skills,
          experienceMonths: totalExperienceMonths,
          currentStatus,
          role,
          organization,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res.data.data));
      navigate("/");
    } catch (err) {
      console.error("Profile completion error:", err);
      setError(
        err.response?.data?.error ||
          err.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-lg bg-base-300/60 border border-white/10 px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition";

  return (
    <div className="max-w-xl mx-auto px-6 py-12">
      <div className="rounded-2xl bg-base-200 border border-white/10 shadow-lg p-6 sm:p-8">

        <h2 className="text-xl font-semibold text-center">
          Complete Your Profile
        </h2>
        <p className="text-sm text-white/50 text-center mt-1.5 mb-8">
          Tell us about yourself so we can find the best matches for you.
        </p>

        {/* ================= DOMAINS ================= */}
        <div className="mb-8">
          <div className="flex items-baseline justify-between mb-1">
            <h3 className="text-sm font-semibold text-white">
              What are you interested in? <span className="text-indigo-400">*</span>
            </h3>
          </div>
          <p className="text-xs text-white/40 mb-3">
            This drives your match suggestions — pick as many as apply.
          </p>

          <div className="flex flex-wrap gap-2 mb-3">
            {domainOptions.map((domain) => {
              const active = domains.includes(domain);
              return (
                <button
                  key={domain}
                  type="button"
                  onClick={() => handleDomainChange(domain)}
                  className={`text-xs font-medium px-3 py-1.5 rounded-full border transition ${
                    active
                      ? "bg-indigo-500/20 text-indigo-200 border-indigo-500/40"
                      : "bg-transparent text-white/50 border-white/15 hover:border-white/30 hover:text-white/70"
                  }`}
                >
                  {domain}
                </button>
              );
            })}
          </div>

          {/* Custom domain chips (only shows entries not in the preset list) */}
          {customDomains.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {customDomains.map((domain) => (
                <span
                  key={domain}
                  className="flex items-center gap-1.5 text-xs font-medium pl-3 pr-2 py-1.5 rounded-full bg-indigo-500/20 text-indigo-200 border border-indigo-500/40"
                >
                  {domain}
                  <button
                    type="button"
                    onClick={() => handleDomainChange(domain)}
                    className="text-indigo-300/70 hover:text-white transition"
                    aria-label={`Remove ${domain}`}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* Add your own domain */}
          <div className="flex gap-2">
            <input
              type="text"
              value={customDomain}
              onChange={(e) => setCustomDomain(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addCustomDomain();
                }
              }}
              placeholder="Don't see yours? Type to add it"
              className={inputClass}
            />
            <button
              type="button"
              onClick={addCustomDomain}
              className="rounded-lg border border-white/15 px-4 text-sm font-medium text-white/70 hover:bg-white/5 transition flex-shrink-0"
            >
              Add
            </button>
          </div>
        </div>

        {/* ================= SKILLS ================= */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-white mb-1">
            What skills do you have? <span className="text-white/40 font-normal">(Optional)</span>
          </h3>
          <p className="text-xs text-white/40 mb-3">
            Pick common ones below, or add your own.
          </p>

          <div className="flex flex-wrap gap-2 mb-3">
            {skillOptions.map((skill) => {
              const active = skills.includes(skill);
              return (
                <button
                  key={skill}
                  type="button"
                  onClick={() => handleSkillChange(skill)}
                  className={`text-xs font-medium px-3 py-1.5 rounded-full border transition ${
                    active
                      ? "bg-pink-500/20 text-pink-200 border-pink-500/40"
                      : "bg-transparent text-white/50 border-white/15 hover:border-white/30 hover:text-white/70"
                  }`}
                >
                  {skill}
                </button>
              );
            })}
          </div>

          {customSkills.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {customSkills.map((skill) => (
                <span
                  key={skill}
                  className="flex items-center gap-1.5 text-xs font-medium pl-3 pr-2 py-1.5 rounded-full bg-pink-500/20 text-pink-200 border border-pink-500/40"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleSkillChange(skill)}
                    className="text-pink-300/70 hover:text-white transition"
                    aria-label={`Remove ${skill}`}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}

          <div className="flex gap-2">
            <input
              type="text"
              value={customSkill}
              onChange={(e) => setCustomSkill(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addCustomSkill();
                }
              }}
              placeholder="Add a skill not listed above"
              className={inputClass}
            />
            <button
              type="button"
              onClick={addCustomSkill}
              className="rounded-lg border border-white/15 px-4 text-sm font-medium text-white/70 hover:bg-white/5 transition flex-shrink-0"
            >
              Add
            </button>
          </div>
        </div>

        <div className="h-px bg-white/10 mb-8" />

        {/* ================= EXPERIENCE ================= */}
        <div className="mb-5">
          <h3 className="text-sm font-semibold text-white mb-2">Experience</h3>
          <div className="grid grid-cols-2 gap-3">
            <select
              className={inputClass}
              value={experienceYears}
              onChange={(e) => setExperienceYears(Number(e.target.value))}
            >
              {Array.from({ length: 11 }, (_, i) => (
                <option key={i} value={i}>
                  {i} {i === 1 ? "Year" : "Years"}
                </option>
              ))}
            </select>

            <select
              className={inputClass}
              value={experienceMonths}
              onChange={(e) => setExperienceMonths(Number(e.target.value))}
            >
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i} value={i}>
                  {i} {i === 1 ? "Month" : "Months"}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* ================= CURRENT STATUS ================= */}
        <div className="mb-5">
          <label className="text-sm font-medium text-white/70 mb-1.5 block">
            What are you currently?
          </label>
          <select
            className={inputClass}
            value={currentStatus}
            onChange={(e) => setCurrentStatus(e.target.value)}
          >
            <option>Student</option>
            <option>Working Professional</option>
            <option>Teacher/Faculty</option>
            <option>Freelancer</option>
            <option>Job Seeker</option>
            <option>Other</option>
          </select>
        </div>

        {/* ================= ROLE ================= */}
        <div className="mb-5">
          <label className="text-sm font-medium text-white/70 mb-1.5 block">
            Role
          </label>
          <input
            type="text"
            placeholder="Example: MCA Student"
            className={inputClass}
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </div>

        {/* ================= ORGANIZATION ================= */}
        <div className="mb-2">
          <label className="text-sm font-medium text-white/70 mb-1.5 block">
            College / Company
          </label>
          <input
            type="text"
            placeholder="Example: Chandigarh University"
            className={inputClass}
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
          />
        </div>

        {error && (
          <p className="text-sm text-red-400 text-center mt-4">{error}</p>
        )}

        <button
          className="w-full mt-6 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition py-3 text-sm font-semibold"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Saving..." : "Complete Profile"}
        </button>

      </div>
    </div>
  );
};

export default ProfileSetup;