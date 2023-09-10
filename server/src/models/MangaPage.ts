import mongoose from "mongoose";

const Schema = mongoose.Schema;
// const ObjectId = mongoose.Types.ObjectId;


const ImageSchema = new Schema({
  title: String,
  size: Number,
  type: String,
  extension: String,
  path: String,
});

const MangaPageModel = mongoose.model("MangaPage", ImageSchema);

export default MangaPageModel;
