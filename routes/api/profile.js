const express = require('express');

const router = express.Router();

//@route GET /api/users/test
//@desc Test Post Route
//@access  
router.get('/test',(req,res) => res.json({msg:'Router Works'}));

module.exports = router;