import { dashBoardHome } from "./../models/dashboardHome.js";
const getAllHome = async (req, res, next) => {
  try {
    const home = await dashBoardHome.find({});
    res.send(home);
  } catch (error) {
    res.send({ msg: "An Error Occured" });
  }
};
const getHomeById = async (req, res, next) => {
  try {
    const home = await dashBoardHome.findById({
      _id: req.params.id,
    });
    res.send(home);
  } catch (error) {
    res.send({ msg: "An Error Occured" });
  }
};

const createHome = async (req, res, next) => {
  try {
    const {
      image,
      title,
      summary,
      logo,
      logoName,
      followSize,
      followText,
      saveText,
      landingUrl,
      comment,
    } = req.body;
    //const home = await dashBoardHome.insertMany({
    //   image,
    //   title,
    //   logo,
    //   logoName,
    //   followSize,
    //   followText,
    //   saveText,
    //   landingUrl,
    //   comment,
    // });
    //home.save();
    let home = await dashBoardHome.insertMany(req.body);
    home.save();
    res.send(home);
  } catch (error) {
    res.send({ msg: "An Error Occured" });
  }
};

const updateHomeById = async (req, res, next) => {
  try {
    const {
      _id,
      image,
      title,
      summary,
      logo,
      logoName,
      followSize,
      followText,
      saveText,
      landingUrl,
      comment,
    } = req.body;
    let updateData = {
      image,
      title,
      summary,
      logo,
      logoName,
      followSize,
      followText,
      saveText,
      landingUrl,
      comment,
    };
    const home = await dashBoardHome.findOneAndUpdate(_id, {
      $set: updateData,
    });
    res.send(home);
  } catch (error) {
    res.send({ msg: "An Error Occured" });
  }
};

const deleteHome = async (req, res, next) => {
  try {
    const { _id } = req.body;
    const home = await dashBoardHome.findOneAndDelete(_id);
    res.send(home);
  } catch (error) {
    res.send({ msg: "An Error Occured" });
  }
};

export const dbHomeDatacrud = {
  getAllHome,
  getHomeById,
  createHome,
  updateHomeById,
  deleteHome,
};
