const { nanoid } = require("nanoid");
const URL = require("../models/url");


async function handleGenrateNewShortUrl(req, res) {
  const body = req.body;
  if (!body.redirectUrl) {
    return res.status(400).json({ error: "Redirect URL is required" });
  }
  const shortID = nanoid(8); // Generate a unique short ID

  await URL.create({
    shortID: shortID,
    redirectUrl: body.redirectUrl,
    visitHistory: [],
  });

  return res.status(201).json({ shortID: shortID });
}

async function handleGetAnalytics(req, res) {
  const shortID = req.params.shortID;
  const result = await URL.findOne({ shortID });
  return res.json({ totalClicks: result.visitHistory.length, analytics: result.visitHistory });
}

async function handleGetUrl(req, res) {
  try {
    const shortID = req.params.shortID;

    const entry = await URL.findOneAndUpdate(
      { shortID },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        },
      },
      { new: true } // Return the updated document
    );
    if (!entry) {
      return res.status(404).json({ message: "Short URL not found" });
    }
    let redirectUrl = entry.redirectUrl;
    if (!/^https?:\/\//i.test(redirectUrl)) {
      redirectUrl = 'http://' + redirectUrl;
    }
    res.redirect(redirectUrl);
  } catch (error) {
    console.error("Error in handleGetUrl:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = {
  handleGenrateNewShortUrl,
  handleGetUrl,
  handleGetAnalytics,
};
