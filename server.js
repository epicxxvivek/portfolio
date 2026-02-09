const express = require("express");
const cors = require("cors");
const fs = require("fs").promises;
const path = require("path");

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const DATA_FILE = path.join(__dirname, "collabs.json");

async function readData() {
  try {
    const txt = await fs.readFile(DATA_FILE, "utf8");
    return JSON.parse(txt || "[]");
  } catch (err) {
    if (err.code === "ENOENT") return [];
    throw err;
  }
}

async function writeData(arr) {
  await fs.writeFile(DATA_FILE, JSON.stringify(arr, null, 2), "utf8");
}

app.post("/book", async (req, res) => {
  const { name, email, time, message } = req.body;
  if (!name || !email) return res.status(400).json({ error: "name and email required" });

  const entry = {
    id: Date.now(),
    name,
    email,
    time: time || null,
    message: message || "",
    createdAt: new Date().toISOString(),
  };

  try {
    const arr = await readData();
    arr.push(entry);
    await writeData(arr);
    console.log("New Meeting Request", entry);
    res.json({ status: "ok", entry });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "internal" });
  }
});

app.get("/collabs", async (req, res) => {
  try {
    const arr = await readData();
    res.json(arr);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "internal" });
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
