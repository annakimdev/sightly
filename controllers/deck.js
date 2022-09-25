const cloudinary = require("../middleware/cloudinary");
const Deck = require("../models/Deck");
const User = require("../models/User");

module.exports = {
  getMyDeck: async (req, res) => {
    try {
      const decks = await Deck.find({ user: req.user.id });
      res.render("mydeck.ejs", { decks: decks, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getExplore: async (req, res) => {
    try {
        const decks = await Deck.find().sort({ createdAt: "desc" }).lean();
        res.render("explore.ejs", { decks: decks });
    } catch (error) {
        console.log(err);
    }
  },
  getDeck: async (req, res) => {
    try {
        const deck = await Deck.findById(req.params.id);
        res.render("deck.ejs", { deck: deck, user: req.user });
    } catch (err) {
        console.log(err);
    }
  },
  
  getAddDeck: async (req, res) => {
    res.render("addDeck.ejs", { user: req.user });
  },

  createDeck: async (req, res) => {
    try {
      // Upload image to cloudinary
      // const result = await cloudinary.uploader.upload(req.file.path);

      // 9/25 create new deck but title, grade, and words are not in DB. Next action steps: Fix Deck collection issue and add back in cloudinary.
      await Deck.create({
        title: req.body.title,
        // image: result.secure_url,
        // cloudinaryId: result.public_id,
        grade: req.body.grade,
        words: req.body.words,
        likes: 0,
        user: req.user.id,
      });
      console.log("Deck has been added!");
      res.redirect("/deck");
    } catch (err) {
      console.log(err);
    }
  },
  
  likeDeck: async (req, res) => {
    try {
      await Deck.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/deck/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deleteDeck: async (req, res) => {
    try {
      // Find post by id
      let deck = await Deck.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(deck.cloudinaryId);
      // Delete post from db
      await Deck.remove({ _id: req.params.id });
      console.log("Deleted Deck");
      res.redirect("/");
    } catch (err) {
      res.redirect("/");
    }
  },
};
