const express = require("express");
const path = require("path");
const QRCode = require("qrcode");

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index", { qrCode: null });
});

app.post("/generate", async (req, res) => {
  const inputText = req.body.text;
  if (!inputText) return res.render("index", { qrCode: null });

  try {
    const qrCode = await QRCode.toDataURL(inputText);
    res.render("index", { qrCode });
  } catch (err) {
    res.send("Error occurred: " + err);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
