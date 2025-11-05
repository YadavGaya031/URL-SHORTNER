import { findUrlFromShortUrl } from "../dao/url.dao.js";
import { short_url_withoutUser } from "../services/url.service.js";
import dotenv from 'dotenv';
dotenv.config();


export const createShortUrl = async (req, res) => {
    const { url } = req.body;
    const shortUrl = await short_url_withoutUser(url)
    res.send(process.env.APP_URL + shortUrl)
}


export const redirectShortUrl = async(req, res) => {
    const { id } = req.params;
    const url = await findUrlFromShortUrl(id)
    // console.log(url.full_url)
    res.redirect(url.full_url);
}