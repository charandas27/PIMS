import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    gpa:{
        type: Number,
        required: true
    },
    id: {
        type: String,
        required: true
    }
});

const Student = mongoose.model('student_dets', studentSchema);
export default Student;
