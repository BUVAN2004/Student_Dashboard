const Schema = require("mongoose").Schema;
const model = require("mongoose").model;
const UserSchema = new Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    department: { type: String, required: true },
    Designation: { type: String },
  },
  { discriminatorKey: "userType" }
);

const UserModel = new model("User", UserSchema);
module.exports = UserModel;
