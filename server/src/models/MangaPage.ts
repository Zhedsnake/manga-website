import mongoose from "mongoose";

const Schema = mongoose.Schema;
// const ObjectId = mongoose.Types.ObjectId;


const ImageSchema = new Schema({
  
});

const MangaPageModel = mongoose.model("MangaPage", ImageSchema);

export default MangaPageModel;
