import axios from "axios";

const getUserLocation = async () => {
  try {
    const response = await axios.get(
      "https://ipinfo.io/json?token=60903fd6f9493a"
    );
    const { country } = response.data;
    return country;
  } catch (error) {
    console.error("Error fetching user location:", error);
    return null;
  }
};

export { getUserLocation };
