const express = require('express')
const router = express.Router();
const volunteerController = require("../controllers/volunteerController.js")

router.get('/getVolunteers/', (req, res)=>volunteerController.getVolunteers(req, res))

module.exports = router;
