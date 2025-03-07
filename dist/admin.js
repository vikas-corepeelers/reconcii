const express = require("express");
const path = require("path");

const app = express();
const PORT = 3001;

// Serve static files from the dist folder
app.use(express.static(path.join(__dirname)));

// Redirect all requests to index.html (for React apps with routing)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
