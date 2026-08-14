import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BaseURL } from "../utils/constants";
import { addUser } from "../utils/userSlice";

const ProfileSetup = () => {

  const [domains, setDomains] = useState([]);
  const [skills, setSkills] = useState([]);
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
    "Game Development"
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
    "Git"
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

  const handleSubmit = async () => {

    try {

      setError("");

      // Domain is required
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
          organization
        },
        {
          withCredentials: true
        }
      );

      console.log(res.data);

      // Update Redux user
      dispatch(addUser(res.data.data));

      // Profile completed → go to feed
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

  return (
    <div className="flex justify-center my-10">

      <div className="card bg-base-300 w-[500px] shadow-xl">

        <div className="card-body">

          <h2 className="card-title justify-center text-2xl">
            Complete Your Profile
          </h2>

          <p className="text-center mb-4">
            Tell us about yourself so we can find the best matches for you.
          </p>

          {/* DOMAINS */}

          <div className="my-3">

            <h3 className="font-semibold mb-2">
              What are you interested in? *
            </h3>

            <div className="flex flex-wrap gap-2">

              {domainOptions.map((domain) => (

                <button
                  key={domain}
                  type="button"
                  onClick={() => handleDomainChange(domain)}
                  className={`btn btn-sm ${
                    domains.includes(domain)
                      ? "btn-primary"
                      : "btn-outline"
                  }`}
                >
                  {domain}
                </button>

              ))}

            </div>

          </div>


          {/* SKILLS */}

          <div className="my-3">

            <h3 className="font-semibold mb-2">
              What skills do you have? (Optional)
            </h3>

            <div className="flex flex-wrap gap-2">

              {skillOptions.map((skill) => (

                <button
                  key={skill}
                  type="button"
                  onClick={() => handleSkillChange(skill)}
                  className={`btn btn-sm ${
                    skills.includes(skill)
                      ? "btn-secondary"
                      : "btn-outline"
                  }`}
                >
                  {skill}
                </button>

              ))}

            </div>

          </div>


          {/* EXPERIENCE */}

          <div className="my-3">

            <h3 className="font-semibold mb-2">
              Experience
            </h3>

            <div className="flex gap-3">

              <select
                className="select select-bordered"
                value={experienceYears}
                onChange={(e) =>
                  setExperienceYears(Number(e.target.value))
                }
              >
                {Array.from({ length: 11 }, (_, i) => (
                  <option key={i} value={i}>
                    {i} {i === 1 ? "Year" : "Years"}
                  </option>
                ))}
              </select>


              <select
                className="select select-bordered"
                value={experienceMonths}
                onChange={(e) =>
                  setExperienceMonths(Number(e.target.value))
                }
              >
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i} value={i}>
                    {i} {i === 1 ? "Month" : "Months"}
                  </option>
                ))}
              </select>

            </div>

          </div>


          {/* CURRENT STATUS */}

          <div className="my-3">

            <label className="form-control w-full">

              <div className="label">
                <span className="label-text">
                  What are you currently?
                </span>
              </div>

              <select
                className="select select-bordered"
                value={currentStatus}
                onChange={(e) =>
                  setCurrentStatus(e.target.value)
                }
              >

                <option>Student</option>
                <option>Working Professional</option>
                <option>Teacher/Faculty</option>
                <option>Freelancer</option>
                <option>Job Seeker</option>
                <option>Other</option>

              </select>

            </label>

          </div>


          {/* ROLE */}

          <div className="my-3">

            <label className="form-control w-full">

              <div className="label">
                <span className="label-text">
                  Role
                </span>
              </div>

              <input
                type="text"
                placeholder="Example: MCA Student"
                className="input input-bordered"
                value={role}
                onChange={(e) =>
                  setRole(e.target.value)
                }
              />

            </label>

          </div>


          {/* ORGANIZATION */}

          <div className="my-3">

            <label className="form-control w-full">

              <div className="label">
                <span className="label-text">
                  College / Company
                </span>
              </div>

              <input
                type="text"
                placeholder="Example: Chandigarh University"
                className="input input-bordered"
                value={organization}
                onChange={(e) =>
                  setOrganization(e.target.value)
                }
              />

            </label>

          </div>


          {/* ERROR */}

          {error && (
            <p className="text-red-500 text-center mt-2">
              {error}
            </p>
          )}


          {/* SUBMIT */}

          <div className="card-actions justify-center mt-5">

            <button
              className="btn btn-primary"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading
                ? "Saving..."
                : "Complete Profile"}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ProfileSetup;