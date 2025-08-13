
const { cloudinary } = require("../Cloudinary/cloudinary");
const { extractPublicId } = require("cloudinary-build-url");
const { Banners } = require("../Model/Banners");
const delImg = async (imageUrl) => {

    let publicKey = []
    imageUrl.forEach(url => {
        const publicId = extractPublicId(url)
        publicKey.push(publicId)
    });

    await cloudinary.api.delete_resources(publicKey, (error, result) => {
        if (error) {
            return false
        }

    }
    )
    return true



}

const RegionalBanner = async (url) => {
    // Remove leading 'www.' if present
    let cleaned = url.replace(/^www\./, '');
    // Remove the domain part if present
    cleaned = cleaned.replace(/\.?libertyairwheel\.com$/, '');
    // If anything remains, it's the region
    // Remove trailing dot (if present)
    cleaned = cleaned.replace(/\.$/, '');
    let key = (cleaned === '' || cleaned === 'libertyairwheel') ? -1 : cleaned;
    let result = ''
    if (key != -1) {
        result = await Banners.find({ region: key })
        if (result.length == 0) {
            result = await Banners.find({ region: 'int' })

        }

        return result
    }
    result = await Banners.find({ region: 'int' })
    return result



}


module.exports = {
    delImg,RegionalBanner
}