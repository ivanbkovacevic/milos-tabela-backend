import {
    Schema,
    model,
} from 'mongoose';

// Define a schema for your document
const projectSchema = new Schema({
    name: String,
    productImg: String,
    productPage: Array,
    articlePage: Array,
    email: String,
    pageLink: String,
}, );

// Create a Mongoose model based on the schema
const ProjectModel = model('Project', projectSchema);

// Export the model to use in other parts of your application
export default ProjectModel;