const express = require("express");
const router = express.Router();
const {addUserMtd,Count, updateAPI, getAllData, findParticular, pagination, delete_user, restore_user, oneRelationShip, oneTomanyRelationShip, UpdatedRelationOnetoMany, manyToMany } = require('../../Controllers/userController/getUserController')

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
router.route('/many-many').get(manyToMany)



module.exports = router 

