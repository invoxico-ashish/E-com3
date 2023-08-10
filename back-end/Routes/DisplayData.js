const express = require("express");
const { model } = require("mongoose");
const router = express.Router();


router.post("/foodData", (req, res) => {
    try {
        res.send([global.foodData,global.foodcategory])
    }
    catch (err) {
        console.error("error", err.message);
        res.send("Server error");
    }
})

module.exports = router;