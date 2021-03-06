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

  updateAd(id, data) {
    return this.apiClient.put(`/ads/${id}/update`, data);
  }

  addJoin (idAd) {
    return this.apiClient.post(`ads/join`, {idAd});
  }

  selectUser ( idAd, idUserJoined) {
    return this.apiClient.post(`ads/${idAd}/select`, { idAd, idUserJoined});
  }

  completeUser ( idAd ) {
    return this.apiClient.post(`ads/${idAd}/completed`, { idAd });
  }
  
  //PROFILE

  getProfileById(userId) {
    return this.apiClient.get(`/${userId}`);
  }

  updateProfile(userId, data) {
    return this.apiClient.put(`/${userId}/update`, data);
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

  // logout(id) {
  //   return this.apiClient.get("/logout", id);
  // }

  logout() {
    return this.apiClient.get("/logout");
  }
  deleteProf(id) {
    return this.apiClient.delete(`/${id}`,id);
  }


  //FAVORITES
  getFavoritesUser() {
    return this.apiClient.get('/user/favorites/all');
  }

  addFavorite (adsId) {
    return this.apiClient.post(`user/${adsId}/add`, {adsId});
  }

  removeFavorite (adsId) {
    return this.apiClient.post(`/user/${adsId}/remove`, {adsId});
  }

  removeJoin (idAd) {
    return this.apiClient.post(`ads/${idAd}/unjoin`, {idAd});
  }
}

const apiClient = new ApiClient();
export default apiClient;
