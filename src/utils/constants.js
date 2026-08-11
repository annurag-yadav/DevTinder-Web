// export const BaseURL = "http://localhost:3000";

// export const BaseURL = "/api";

//making the url dynamic based on the environment

const API_BASE_URL = location.hostname === "localhost" ? "http://localhost:3000" : "/api";

export const BaseURL = API_BASE_URL;