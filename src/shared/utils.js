import {TMDB_URL_IMAGE} from "./api/urls";
import imageNotAvailable from "./images/not-available.png";
import {
    RATING_1_COMMENT,
    RATING_2_COMMENT,
    RATING_3_COMMENT,
    RATING_4_COMMENT,
    RATING_5_COMMENT,
} from "./constants/rating-comments";

export default {
    getMediaPoster(imageSource) {
        return imageSource ? TMDB_URL_IMAGE + imageSource : imageNotAvailable;
    },

    getReadableRuntime(totalMinutes) {
        if (!totalMinutes) return 'N/A'

        const totalHours = totalMinutes / 60;
        const hours = Math.trunc(totalHours);
        const minutes = Math.round((totalHours - Math.floor(totalHours)) * 60);

        return hours + "h " + minutes + "min";
    },

    displayRatingComment(numberOfSelectedStar) {
        switch (numberOfSelectedStar) {
            case 1:
                return RATING_1_COMMENT;
            case 2:
                return RATING_2_COMMENT;
            case 3:
                return RATING_3_COMMENT;
            case 4:
                return RATING_4_COMMENT;
            case 5:
                return RATING_5_COMMENT;
            default:
                return;
        }
    },
};
