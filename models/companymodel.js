import mongoose from 'mongoose';
const companySchema = new mongoose.Schema({
    companyname : {
        type: String,
        required: true
    },
    required_cgpa : {
        type: Number,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    }
});

const company = mongoose.model('company_dets',companySchema);
export default company;