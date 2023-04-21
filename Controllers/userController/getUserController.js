const { Op, HasOne, and, where, DATE } = require("sequelize");
// const { Sequelize} = require('sequelize')
var db = require("../../models");
const Sequelize = db.Sequelize;
const Users = db.users;
const contact = db.contact;
//APIS
const addUserMtd = async (req, res) => {
  const { name, email } = req.body;
  let data = await Users.create({ name: name, email: email });
  await data.save();
  let response = {
    data: data,
  };
  res.status(200).json(response);
};
//Bulk insert
const addMultilple = async (req, res) => {
  let data = await Users.bulkCreate([
    { name: "jigar0", email: "jsj0@gmail.com" },
    { name: "jigar1", email: "jsj1@gmail.com" },
    { name: "jigar2", email: "jsj2@gmail.com" },
    { name: "jigar3", email: "jsj3@gmail.com" },
  ]);

  let response = {
    data: data,
  };
  res.status(200).json(response);
};
const updateAPI = async (req, res) => {
  let id = req.params.id;
  const { name, email } = req.body;
  let data = await Users.update(
    { name: name, email: email },
    {
      where: {
        id: id,
      },
    }
  );

  let response = {
    data: "Updated",
  };
  res.status(200).json(response);
};
//get ALL users Data
const getAllData = async (req, res) => {
  let data = await Users.findAll({});

  let response = {
    data: data,
  };
  res.status(200).json(response);
};
//find count
const Count = async (req, res) => {
  //find count
  let data = await Users.findAll({
    attributes: [[Sequelize.fn("count", Sequelize.col("id")), "ids"]],
  });

  let response = {
    data: data,
  };
  res.status(200).json(response);
};
//findone ///searching
const findParticular = async (req, res) => {
  const { id, name, email } = req.body;

  let data = await Users.findOne({
    where: {
      [Op.or]: {
        name: {
          [Op.like]: `%${name}%`,
        },
        email: {
          [Op.like]: `%${email}%`,
        },
        id: {
          [Op.like]: `${id}`,
        },
      },
    },
  });
  if (data == null) {
    data = "No data found!";
  }

  let response = {
    data: data,
  };
  res.status(200).json(response);
};
//pagination
const pagination = async (req, res) => {
  let page = req.query.page;
  let sort = req.query.sort || "ASC";

  console.log(sort);
  let limit = 4;
  if (page == 0) {
    page = 1;
  }

  if (sort == "ASC" || sort == "asc" || sort == "DESC" || sort == "desc") {
    let offset = (page - 1) * limit;

    let data = await Users.findAll({
      offset: offset,
      limit: limit,
      order: [
        ["id", `${sort}`],
        ["name", `${sort}`],
      ],
    });

    let response = {
      data: data,
    };
    res.status(200).json(response);
  } else {
    let data = "Bad request";
    let response = {
      data: data,
    };
    res.status(400).json(response);
  }
};
const delete_user = async (req, res) => {
  try {
    const { del_id } = req.body;
    let data = await Users.destroy({
      where: {
        id: del_id,
      },
    });

    let response = {
      data: data,
    };
    res.status(200).json(response);
  } catch (e) {
    let data = "Bad request";
    let response = {
      data: data,
    };
    res.status(400).json(response);
  }
};
const restore_user = async (req, res) => {
  try {
    const { rest_id } = req.body;
    let data = await Users.restore({
      where: {
        id: rest_id,
      },
    });

    let response = {
      data: data,
    };
    res.status(200).json(response);
  } catch (e) {
    let data = "Bad request";
    let response = {
      data: data,
    };
    res.status(400).json(response);
  }
};
//one to one relationship
const oneRelationShip = async (req, res) => {
  //add user by relationship
  const { name, email, phone, address } = req.body;
  let data = await Users.create({
    name: name,
    email: email,
  });

  if (data && data.id) {
    await contact.create({
      phone: phone,
      p_address: address,
      user_id: data.id,
    });
  }

  //get user information by relationship

  // let data = await Users.findAll({
  //   attributes: ["name", "email"],
  //   include: [
  //     {
  //       model: contact,
  //       attributes: ["phone", "p_address", "user_id"],
  //     },
  //   ],
  // });

  let response = {
    data: data,
    success: "Done",
  };
  res.status(200).json(response);
};
//one to many relationships search results
const oneTomanyRelationShip = async (req, res) => {
  const { search } = req.body;
  let data = await contact.findAll({
    where: {
      [Op.or]: {
        phone: { [Op.like]: `%${search}%` },
        p_address: { [Op.like]: `%${search}%` },
      },
    },
    include: [
      {
        model: Users,
        attributes: ["name"],
      },
    ],
  });

  let response = {
    // name: data[0].User.name ,
    data: data,
  };
  res.status(200).json(response);
};
//update one to many Relationship
const UpdatedRelationOnetoMany = async (req, res) => {
  const { email, name, address, phone } = req.body;
  let some = await Users.findOne({
    where: {
      email: email,
    },
  });

  if (some.dataValues) {
    let data = await Users.update(
      { name: name, email: email, updatedAt: new Date().toLocaleTimeString() },
      {
        where: {
          email: email,
        },
      }
    );
    let ddate = await contact.update(
      {
        p_address: address,
        phone: phone,
        updatedAt: new Date().toLocaleTimeString(),
      },
      { where: { user_id: some.dataValues.id } }
    );
    let response = {
      data: "Updated",
    };
    res.status(200).json(response);
  } else {
    let response = {
      data: "Enter Valid Address",
    };
    res.status(200).json(response);
  }
};

const manyToMany = async (req, res) => {


}
module.exports = {
  restore_user,
  delete_user,
  addUserMtd,
  Count,
  updateAPI,
  getAllData,
  findParticular,
  pagination,
  oneRelationShip,
  oneTomanyRelationShip,
  UpdatedRelationOnetoMany,
  manyToMany
};
