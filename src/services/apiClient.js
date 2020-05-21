import axios from "axios";

class ApiClient {
  constructor() {
    this.apiClient = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_URI,
      withCredentials: true,
    });
  }

  getAllAds() {
    return this.apiClient.get("/ads/all");
  }

  // createAd(body) {
  //   return this.apiClient.post("/new", body);
  // }

  deleteAd(id) {
    return this.apiClient.delete(`/ads/${id}`);
  }

  // updateAd(id) {
  //   return this.apiClient.put(`/ads/${id}`);
  // }


  
// }
  whoami() {
    return this.apiClient.get("/whoami");
  }

  login(body) {
    return this.apiClient.post("/login", body);
  }

  signup(body) {
    return this.apiClient.post("/signup", body);
  }
}

const apiClient = new ApiClient();
export default apiClient;
