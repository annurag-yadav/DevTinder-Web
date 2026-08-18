import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { BaseURL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Search states
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);

  // Logout
  const handleLogout = async () => {
    try {
      await axios.post(
        BaseURL + "/logout",
        {},
        {
          withCredentials: true,
        }
      );

      dispatch(removeUser());

      // Navigate to login
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  // Search API with debounce
  useEffect(() => {
    // Don't search if input is empty
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setShowSuggestions(false);
      return;
    }

    // Wait 300ms before calling API
    const timer = setTimeout(async () => {
      try {
        setSearchLoading(true);

        const res = await axios.get(
          `${BaseURL}/search?q=${encodeURIComponent(searchQuery.trim())}`,
          {
            withCredentials: true,
          }
        );

        setSearchResults(res?.data?.data || []);
        setShowSuggestions(true);
      } catch (err) {
        console.error("Search error:", err);
        setSearchResults([]);
      } finally {
        setSearchLoading(false);
      }
    }, 300);

    // Cancel previous timer if user types again
    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  // When user clicks a suggestion
  const handleSuggestionClick = (userId) => {
    setSearchQuery("");
    setSearchResults([]);
    setShowSuggestions(false);

    navigate(`/profile/${userId}`);
  };

  // When user presses Enter
  const handleSearch = (e) => {
    e.preventDefault();

    if (!searchQuery.trim()) {
      return;
    }

    setShowSuggestions(false);

    navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  return (
    <>
      <div className="navbar bg-base-300 shadow-sm">

        {/* Logo */}
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">
            TalentLink
          </Link>
        </div>

        {/* Search */}
        {user && (
          <div className="relative w-96">

            <form onSubmit={handleSearch}>
              <div className="flex items-center">

                <input
                  type="text"
                  placeholder="Search people, skills, domains..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => {
                    if (searchResults.length > 0) {
                      setShowSuggestions(true);
                    }
                  }}
                  className="input input-bordered w-full"
                />

                <button
                  type="submit"
                  className="btn btn-primary ml-2"
                >
                  🔍
                </button>

              </div>
            </form>

            {/* Search Suggestions */}
            {showSuggestions && searchQuery.trim() && (
              <div className="absolute top-14 left-0 w-full bg-base-100 rounded-box shadow-xl z-50">

                {searchLoading && (
                  <div className="p-4 text-center">
                    Searching...
                  </div>
                )}

                {!searchLoading && searchResults.length === 0 && (
                  <div className="p-4 text-center">
                    No users found
                  </div>
                )}

                {!searchLoading &&
                  searchResults.length > 0 &&
                  searchResults.map((searchUser) => (
                    <div
                      key={searchUser._id}
                      onClick={() =>
                        handleSuggestionClick(searchUser._id)
                      }
                      className="flex items-center gap-3 p-3 hover:bg-base-200 cursor-pointer"
                    >

                      {/* Profile image */}
                      <div className="avatar">
                        <div className="w-10 rounded-full">
                          <img
                            src={searchUser.photoUrl}
                            alt="profile"
                          />
                        </div>
                      </div>

                      {/* User information */}
                      <div>
                        <p className="font-semibold">
                          {searchUser.firstName}{" "}
                          {searchUser.lastName}
                        </p>

                        <p className="text-sm opacity-70">
                          {searchUser.role ||
                            searchUser.currentStatus}
                        </p>
                      </div>

                    </div>
                  ))}

              </div>
            )}

          </div>
        )}

        {/* Right side */}
        <div className="flex gap-2">

          {user && (
            <div className="dropdown dropdown-end mx-5 flex">

              <p className="px-4">
                Welcome, {user.firstName}!
              </p>

              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">

                  <img
                    alt="user photo"
                    src={user.photoUrl}
                  />

                </div>
              </div>

              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
              >

                <li>
                  <Link
                    to="/profile"
                    className="justify-between"
                  >
                    Profile
                    <span className="badge">
                      New
                    </span>
                  </Link>
                </li>

                <li>
                  <Link to="/connections">
                    Connections
                  </Link>
                </li>

                <li>
                  <Link to="/requests">
                    Requests
                  </Link>
                </li>

                <li>
                  <Link to="/premium">
                    Premium
                  </Link>
                </li>

                <li>
                  <button onClick={handleLogout}>
                    Logout
                  </button>
                </li>

              </ul>

            </div>
          )}

        </div>

      </div>
    </>
  );
};

export default NavBar;