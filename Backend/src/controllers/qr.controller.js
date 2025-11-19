import shortUrl from "../models/short_url.model.js";
import { generateQRCode } from "../services/short_url.service.js";


export const getQRCode = async (req, res) => {
    try{
        const { slug } = req.params;
        const urlData = await shortUrl.findOne({ short_url: slug });
        if(!urlData){
            return res.status(404).json({
                message: "Short URL not found"
            });
        }
        const fullShortUrl = `https://linkly-td22.onrender.com/${slug}`;
        const qrCode = await generateQRCode(fullShortUrl);

        if(!qrCode){
            return res.status(500).json({
                message: "Failed to generate QR code."
            });
        }
        res.status(200).json({
            qrCode, shortUrl: fullShortUrl
        });
    }catch(err){
        res.status(500).json({
            message: "Internal Server Error."
        })
    }
}
