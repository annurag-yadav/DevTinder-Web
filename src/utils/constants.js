// export const BaseURL = "http://localhost:3000";

// export const BaseURL = "/api";

//making the url dynamic based on the environment

export const BaseURL = location.hostname === "localhost" ? "http://localhost:3000" : "/api";