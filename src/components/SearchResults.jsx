import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BaseURL } from "../utils/constants";

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const searchQuery = searchParams.get("q");
  const page = parseInt(searchParams.get("page")) || 1;

  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const limit = 10;

  const searchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      if (!searchQuery?.trim()) {
        setUsers([]);
        setPagination(null);
        return;
      }

      const res = await axios.get(
        `${BaseURL}/search?q=${encodeURIComponent(
          searchQuery.trim()
        )}&page=${page}&limit=${limit}`,
        {
          withCredentials: true,
        }
      );

      setUsers(res?.data?.data || []);
      setPagination(res?.data?.pagination || null);

    } catch (err) {
      console.error("Search results error:", err);

      setError(
        err?.response?.data?.message ||
          "Unable to search users"
      );

      setUsers([]);
      setPagination(null);

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    searchUsers();
  }, [searchQuery, page]);

  // Change page
  const changePage = (newPage) => {
    setSearchParams({
      q: searchQuery,
      page: newPage,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Loading
  if (loading) {
    return (
      <div className="flex justify-center my-10">
        <h1 className="text-xl">
          Searching...
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
          onClick={() => navigate("/")}
        >
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 my-10">

      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Search Results
        </h1>

        <p className="mt-2 opacity-70">
          Results for:{" "}
          <span className="font-semibold">
            "{searchQuery}"
          </span>
        </p>

        {/* Total results */}
        {pagination && (
          <p className="text-sm opacity-60 mt-1">
            {pagination.totalResults} users found
          </p>
        )}
      </div>

      {/* No Results */}
      {users.length === 0 && (
        <div className="text-center my-20">
          <h2 className="text-xl">
            No users found
          </h2>

          <p className="opacity-60 mt-2">
            Try searching for another name, skill,
            domain, role or organization.
          </p>
        </div>
      )}

      {/* Results */}
      {users.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {users.map((user) => (
              <div
                key={user._id}
                className="card bg-base-300 shadow-xl"
              >

                {/* Profile Image */}
                <figure className="px-6 pt-6">
                  <img
                    src={user.photoUrl}
                    alt={`${user.firstName} profile`}
                    className="w-32 h-32 rounded-full object-cover"
                  />
                </figure>

                <div className="card-body">

                  {/* Name */}
                  <h2 className="card-title justify-center">
                    {user.firstName} {user.lastName}
                  </h2>

                  {/* Role / Status */}
                  <p className="text-center opacity-70">
                    {user.role || user.currentStatus}
                  </p>

                  {/* About */}
                  <p className="text-sm mt-2">
                    {user.about ||
                      "No information available"}
                  </p>

                  {/* Domains */}
                  <div className="mt-3">

                    <h3 className="font-semibold">
                      Domains
                    </h3>

                    <div className="flex flex-wrap gap-2 mt-2">

                      {user.domains?.length > 0 ? (
                        user.domains.map((domain) => (
                          <span
                            key={domain}
                            className="badge badge-primary"
                          >
                            {domain}
                          </span>
                        ))
                      ) : (
                        <span className="text-sm opacity-60">
                          No domains
                        </span>
                      )}

                    </div>
                  </div>

                  {/* Skills */}
                  <div className="mt-3">

                    <h3 className="font-semibold">
                      Skills
                    </h3>

                    <div className="flex flex-wrap gap-2 mt-2">

                      {user.skills?.length > 0 ? (
                        user.skills.map((skill) => (
                          <span
                            key={skill}
                            className="badge badge-secondary"
                          >
                            {skill}
                          </span>
                        ))
                      ) : (
                        <span className="text-sm opacity-60">
                          No skills
                        </span>
                      )}

                    </div>
                  </div>

                  {/* Experience */}
                  <div className="mt-3">

                    <h3 className="font-semibold">
                      Experience
                    </h3>

                    <p className="text-sm mt-1">
                      {user.experienceMonths > 0
                        ? `${user.experienceMonths} months`
                        : "Fresher"}
                    </p>

                  </div>

                  {/* Organization */}
                  {user.organization && (
                    <div className="mt-3">

                      <h3 className="font-semibold">
                        Organization
                      </h3>

                      <p className="text-sm mt-1">
                        {user.organization}
                      </p>

                    </div>
                  )}

                  {/* Search Score */}
                  {user.searchScore !== undefined && (
                    <div className="mt-3">

                      <p className="text-sm opacity-70">
                        Search relevance:{" "}
                        <span className="font-semibold">
                          {user.searchScore}
                        </span>
                      </p>

                    </div>
                  )}

                  {/* View Profile */}
                  <div className="card-actions justify-center mt-5">

                    <button
                      className="btn btn-primary"
                      onClick={() =>
                        navigate(
                          `/profile/${user._id}`
                        )
                      }
                    >
                      View Profile
                    </button>

                  </div>

                </div>
              </div>
            ))}

          </div>

          {/* Pagination */}
          {pagination &&
            pagination.totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-10">

                {/* Previous */}
                <button
                  className="btn btn-outline"
                  disabled={!pagination.hasPreviousPage}
                  onClick={() =>
                    changePage(page - 1)
                  }
                >
                  ← Previous
                </button>

                {/* Page Number */}
                <span className="font-semibold">
                  Page {pagination.page} of{" "}
                  {pagination.totalPages}
                </span>

                {/* Next */}
                <button
                  className="btn btn-outline"
                  disabled={!pagination.hasNextPage}
                  onClick={() =>
                    changePage(page + 1)
                  }
                >
                  Next →
                </button>

              </div>
            )}

        </>
      )}

    </div>
  );
};

export default SearchResults;