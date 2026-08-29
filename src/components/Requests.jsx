import axios from "axios";
import { BaseURL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";
import { useEffect, useState } from "react";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(
        BaseURL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.error(err);
    }
  };

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const res = await axios.get(BaseURL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <span className="loading loading-spinner loading-lg text-indigo-500" />
      </div>
    );
  }

  // ================= EMPTY =================
  if (!requests || requests.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-2 px-4 text-center">
        <p className="text-lg font-medium text-white/70">No requests yet</p>
        <p className="text-sm text-white/40">
          When someone shows interest in your profile, it'll show up here.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-xl font-semibold text-center mb-8">
        Connection Requests
      </h1>

      <div className="space-y-4">
        {requests.map((request) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } =
            request.fromUserId;

          return (
            <div
              key={_id}
              className="flex items-center gap-4 rounded-xl bg-base-200 border border-white/10 p-4"
            >
              <img
                alt={`${firstName} profile`}
                className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                src={photoUrl}
                onError={(e) => {
                  e.currentTarget.src =
                    "https://api.dicebear.com/7.x/initials/svg?seed=" +
                    encodeURIComponent(`${firstName} ${lastName}`);
                }}
              />

              <div className="flex-1 min-w-0 text-left">
                <h2 className="font-semibold text-white truncate">
                  {firstName} {lastName}
                </h2>
                {age && gender && (
                  <p className="text-xs text-white/40 mt-0.5">
                    {age}, {gender}
                  </p>
                )}
                {about && (
                  <p className="text-sm text-white/60 mt-1 line-clamp-2">
                    {about}
                  </p>
                )}
              </div>

              <div className="flex gap-2 flex-shrink-0">
                <button
                  className="rounded-lg border border-white/15 px-4 py-2 text-sm font-medium text-white/70 hover:bg-white/5 transition"
                  onClick={() => reviewRequest("rejected", request._id)}
                >
                  Reject
                </button>
                <button
                  className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 transition"
                  onClick={() => reviewRequest("accepted", request._id)}
                >
                  Accept
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;