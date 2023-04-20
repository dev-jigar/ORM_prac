

const { Op, HasOne } = require('sequelize')
// const { Sequelize} = require('sequelize')
var db = require('../../models');
const Sequelize = db.Sequelize;
const Users = db.users
const addUserMtd = async (req, res) => {
    const { name, email } = req.body
    let data = await Users.create({ name: name, email: email })
    await data.save()
    let response = {
        data: data
    }
    res.status(200).json(response)
}

//Bulk insert
const addMultilple = async (req, res) => {


    let data = await Users.bulkCreate(
        [{ name: "jigar0", email: "jsj0@gmail.com" },
        { name: "jigar1", email: "jsj1@gmail.com" },
        { name: "jigar2", email: "jsj2@gmail.com" },
        { name: "jigar3", email: "jsj3@gmail.com" }
        ])

    let response = {
        data: data
    }
    res.status(200).json(response)

}
const updateAPI = async (req, res) => {
    let id = req.params.id
    const { name, email } = req.body
    let data = await Users.update({ name: name, email: email }, {
        where: {
            id: id
        }
    })

    let response = {
        data: "Updated"
    }
    res.status(200).json(response)

}
//get ALL users Data 
const getAllData = async (req, res) => {
    console.log("sdfsdf");
    let data = await Users.findAll({

    })
  

    let response = {
        data: data
    }
    res.status(200).json(response)
}

//find count
const Count = async (req, res) => {
    //find count
    let data = await Users.findAll({
        attributes: [[Sequelize.fn('count', Sequelize.col('id')), 'ids']],
    })

    let response = {
        data: data
    }
    res.status(200).json(response)

}
//findone ///searching
const findParticular = async (req, res) => {

    const { id, name, email } = req.body

    let data = await Users.findOne({
        where: {

            [Op.or]:
            {
                name: {

                    [Op.like]: `%${name}%`,
                },
                email: {
                    [Op.like]: `%${email}%`,
                },
                id: {
                    [Op.like]: `${id}`
                }
            }

        }
    })
    if (data == null) {
        data = "No data found!"
    }

    let response = {
        data: data
    }
    res.status(200).json(response)
}
//pagination
const pagination = async (req, res) => {
    let page = req.query.page;
    let sort = req.query.sort || 'ASC'

    console.log(sort);
    let limit = 4;
    if (page == 0) {
        page = 1
    }

    if (sort == 'ASC' || sort == 'asc' || sort == 'DESC' || sort == 'desc') {

        let offset = (page - 1) * limit

        let data = await Users.findAll({

            offset: offset, limit: limit,
            order: [['id', `${sort}`], ['name', `${sort}`]]
        });

        let response = {
            data: data
        }
        res.status(200).json(response)
    } else {
        let data = "Bad request";
        let response = {
            data: data
        }
        res.status(400).json(response)
    }


}


module.exports = { addUserMtd, Count, updateAPI, getAllData, findParticular, pagination }