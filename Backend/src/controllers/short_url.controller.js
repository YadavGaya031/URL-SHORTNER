import { getShortUrl, incClickBySlug } from "../dao/short_url.dao.js";
import { createShortUrlWithoutUser, createShortUrlWithUser } from "../services/short_url.service.js";
import wrapAsync from "../utils/tryCatchWrapper.js";
import Analytics from "../models/analytics.model.js";
import {UAParser} from "ua-parser-js";
import geoip from "geoip-lite";

export const createShortUrl = wrapAsync(async (req, res) => {
  const { url, slug, expiresAt, expiresInDays } = req.body;
  let shortUrl;
  // const data = req.body
  // let shortUrl
  try{
    if (req.user) {
    shortUrl = await createShortUrlWithUser(
      url,
      req.user._id,
      slug,
      expiresAt,
      expiresInDays
    );
  } else {
    shortUrl = await createShortUrlWithoutUser(url, expiresAt);
  }
  res.status(200).json({
    shortUrl: process.env.APP_URL + shortUrl,
    // qrCode: urlData.qrCode
  });
  }catch(err){
    if(err.message === "NO_CREDITS"){
      return res.status(402).json({
        success: false,
        message: "You have no credits left. Please upgrade your plan."
      })
    }
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

export const redirectFromShortUrl = wrapAsync(async (req, res) => {
    const { id } = req.params;
    const doc = await getShortUrl(id);
    // console.log(doc);
    if (!doc) {
        return res.status(404).send("Short URL not found");
    }
    if (!doc.isActive || (doc.expiresAt && new Date() > doc.expiresAt)) {
       if (doc.user?.email) {
      sendEmail(
        doc.user.email,
        "❗ Your Link Has Expired - Linkly",
        `<p>Hello ${doc.user.name},</p>
         <p>Your short link <b>${process.env.APP_URL}${id}</b> has expired.</p>
         <p>If you want to reactivate or extend it, please visit your dashboard.</p>`
      );
    }  
      return res.status(410).send("This link has expired or been disabled.");
    }
    const userAgent = req.headers["user-agent"] || "";
    const parser = new UAParser(userAgent);
    const ua = parser.getResult();
    let ip = (req.headers["x-forwarded-for"] || req.socket.remoteAddress || "").split(",")[0].trim();
    if (ip === "::1" || ip === "127.0.0.1"){
      ip = "106.51.72.0"
    }
    const geo = ip ? geoip.lookup(ip) : null;
    await Analytics.create({
        short_url: id,
        browser: ua.browser?.name || null,
        os: ua.os?.name || null,
        device: ua.device?.type || "Desktop",
        referrer: req.get("referer") || null,
        country: geo?.country || null,
        ip: ip || null,
        timestamp: new Date(),
    });
    await incClickBySlug(id);
    res.redirect(doc.full_url);
});

export const createCustomShortUrl = wrapAsync(async (req, res) => {
    const { url, slug } = req.body;
    const shortUrl = await createShortUrlWithoutUser(url, slug);
    res.status(200).json({ shortUrl: process.env.APP_URL + shortUrl });
});
