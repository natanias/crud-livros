const crypto = require("crypto");
const connection = require("../database/connection");

module.exports = {
  async list(req, res) {
    const users = await connection("users").select("*");
    res.json(users);
  },
  async show(req, res) {
    try {
      const { id } = req.params;
      const user = await connection("users").where("id", id).select("*");

      if (user == "" || user == undefined || user == null) {
        return res.status(404).json({ message: "Error" });
      }
      return res.json(user);
    } catch (error) {
      return res.status(404).json({ message: "Error" });
    }
  },
  async create(req, res) {
    try {
      const { title, author } = req.body;
      const id = crypto.randomBytes(4).toString("HEX");

      if (!title) {
        return res.status(404).json({ message: "Error" });
      }

      if (!author) {
        return res.status(404).json({ message: "Error" });
      }

      await connection("users").insert({
        id,
        title,
        author,
      });

      return res.json({ id });
    } catch (error) {
      return res.status(404).json({ message: "Error" });
    }
  },
  async update(req, res) {
    try {
      const { id } = req.params;
      const { title, author } = req.body;

      if (title || typeof title == undefined || title == null) {
        return res.status(404).json({ message: "Error" });
      }

      if (author || typeof author == undefined || author == null) {
        return res.status(404).json({ message: "Error" });
      }
      if (!id) {
        return res.status(404).json({ message: "Error" });
      }

      await connection("users").where("id", id).update({
        id,
        title,
        author,
      });

      return res.status(204).send();
    } catch (error) {
      return res.status(404).json({ message: "Error" });
    }
  },
  async delete(req, res) {
    try {
      const { id } = req.params;
      await connection("users").where("id", id).delete();

      return res.status(204).send();
    } catch (error) {
      res.status(404).json({ error: "Error", message: error.message });
    }
  },
};
