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


  const getPublicProfile = async () => {

    try {

      setLoading(true);
      setError("");

      const res = await axios.get(
        `${BaseURL}/profile/${userId}`,
        {
          withCredentials: true,
        }
      );

      setUser(res?.data?.data);

    } catch (err) {

      console.error(
        "Public profile error:",
        err
      );

      setError(
        err?.response?.data?.message ||
        "Unable to load profile"
      );

    } finally {

      setLoading(false);

    }
  };


  useEffect(() => {
    getPublicProfile();
  }, [userId]);


  // Loading
  if (loading) {

    return (
      <div className="flex justify-center my-10">

        <h1 className="text-xl">
          Loading profile...
        </h1>

      </div>
    );

  }


  // Error
  if (error) {

    return (
      <div className="flex flex-col items-center my-10 gap-4">

        <h1 className="text-red-500 text-xl">
          {error}
        </h1>

        <button
          className="btn btn-primary"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>

      </div>
    );

  }


  // User not found
  if (!user) {

    return (
      <div className="flex flex-col items-center my-10 gap-4">

        <h1 className="text-xl">
          User not found
        </h1>

        <button
          className="btn btn-primary"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>

      </div>
    );

  }


  return (

    <div className="flex justify-center my-10 px-4">

      <div className="card bg-base-300 w-full max-w-2xl shadow-xl">


        {/* ================= PROFILE IMAGE ================= */}

        <figure className="px-6 pt-6">

          <img
            src={user.photoUrl}
            alt={`${user.firstName} profile`}
            className="w-48 h-48 rounded-full object-cover"
          />

        </figure>


        <div className="card-body">


          {/* ================= NAME ================= */}

          <h1 className="text-3xl font-bold text-center">

            {user.firstName} {user.lastName}

          </h1>


          {/* ================= ROLE / STATUS ================= */}

          <p className="text-center text-lg opacity-80">

            {user.role || user.currentStatus}

          </p>


          {/* ================= MATCH ================= */}

          {user.matchPercentage !== undefined && (

            <div className="flex justify-center mt-5">

              <div className="badge badge-success text-lg p-5">

                {user.matchPercentage}% Match

              </div>

            </div>

          )}


          {/* ================= COMMON DOMAINS ================= */}

          {user.commonDomains?.length > 0 && (

            <div className="mt-5 p-4 rounded-xl bg-base-200">

              <h2 className="text-lg font-semibold">

                Common Domains

              </h2>

              <div className="flex flex-wrap gap-2 mt-2">

                {user.commonDomains.map((domain) => (

                  <span
                    key={domain}
                    className="badge badge-primary p-3"
                  >
                    {domain}
                  </span>

                ))}

              </div>

            </div>

          )}


          {/* ================= COMMON SKILLS ================= */}

          {user.commonSkills?.length > 0 && (

            <div className="mt-4 p-4 rounded-xl bg-base-200">

              <h2 className="text-lg font-semibold">

                Common Skills

              </h2>

              <div className="flex flex-wrap gap-2 mt-2">

                {user.commonSkills.map((skill) => (

                  <span
                    key={skill}
                    className="badge badge-secondary p-3"
                  >
                    {skill}
                  </span>

                ))}

              </div>

            </div>

          )}


          {/* ================= ABOUT ================= */}

          <div className="mt-5">

            <h2 className="text-xl font-semibold">
              About
            </h2>

            <p className="mt-2 opacity-80">

              {user.about ||
                "No information available"}

            </p>

          </div>


          {/* ================= DOMAINS ================= */}

          <div className="mt-4">

            <h2 className="text-xl font-semibold">
              Domains
            </h2>

            <div className="flex flex-wrap gap-2 mt-2">

              {user.domains?.length > 0 ? (

                user.domains.map((domain) => (

                  <span
                    key={domain}
                    className="badge badge-primary p-3"
                  >
                    {domain}
                  </span>

                ))

              ) : (

                <p className="opacity-60">
                  No domains added
                </p>

              )}

            </div>

          </div>


          {/* ================= SKILLS ================= */}

          <div className="mt-4">

            <h2 className="text-xl font-semibold">
              Skills
            </h2>

            <div className="flex flex-wrap gap-2 mt-2">

              {user.skills?.length > 0 ? (

                user.skills.map((skill) => (

                  <span
                    key={skill}
                    className="badge badge-secondary p-3"
                  >
                    {skill}
                  </span>

                ))

              ) : (

                <p className="opacity-60">
                  No skills added
                </p>

              )}

            </div>

          </div>


          {/* ================= EXPERIENCE ================= */}

          <div className="mt-4">

            <h2 className="text-xl font-semibold">
              Experience
            </h2>

            <p className="mt-2">

              {user.experienceMonths > 0
                ? `${user.experienceMonths} months`
                : "Fresher"}

            </p>

          </div>


          {/* ================= CURRENT STATUS ================= */}

          <div className="mt-4">

            <h2 className="text-xl font-semibold">
              Current Status
            </h2>

            <p className="mt-2">

              {user.currentStatus ||
                "Not specified"}

            </p>

          </div>


          {/* ================= ORGANIZATION ================= */}

          {user.organization && (

            <div className="mt-4">

              <h2 className="text-xl font-semibold">
                Organization
              </h2>

              <p className="mt-2">

                {user.organization}

              </p>

            </div>

          )}


          {/* ================= BACK BUTTON ================= */}

          <div className="card-actions justify-center mt-6">

            <button
              className="btn btn-primary"
              onClick={() => navigate(-1)}
            >
              Go Back
            </button>

          </div>


        </div>

      </div>

    </div>

  );
};

export default PublicProfile;