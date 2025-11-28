import express from "express";
const adminRouter = express.Router();

// test route
adminRouter.get("/test", (req, res) => {
  res.send("Admin Router Working");
});

export default adminRouter;
