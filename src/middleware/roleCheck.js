export function RoleCheck(role) {
  try {
    return (req, res, next) => {
      if (req.body.role === role) {
        next();
      } else {
        res.status(401);
        res.send("unauthorised user");
      }
    };
  } catch (error) {
    res.status(500);
    res.send("un authorised user");
  }
}
