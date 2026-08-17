import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BaseURL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {

  // ================= BASIC PROFILE =================

  const [firstName, setFirstName] = useState(
    user.firstName || ""
  );

  const [lastName, setLastName] = useState(
    user.lastName || ""
  );

  const [photoUrl, setPhotoUrl] = useState(
    user.photoUrl || ""
  );

  const [age, setAge] = useState(
    user.age || ""
  );

  const [gender, setGender] = useState(
    user.gender || ""
  );

  const [about, setAbout] = useState(
    user.about || ""
  );


  // ================= TALENTLINK PROFILE =================

  const [skills, setSkills] = useState(
    user.skills?.join(", ") || ""
  );

  const [domains, setDomains] = useState(
    user.domains?.join(", ") || ""
  );

  const [experienceMonths, setExperienceMonths] =
    useState(
      user.experienceMonths ?? 0
    );

  const [currentStatus, setCurrentStatus] =
    useState(
      user.currentStatus || "Student"
    );

  const [role, setRole] = useState(
    user.role || ""
  );

  const [organization, setOrganization] =
    useState(
      user.organization || ""
    );


  // ================= UI STATES =================

  const [error, setError] = useState("");

  const [showToast, setShowToast] =
    useState(false);

  const dispatch = useDispatch();


  // ================= SAVE PROFILE =================

  const saveProfile = async () => {

    setError("");

    try {

      // Convert comma-separated skills into array
      const skillsArray = skills
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill !== "");


      // Convert comma-separated domains into array
      const domainsArray = domains
        .split(",")
        .map((domain) => domain.trim())
        .filter((domain) => domain !== "");


      // Domain is required
      if (domainsArray.length === 0) {

        setError(
          "Please add at least one domain."
        );

        return;
      }


      const res = await axios.patch(

        BaseURL + "/profile/edit",

        {

          // Basic profile
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,

          // TalentLink profile
          skills: skillsArray,
          domains: domainsArray,
          experienceMonths:
            Number(experienceMonths),

          currentStatus,

          role,

          organization,

        },

        {
          withCredentials: true,
        }
      );


      // Update Redux user
      dispatch(
        addUser(
          res?.data?.data
        )
      );


      // Show success message
      setShowToast(true);


      setTimeout(() => {

        setShowToast(false);

      }, 3000);


    } catch (err) {

      console.error(
        "Profile update error:",
        err
      );

      setError(
        err?.response?.data ||
        err?.response?.data?.message ||
        "Unable to update profile"
      );

    }

  };


  return (

    <>

      <div className="flex justify-center my-10">

        {/* ================= EDIT FORM ================= */}

        <div className="flex justify-center mx-10">

          <div className="card bg-base-300 w-96 shadow-xl">

            <div className="card-body">


              <h2 className="card-title justify-center">
                Edit Profile
              </h2>


              {/* ================= BASIC INFORMATION ================= */}

              <h3 className="font-semibold mt-3">
                Basic Information
              </h3>


              {/* First Name */}

              <label className="form-control w-full max-w-xs my-2">

                <div className="label">

                  <span className="label-text">
                    First Name
                  </span>

                </div>

                <input
                  type="text"
                  value={firstName}
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) =>
                    setFirstName(e.target.value)
                  }
                />

              </label>


              {/* Last Name */}

              <label className="form-control w-full max-w-xs my-2">

                <div className="label">

                  <span className="label-text">
                    Last Name
                  </span>

                </div>

                <input
                  type="text"
                  value={lastName}
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) =>
                    setLastName(e.target.value)
                  }
                />

              </label>


              {/* Photo */}

              <label className="form-control w-full max-w-xs my-2">

                <div className="label">

                  <span className="label-text">
                    Photo URL
                  </span>

                </div>

                <input
                  type="text"
                  value={photoUrl}
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) =>
                    setPhotoUrl(e.target.value)
                  }
                />

              </label>


              {/* Age */}

              <label className="form-control w-full max-w-xs my-2">

                <div className="label">

                  <span className="label-text">
                    Age
                  </span>

                </div>

                <input
                  type="number"
                  value={age}
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) =>
                    setAge(e.target.value)
                  }
                />

              </label>


              {/* Gender */}

              <label className="form-control w-full max-w-xs my-2">

                <div className="label">

                  <span className="label-text">
                    Gender
                  </span>

                </div>

                <select
                  value={gender}
                  className="select select-bordered w-full max-w-xs"
                  onChange={(e) =>
                    setGender(e.target.value)
                  }
                >

                  <option value="">
                    Select gender
                  </option>

                  <option value="Male">
                    Male
                  </option>

                  <option value="Female">
                    Female
                  </option>

                  <option value="Other">
                    Other
                  </option>

                </select>

              </label>


              {/* About */}

              <label className="form-control w-full max-w-xs my-2">

                <div className="label">

                  <span className="label-text">
                    About
                  </span>

                </div>

                <textarea
                  value={about}
                  className="textarea textarea-bordered w-full max-w-xs"
                  onChange={(e) =>
                    setAbout(e.target.value)
                  }
                />

              </label>


              {/* ================= TALENTLINK INFORMATION ================= */}

              <h3 className="font-semibold mt-5">
                TalentLink Information
              </h3>


              {/* Domains */}

              <label className="form-control w-full max-w-xs my-2">

                <div className="label">

                  <span className="label-text">
                    Domains *
                  </span>

                </div>

                <input
                  type="text"
                  value={domains}
                  className="input input-bordered w-full max-w-xs"
                  placeholder="Web Development, Cloud Computing"
                  onChange={(e) =>
                    setDomains(e.target.value)
                  }
                />

                <div className="label">

                  <span className="label-text-alt">
                    Separate multiple domains with commas
                  </span>

                </div>

              </label>


              {/* Skills */}

              <label className="form-control w-full max-w-xs my-2">

                <div className="label">

                  <span className="label-text">
                    Skills
                  </span>

                </div>

                <input
                  type="text"
                  value={skills}
                  className="input input-bordered w-full max-w-xs"
                  placeholder="React, Node.js, MongoDB"
                  onChange={(e) =>
                    setSkills(e.target.value)
                  }
                />

                <div className="label">

                  <span className="label-text-alt">
                    Optional — separate skills with commas
                  </span>

                </div>

              </label>


              {/* Experience */}

              <label className="form-control w-full max-w-xs my-2">

                <div className="label">

                  <span className="label-text">
                    Experience (months)
                  </span>

                </div>

                <input
                  type="number"
                  min="0"
                  value={experienceMonths}
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) =>
                    setExperienceMonths(
                      e.target.value
                    )
                  }
                />

              </label>


              {/* Current Status */}

              <label className="form-control w-full max-w-xs my-2">

                <div className="label">

                  <span className="label-text">
                    Current Status
                  </span>

                </div>

                <select
                  value={currentStatus}
                  className="select select-bordered w-full max-w-xs"
                  onChange={(e) =>
                    setCurrentStatus(
                      e.target.value
                    )
                  }
                >

                  <option value="Student">
                    Student
                  </option>

                  <option value="Working Professional">
                    Working Professional
                  </option>

                  <option value="Teacher/Faculty">
                    Teacher/Faculty
                  </option>

                  <option value="Freelancer">
                    Freelancer
                  </option>

                  <option value="Job Seeker">
                    Job Seeker
                  </option>

                  <option value="Other">
                    Other
                  </option>

                </select>

              </label>


              {/* Role */}

              <label className="form-control w-full max-w-xs my-2">

                <div className="label">

                  <span className="label-text">
                    Role
                  </span>

                </div>

                <input
                  type="text"
                  value={role}
                  className="input input-bordered w-full max-w-xs"
                  placeholder="MCA Student / Software Engineer"
                  onChange={(e) =>
                    setRole(e.target.value)
                  }
                />

              </label>


              {/* Organization */}

              <label className="form-control w-full max-w-xs my-2">

                <div className="label">

                  <span className="label-text">
                    Organization
                  </span>

                </div>

                <input
                  type="text"
                  value={organization}
                  className="input input-bordered w-full max-w-xs"
                  placeholder="College / Company"
                  onChange={(e) =>
                    setOrganization(
                      e.target.value
                    )
                  }
                />

              </label>


              {/* Error */}

              <p className="text-red-500">

                {error}

              </p>


              {/* Save */}

              <div className="card-actions justify-center m-2">

                <button
                  className="btn btn-primary"
                  onClick={saveProfile}
                >
                  Save Profile
                </button>

              </div>

            </div>

          </div>

        </div>


        {/* ================= LIVE PREVIEW ================= */}

        <UserCard
          user={{
            firstName,
            lastName,
            photoUrl,
            about,
            skills: skills
              .split(",")
              .map((skill) => skill.trim())
              .filter(Boolean),
            domains: domains
              .split(",")
              .map((domain) => domain.trim())
              .filter(Boolean),
            experienceMonths:
              Number(experienceMonths),
            currentStatus,
            role,
            organization,
          }}
        />

      </div>


      {/* ================= SUCCESS TOAST ================= */}

      {showToast && (

        <div className="toast toast-top toast-center">

          <div className="alert alert-success">

            <span>
              Profile saved successfully.
            </span>

          </div>

        </div>

      )}

    </>

  );
};

export default EditProfile;