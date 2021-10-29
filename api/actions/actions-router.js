
const express = require("express");
const Actions = require("./actions-model");
const router = express.Router();
const { actionHandleError } = require("./actions-middlware");

router.get("/", async (req, res, next) => {
  try {
    const action = await Actions.get();
    if (!action) {
      res.json([]);
    } else {
      res.json(action);
    }
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const action = await Actions.get(req.params.id);
    if (!action) {
      res
        .status(404)
        .json({ message: "The project with the specific ID does not exist" });
    } else {
      res.json(action);
    }
  } catch (err) {
    next(err);
  }
});
router.post("/", async (req, res, next) => {
  const { project_id, description, notes } = req.body;
  if (!project_id || !description || !notes) {
    res.status(400).json({
      message: "Please provide the project ID, notes,  and description",
    });
  } else {
    Actions.insert(req.body)
      .then((action) => {
        res.status(201).json(action);
      })
      .catch(next);
  }
});
router.put("/:id", (req, res, next) => {
  const { project_id, description, notes } = req.body;
  if (!project_id || !description) {
    res.status(400).json({ message: "Please provide name and description" });
  } else if (!req.params.id) {
    res
      .status(404)
      .json({ message: "The post with teh specified ID does not exist " });
  } else {
    Actions.update(req.params.id, req.body)
      .then(() => {
        return Actions.get(req.params.id);
      })
      .then((action) => {
        res.json(action);
      })
      .catch(next);
  }
});
router.delete("/:id", async (req, res, next) => {
  try {
    const action = await Actions.get(req.params.id);
    if (!action) {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist" });
    } else {
      await Actions.remove(req.params.id);
      res.json(action);
    }
  } catch (err) {
    next(err);
  }
});

router.use(actionHandleError);

module.exports = router;
