export const getPrivateData = (req, res, next) => {
  res.status(200).send({
    success: true,
    data: "You got an access to the private data in this route",
  });
};
