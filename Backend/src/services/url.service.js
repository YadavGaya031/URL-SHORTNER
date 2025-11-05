import { generateId } from "../utils/helper.js";
import { saveShortUrl } from "../dao/url.dao.js";

export const short_url_withoutUser = async (url) => {
    const short_Url = generateId(7);
    saveShortUrl(url, short_Url);
    return short_Url;
}

export const short_url_withUser = async (url, userId) => {
    const short_Url = generateId(7);
    saveShortUrl(url, short_Url, userId);
    return short_Url;
}
