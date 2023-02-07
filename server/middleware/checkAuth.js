const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  let token = req.header("authorization");
  //   const token = req.header("x-auth-token");

 
  if (!token) {
    return res.status(401).json({
      data: "",
      error: [
        {
          msg: "unauthorized (access denied)",
        },
      ],
    });
  }
  token = token.split(" ")[1];

  try {
    let user = await JWT.verify(token, process.env.JWT_SECRET);
    req.user = user.email;
    // return res.status(200).json({ msg: "success" });
    next();
  } catch (error) {
    return res.status(401).json({
      data: "",
      error: [
        {
          msg: "unauthorized; not verified (access denied)",
        },
      ],
    });
  }
};
