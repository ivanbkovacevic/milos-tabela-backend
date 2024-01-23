import {
    Schema,
    model,
} from 'mongoose';

const imageSchema = new Schema({
    filename: String,
    contentType: String,
    image: Buffer, // Binary data for the image
  });
  
  const ImageModel = model('Image', imageSchema);
  
  export default ImageModel;