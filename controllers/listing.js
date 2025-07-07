const Listing = require("../models/listing.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });
const {cloudinary} = require("../cloudConfig.js");
const formatSlug = require("../utils/formatSlug.js");

module.exports.index = async (req, res) => {
    let allListings = await Listing.find({});
    res.render("./listings/index.ejs", {allListings});
};

module.exports.renderNewForm = (req, res) => {
    res.render("./listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id).populate({path: "reviews", populate: {path: "author"}}).populate("owner");
    if(!listing){
        req.flash("error", "Listing you are requested for does not exist!");
        return res.redirect("/wanderlust");
    }

    res.render("./listings/show.ejs", {listing});
};

module.exports.createListing = async (req, res, next) => {
    let response = await geocodingClient.forwardGeocode({
    query: req.body.listing.location,
    limit: 1
    })
    .send();
    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url, filename};

    newListing.geometry = response.body.features[0].geometry;

    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/wanderlust");
};

module.exports.renderEditForm = async (req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error", "Listing you are requested for does not exist!");
        return res.redirect("/wanderlust");
    }

    let originalImageUrl = listing.image.url;
    originalImageUrl =  originalImageUrl.replace("/upload", "/upload/w_250")
    res.render("./listings/edit.ejs", {listing, originalImageUrl});
};

module.exports.updateListing = async (req, res) => {
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing}, { new: true });

    if (typeof req.file !== "undefined") {
        // 1. Delete old image from Cloudinary
        if (listing.image && listing.image.filename) {
            try {
                await cloudinary.uploader.destroy(listing.image.filename);
            } catch (err) {
                console.error("Failed to delete old image from Cloudinary:", err);
                req.flash("error", "Could not delete old image from Cloudinary.");
            }
        }

        // 2. Save new image info
        listing.image = {
            url: req.file.path,
            filename: req.file.filename
        };

        await listing.save();
    }
    req.flash("success", "Listing Updated!");
    res.redirect(`/wanderlust/${id}`);
};

module.exports.destroyListing = async (req, res) => {
     const { id } = req.params;
    const listing = await Listing.findById(id);

    if (!listing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/wanderlust");
    }

    // Delete image from Cloudinary
    if (listing.image && listing.image.filename) {
        try {
            await cloudinary.uploader.destroy(listing.image.filename);
        } catch (err) {
            console.error("Failed to delete image from Cloudinary:", err);
            req.flash("error", "Failed to delete image from Cloudinary.");
            return res.redirect("/wanderlust");
        }
    }

    // Delete listing from MongoDB
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!");
    res.redirect("/wanderlust");
};

module.exports.searchListing = async (req, res) => {
    const searchQuery = req.query.q;

    if (!searchQuery) {
        req.flash('error', 'Please enter a search term.');
        return res.redirect('/wanderlust');
    }

    // Case-insensitive partial match (e.g., title contains "goa")
    const regex = new RegExp(searchQuery, 'i');

    const allListings = await Listing.find({$or: [
                                                    { title: regex },
                                                    { location: regex },
                                                    {country: regex}
                                                ]
                                            }); // You can match other fields too

    res.render('listings/index.ejs', { allListings, searchQuery });
}

module.exports.cattegoryListing = async (req, res) => {
    let {category : rawCategory} = req.params;
    const category = formatSlug(rawCategory);
    if(category === "Trending") {
        let allListings = await Listing.find({});
        res.render("./listings/category.ejs", {category, allListings});
    } else {
        let allListings = await Listing.find({category: category});
        res.render("./listings/category.ejs", {category, allListings});
    }
    
};