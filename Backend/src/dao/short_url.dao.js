import shortUrl from "../models/short_url.model.js";
// import shortUrlModel from "../models/short_url.model.js";
import { ConflictError } from "../utils/errorHandler.js";

export const saveShortUrl = async (short_url, full_url, userId=null, expiresAt=null, qrCode = null) => {
    return await shortUrl.create({
        short_url: short_url,
        full_url: full_url,
        user: userId,
        expiresAt: expiresAt,
        qrCode: qrCode
    });
};

export const getShortUrl = async (shortId) => {
    return await shortUrl.findOneAndUpdate({short_url:shortId});
}

export const getCustomShortUrl = async (slug) => {
    return await shortUrl.findOne({short_url:slug});
}

export const deleteShortUrlBySlug = async(slug) => {
    return await shortUrl.findOneAndDelete({ short_url: slug});
}

export const findShortUrlByIdForUser = async (id, userId) => {
    return await shortUrl.findOne({ _id: id, user: userId });
}

export const incClickBySlug = async (slug) => {
    return await shortUrl.updateOne({ short_url: slug }, { $inc: {clicks: 1} });
}