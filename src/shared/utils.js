import { TMDB_URL_IMAGE } from "./api/urls";
import imageNotAvailable from "./images/not-available.png";

export default {
  getMoviePoster(imageSource) {
    return imageSource ? TMDB_URL_IMAGE + imageSource : imageNotAvailable;
  },

  getReadableRuntime(totalMinutes) {
    const totalHours = totalMinutes / 60;
    const hours = Math.trunc(totalHours);
    const minutes = Math.round((totalHours - Math.floor(totalHours)) * 60);

    return hours + "h " + minutes + "min";
  }
};
