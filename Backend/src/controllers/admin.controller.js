import shortUrl from "../models/short_url.model.js";

export const getAllUrls = async (req, res) => {
    const urls = await shortUrl.find().populate("user", "name email role");
    res.status(200).json(urls);
}

export const adminDeletebySlug = async (req, res) => {
    const { slug } = req.params;
    const deleted = await shortUrl.findOneAndDelete({ short_url: slug });
    if(!deleted){
        return res.status(404).json({
            message: "Url not found"
        });
    }
    return res.status(200).json({
        message: "Deleted", slug
    });
}

export const toggleUrls = async (req, res) => {
    const { slug } = req.params;
    const url = await shortUrl.findOne({ short_url: slug });
    if(!url){
        return res.status(404).json({
            message: "Not found"
        });
    }
    url.isActive = !url.isActive;
    await url.save();
    res.json({
        success: true,
        message: "Updated",
        isActive: url.isActive
    });
}