import axios from "axios";
import { BaseURL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {

  const {_id,firstName,lastName,photoUrl,about,skills,domains,experienceMonths,currentStatus,
    role,organization,matchScore,matchPercentage} = user;

  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {

    try {

      await axios.post(
        BaseURL +
          "/request/send/" +
          status +
          "/" +
          userId,
        {},
        {
          withCredentials: true,
        }
      );

      // Remove this user from current feed
      dispatch(removeUserFromFeed(userId));

    } catch (err) {

      console.error(
        "Connection request error:",
        err
      );

    }
  };


  // Feed uses matchScore
  // Public profile uses matchPercentage
  const match = matchScore ?? matchPercentage;


  return (

    <div className="card bg-base-300 w-96 shadow-xl">

      {/* ================= PHOTO ================= */}

      <figure>

        <img
          src={photoUrl}
          alt={`${firstName} profile`}
          className="w-full h-80 object-cover"
        />

      </figure>


      <div className="card-body">


        {/* ================= NAME ================= */}

        <h2 className="card-title">

          {firstName} {lastName}

        </h2>


        {/* ================= ROLE / STATUS ================= */}

        <p className="opacity-70">

          {role || currentStatus || "TalentLink User"}

        </p>


        {/* ================= MATCH ================= */}

        {match !== undefined && (

          <div className="mt-2">

            <span className="badge badge-success p-4">

              {match}% Match

            </span>

          </div>

        )}


        {/* ================= ABOUT ================= */}

        {about && (

          <p className="mt-2">

            {about}

          </p>

        )}


        {/* ================= DOMAINS ================= */}

        {domains?.length > 0 && (

          <div className="mt-3">

            <h3 className="font-semibold">
              Domains
            </h3>

            <div className="flex flex-wrap gap-2 mt-2">

              {domains.map((domain) => (

                <span
                  key={domain}
                  className="badge badge-primary"
                >
                  {domain}
                </span>

              ))}

            </div>

          </div>

        )}


        {/* ================= SKILLS ================= */}

        {skills?.length > 0 && (

          <div className="mt-3">

            <h3 className="font-semibold">
              Skills
            </h3>

            <div className="flex flex-wrap gap-2 mt-2">

              {skills.map((skill) => (

                <span
                  key={skill}
                  className="badge badge-secondary"
                >
                  {skill}
                </span>

              ))}

            </div>

          </div>

        )}


        {/* ================= EXPERIENCE ================= */}

        <div className="mt-3">

          <h3 className="font-semibold">
            Experience
          </h3>

          <p className="text-sm">

            {experienceMonths > 0
              ? `${experienceMonths} months`
              : "Fresher"}

          </p>

        </div>


        {/* ================= ORGANIZATION ================= */}

        {organization && (

          <div className="mt-3">

            <h3 className="font-semibold">
              Organization
            </h3>

            <p className="text-sm">

              {organization}

            </p>

          </div>

        )}


        {/* ================= BUTTONS ================= */}

        <div className="card-actions justify-center my-4">

          <button
            className="btn btn-primary"
            onClick={() =>
              handleSendRequest(
                "ignored",
                _id
              )
            }
          >
            Ignore
          </button>


          <button
            className="btn btn-secondary"
            onClick={() =>
              handleSendRequest(
                "interested",
                _id
              )
            }
          >
            Interested
          </button>

        </div>

      </div>

    </div>

  );
};

export default UserCard;