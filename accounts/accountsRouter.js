const express = require("express");

const AccountsDb = require("../data/dbConfig");

const router = express.Router();

// Fetch all
router.get("/", async (req, res) => {
  try {
    const result = await AccountsDb("accounts");

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Error fetching accounts resource" });
  }
});

// Fetch by id
router.get("/:accountId", async (req, res) => {
  try {
    const result = await AccountsDb("accounts").where({
      id: req.params.accountId,
    });

    res.status(200).json(result[0]);
  } catch (err) {
    res.status(500).json({ message: "Error fetching account" });
  }
});

router.post("/", async (req, res) => {
  const { name, budget } = req.body;

  try {
    if (!name && !budget) {
      return res.status(400).json({ message: "missing required data" });
    }

    const result = await AccountsDb("accounts").insert({ name, budget });

    return res.status(200).json(result);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating new account: " + err.message });
  }
});

// Update
router.put("/:accountId", async (req, res) => {
  const { name, budget } = req.body;

  try {
    const affectedRows = await AccountsDb("accounts")
      .where({
        id: req.params.accountId,
      })
      .update({ name, budget });

    res.status(200).json(affectedRows + " rows updated");
  } catch (err) {
    res.status(500).json({ message: "Error updating account" });
  }
});

// Delete
router.delete("/:accountId", async (req, res) => {
  try {
    const affectedRows = await AccountsDb("accounts")
      .where({
        id: req.params.accountId,
      })
      .delete();

    res.status(200).json(affectedRows + " rows updated");
  } catch (err) {
    res.status(500).json({ message: "Error deleting account" });
  }
});

module.exports = router;
