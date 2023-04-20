const express = require("express");
const router = express.Router();
const {addUserMtd,Count, updateAPI, getAllData, findParticular, pagination } = require('../../Controllers/userController/getUserController')

router.route('/').get(addUserMtd).post(addUserMtd)
router.route('/count').get(Count)
router.route('/update/:id').get(updateAPI)
router.route('/find').get(getAllData)
router.route('/findone').get(findParticular)
router.route('/paginate').get(pagination)


module.exports = router 

