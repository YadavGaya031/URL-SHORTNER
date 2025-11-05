import shortUrl from "../models/urlSchema.model.js"

export const saveShortUrl = async (long_url, short_url, userId) => {
    const newUrl = new shortUrl({
        full_url: long_url,
        short_url: short_url
    })
    if(userId){
        newUrl.user_id = userId 
    }
    newUrl.save()
}

export const findUrlFromShortUrl = async(shorturl) => {
    return await shortUrl.findOneAndUpdate({short_url: shorturl}, {$inc: {clicks: 1}});
}