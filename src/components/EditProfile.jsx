import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BaseURL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const inputClass =
  "w-full rounded-lg bg-base-300/60 border border-white/10 px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition";

const labelClass = "text-sm font-medium text-white/70 mb-1.5 block";

const Field = ({ label, hint, children }) => (
  <div className="mb-4">
    <label className={labelClass}>{label}</label>
    {children}
    {hint && <p className="text-xs text-white/35 mt-1.5">{hint}</p>}
  </div>
);

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");

  const [skills, setSkills] = useState(user.skills?.join(", ") || "");
  const [domains, setDomains] = useState(user.domains?.join(", ") || "");
  const [experienceMonths, setExperienceMonths] = useState(user.experienceMonths ?? 0);
  const [currentStatus, setCurrentStatus] = useState(user.currentStatus || "Student");
  const [role, setRole] = useState(user.role || "");
  const [organization, setOrganization] = useState(user.organization || "");

  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const saveProfile = async () => {
    setError("");
    try {
      const skillsArray = skills.split(",").map((s) => s.trim()).filter(Boolean);
      const domainsArray = domains.split(",").map((d) => d.trim()).filter(Boolean);

      if (domainsArray.length === 0) {
        setError("Please add at least one domain.");
        return;
      }

      const res = await axios.patch(
        BaseURL + "/profile/edit",
        {
          firstName, lastName, photoUrl, age, gender, about,
          skills: skillsArray,
          domains: domainsArray,
          experienceMonths: Number(experienceMonths),
          currentStatus, role, organization,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      console.error("Profile update error:", err);
      setError(err?.response?.data || err?.response?.data?.message || "Unable to update profile");
    }
  };

  return (
    <>
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 items-start">

        {/* ================= EDIT FORM ================= */}
        <div className="rounded-2xl bg-base-200 border border-white/10 shadow-lg p-6 sm:p-8">

          <h2 className="text-xl font-semibold mb-6">Edit Profile</h2>

          {/* ---- Basic Information ---- */}
          <div className="mb-8">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-indigo-400 mb-4">
              Basic Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
              <Field label="First Name">
                <input className={inputClass} type="text" value={firstName}
                  onChange={(e) => setFirstName(e.target.value)} />
              </Field>

              <Field label="Last Name">
                <input className={inputClass} type="text" value={lastName}
                  onChange={(e) => setLastName(e.target.value)} />
              </Field>
            </div>

            <Field label="Photo URL">
              <input className={inputClass} type="text" value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)} />
            </Field>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
              <Field label="Age">
                <input className={inputClass} type="number" value={age}
                  onChange={(e) => setAge(e.target.value)} />
              </Field>

              <Field label="Gender">
                <select className={inputClass} value={gender}
                  onChange={(e) => setGender(e.target.value)}>
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </Field>
            </div>

            <Field label="About">
              <textarea className={`${inputClass} min-h-[90px] resize-none`} value={about}
                onChange={(e) => setAbout(e.target.value)} />
            </Field>
          </div>

          <div className="h-px bg-white/10 mb-8" />

          {/* ---- TalentLink Information ---- */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-pink-400 mb-4">
              TalentLink Information
            </h3>

            <Field label="Domains *" hint="Separate multiple domains with commas">
              <input className={inputClass} type="text" value={domains}
                placeholder="Web Development, Cloud Computing"
                onChange={(e) => setDomains(e.target.value)} />
            </Field>

            <Field label="Skills" hint="Optional — separate skills with commas">
              <input className={inputClass} type="text" value={skills}
                placeholder="React, Node.js, MongoDB"
                onChange={(e) => setSkills(e.target.value)} />
            </Field>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
              <Field label="Experience (months)">
                <input className={inputClass} type="number" min="0" value={experienceMonths}
                  onChange={(e) => setExperienceMonths(e.target.value)} />
              </Field>

              <Field label="Current Status">
                <select className={inputClass} value={currentStatus}
                  onChange={(e) => setCurrentStatus(e.target.value)}>
                  <option value="Student">Student</option>
                  <option value="Working Professional">Working Professional</option>
                  <option value="Teacher/Faculty">Teacher/Faculty</option>
                  <option value="Freelancer">Freelancer</option>
                  <option value="Job Seeker">Job Seeker</option>
                  <option value="Other">Other</option>
                </select>
              </Field>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
              <Field label="Role">
                <input className={inputClass} type="text" value={role}
                  placeholder="MCA Student / Software Engineer"
                  onChange={(e) => setRole(e.target.value)} />
              </Field>

              <Field label="Organization">
                <input className={inputClass} type="text" value={organization}
                  placeholder="College / Company"
                  onChange={(e) => setOrganization(e.target.value)} />
              </Field>
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-400 mt-2">{error}</p>
          )}

          <button
            className="w-full mt-6 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition py-3 text-sm font-semibold"
            onClick={saveProfile}
          >
            Save Profile
          </button>
        </div>

        {/* ================= LIVE PREVIEW ================= */}
        <div className="lg:sticky lg:top-10">
          <p className="text-xs font-semibold uppercase tracking-wide text-white/40 mb-3 text-center">
            Live Preview
          </p>
          <UserCard
            user={{
              firstName, lastName, photoUrl, about,
              skills: skills.split(",").map((s) => s.trim()).filter(Boolean),
              domains: domains.split(",").map((d) => d.trim()).filter(Boolean),
              experienceMonths: Number(experienceMonths),
              currentStatus, role, organization,
            }}
          />
        </div>

      </div>

      {/* ================= SUCCESS TOAST ================= */}
      {showToast && (
        <div className="toast toast-top toast-center z-50">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;