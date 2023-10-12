// @ts-check
import { isValidObjectId } from 'mongoose';

function checkId(req, res, next) {
  if (!isValidObjectId(req.params.id)) {
    res.status(404).json({ message: "Invalid ObjectId" });
  }
  next();
}

export default checkId;
