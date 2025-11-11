import { generateNanoId } from "../utils/helper.js"
import urlSchema from "../models/short_url.model.js"
import { getCustomShortUrl, saveShortUrl } from "../dao/short_url.dao.js"
import QRCode  from 'qrcode';
import User from "../models/user.model.js";

export const createShortUrlWithoutUser = async (url) => {
    const shortUrl = generateNanoId(7)
    if(!shortUrl) throw new Error("Short URL not generated")
    const expiry = calculateExpiryDate(expiresAt, expiresInDays);
    const finalUrl = process.env.APP_URL + shortUrl;
    const qrCode = await generateQRCode(finalUrl);
    await saveShortUrl(shortUrl,url, null, expiry, qrCode)
    return shortUrl
}

export const createShortUrlWithUser = async (url,userId,slug=null, expiresAt, expiresInDays) => {
  const user = await User.findById(userId);
  if(user.credits <= 0){
    throw new Error("NO_CREDITS");
  }
  const shortUrl = slug || generateNanoId(7)
    
    if(slug){
        const exists = await getCustomShortUrl(slug)
        if(exists) throw new Error("This custom url already exists")
    }
    const expiry = calculateExpiryDate(expiresAt, expiresInDays);
    const finalUrl = process.env.APP_URL + shortUrl;
    const qrCode = await generateQRCode(finalUrl);
    await saveShortUrl(shortUrl,url,userId, expiry, qrCode);
    user.credits -= 1;
    await user.save();
    return shortUrl
}

const calculateExpiryDate = (expiresAt, expiresInDays) => {
  if (expiresAt) {
    const d = new Date(expiresAt);
    if (isNaN(d.getTime()) || d <= new Date()) {
      throw new Error("expiresAt must be a valid future date");
    }
    return d;
  }
  if (typeof expiresInDays === "number" && expiresInDays > 0) {
    const d = new Date();
    d.setDate(d.getDate() + expiresInDays);
    return d;
  }
  return null;
};

export const generateQRCode = async (url) => {
    try{
        return await QRCode.toDataURL(url);
    }catch(err){
        console.log("QR Code Error: ", err);
        return null;
    }
}