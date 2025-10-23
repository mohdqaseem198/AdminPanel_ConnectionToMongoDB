const { Schema, default: mongoose } = require("mongoose");

const ImageSchema = new mongoose.Schema({
    public_id : {type : String},
    url : {type : String, require : true},
    original_filename: String,
    created_at: Date,
    ImgName : {type : String},
});

const ImageModel = 
mongoose.models.Image || mongoose.model("Image", ImageSchema);

export default ImageModel;