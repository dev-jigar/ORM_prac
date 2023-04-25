const express = require("express");
const router = express.Router();
const {addUserMtd,Count, updateAPI, getAllData, findParticular, pagination, delete_user, restore_user, oneRelationShip, oneTomanyRelationShip, UpdatedRelationOnetoMany, manyToMany, oneRelationShiptomany, HandleMnyRelationShip, fetchDatafromMany } = require('../../Controllers/userController/getUserController')

router.route('/').get(addUserMtd).post(addUserMtd)
router.route('/count').get(Count)
router.route('/update/:id').get(updateAPI)
router.route('/find').get(getAllData)
router.route('/findone').get(findParticular)
router.route('/paginate').get(pagination)
router.route('/delete').get(delete_user)
router.route('/restore').get(restore_user)
router.route('/one-one').get(oneRelationShip)
router.route('/one-many').get(oneTomanyRelationShip)
router.route('/one-many-up').get(UpdatedRelationOnetoMany)
router.route('/one-many-ins').get(oneRelationShiptomany)
router.route('/many-many').get(HandleMnyRelationShip)
router.route('/fetch-many').get(fetchDatafromMany)




module.exports = router 

