import axios from "axios";

class ApiClient {
  constructor() {
    this.apiClient = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_URI,
      withCredentials: true,
    });
  }

  //ADS
  getAllAds() {
    return this.apiClient.get("/ads/all");
  }

  getAdById(adId) {
    return this.apiClient.get(`/ads/${adId}`);
  }

  createAd(body) {
    return this.apiClient.post("ads/new", body);
  }

  deleteAd(id) {
    return this.apiClient.delete(`/ads/${id}`);
  }

  // updateAd(id) {
  //   return this.apiClient.put(`/ads/${id}`);
  // }

  //PROFILE

  getProfileById(userId) {
    return this.apiClient.get(`/${userId}`);
  }

  whoami() {
    return this.apiClient.get("/whoami");
  }

  login(body) {
    return this.apiClient.post("/login", body);
  }

  signup(body) {
    return this.apiClient.post("/signup", body);
  }

  //FAVORITES
  getFavoritesUser() {
    return this.apiClient.get('/user/favorites/all');
  }



}

const apiClient = new ApiClient();
export default apiClient;
