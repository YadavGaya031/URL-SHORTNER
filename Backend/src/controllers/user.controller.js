import wrapAsync from "../utils/tryCatchWrapper.js"
import { getAllUserUrlsDao } from "../dao/user.dao.js"
import shortUrl from "../models/short_url.model.js"

export const getAllUserUrls = wrapAsync(async (req, res) => {
    const {_id} = req.user
    const urls = await getAllUserUrlsDao(_id)
    res.status(200).json({message:"success",urls})
})

export const deleteMyUrlbyId = wrapAsync(async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;
    const doc = await shortUrl.findOne({_id: id, user: userId});
    if(!doc){
        return res.status(404).json({
            message: "Not Found or not your url"
        })
    }
    await doc.deleteOne();
    res.status(200).json({
        message: "Deleted", id
    });
});
