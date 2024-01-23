import {
    Schema,
    model,
} from 'mongoose';

// Define a schema for your document
const projectsSchema = new Schema(  {
    name: String,
    productPage: Array,
    articlePage: Array,
    email: String,
    pageLink: String,
    productImg: String,
  },);

// Create a Mongoose model based on the schema
const ProjectsModel = model('Employee', projectsSchema);

// Export the model to use in other parts of your application
export default ProjectsModel;