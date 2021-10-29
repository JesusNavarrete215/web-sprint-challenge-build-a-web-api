// Write your "projects" router here!
const express = require("express");
const Projects = require("./projects-model");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const project = await Projects.get();
    if (!project) {
      res.json([]);
    } else {
      res.json(project);
    }
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const project = await Projects.get(req.params.id);
    if (!project) {
      res
        .status(404)
        .json({ message: "The project with the specific ID does not exist" });
    } else {
      res.json(project);
    }
  } catch (err) {
    next(err);
  }
});


router.post("/", (req, res, next) => {
  const { name, description } = req.body;
  if (!name || !description) {
    res
      .status(400)
      .json({ message: "Please provide the name and description" });
  } else {
    Projects.insert(req.body)
    .then(
      (project) => {
        res.status(201).json(project);
      }
    )
    .catch(next)
  }
});


router.put("/:id", (req, res) => {});
router.delete("/:id", (req, res) => {});
router.get("/:id/actions", (req, res) => {});

module.exports = router;
