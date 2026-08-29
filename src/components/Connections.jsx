import axios from "axios";
import { BaseURL } from "../utils/constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/conectionSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const fetchConnections = async () => {
    try {
      setLoading(true);
      const res = await axios.get(BaseURL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConnections();
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
  if (!connections || connections.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-2 px-4 text-center">
        <p className="text-lg font-medium text-white/70">No connections yet</p>
        <p className="text-sm text-white/40">
          Accepted requests will show up here so you can start chatting.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-xl font-semibold text-center mb-8">
        Connections
      </h1>

      <div className="space-y-4">
        {connections.map((connection) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } =
            connection;

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

              <Link to={`/chat/${_id}`} className="flex-shrink-0">
                <button className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 transition">
                  Chat
                </button>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;