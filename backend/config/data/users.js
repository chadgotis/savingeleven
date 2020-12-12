import bcrypt from "bcryptjs";

const users = [
  {
    name: "Administrator",
    email: "admin@admin.com",
    password: bcrypt.hashSync("admin123", 10),
    isAdmin: true,
  },
  {
    name: "Sample User 1",
    email: "sample1@sample.com",
    password: bcrypt.hashSync("12345", 10),
  },
  {
    name: "Sample User 2",
    email: "sample2@sample.com",
    password: bcrypt.hashSync("12345", 10),
  },
];

export default users;
