const chatmessageModel = require("../models/chatmessage");
const helper = require("../helpers/helpers");
const users = require("../models/users");

const chatmessage = {
  insertchatmessage: (req, res) => {
    const { senderId, receiverId, message, time } = req.body;
    const data = {
      senderId,
      receiverId,
      message,
      time
    };
  },
  getAllchatmessage: (req, res) => {
    chatmessageModel
      .getAllchatmessage()
      .then((result) => {
        const resultchatmessage = result;
        console.log(res.json(result));
      })
      .catch((err) => {
        console.log(err);
      });
  },
  getchatmessageById: (req, res) => {
    const id = req.params.id;
    chatmessageModel
      .getchatmessageById(id)
      .then((result) => {
        const resultchatmessage = result;
        // eror handling
        if (resultchatmessage.length === 0) {
          return helper.response(res,{ message: "cant update data" }, 404, null)
        } else {
          helper.response(
            res,
            { message: "successfull update data" },
            200,
            null
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  updatechatmessage: (req, res) => {
    const id = req.params.id;
    const { senderId, receiverId, message, time } = req.body;
    const data = {
      userId,
      senderId,
      receiverId,
      message,
      time,
    };
    chatmessageModel
      .updatechatmessage(id, data)
      .then((result) => {
        const resultchatmessage = result;
        console.log(result);
        // eror handling
        if (resultchatmessage.affectedRows === 0) {
          return helper.response(
            res,
            { message: "cant update data" },
            404,
            null
          );
        } else {
          helper.response(
            res,
            { message: "successfull update data" },
            200,
            null
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  deletechatmessage: (req, res) => {
    const id = req.params.id;
    chatmessageModel
      .deletechatmessage(id)
      .then((result) => {
        const resultchatmessage = result;
        // eror handling
        if (resultchatmessage.affectedRows === 0) {
          return helper.response(
            res,
            { message: "cant delete data" },
            404,
            null
          );
        } else {
          helper.response(
            res,
            { message: "successfull delete data" },
            200,
            null
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
};

module.exports = transaction;
