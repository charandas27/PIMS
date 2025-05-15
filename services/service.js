// Import the Student model
import Student from '../models/usermodel.js';
import company from '../models/companymodel.js';

// Define an asynchronous function to get all users
export const getAllUsers = async () => {
    try {
        // Retrieve all documents from the students collection
        const students = await Student.find();
        return students;
    } catch (error) {
        // Log any errors that occur during the database operation
        console.error('Error retrieving users:', error);
        // Optionally, you could throw an error or handle it in another way
        throw error;
    }
};

// Define an asynchronous function to get company details
export const getCompanyDetails = async () => {
    try {
        const companyDetails = await company.find();
        return companyDetails;
    } catch (error) {
        console.error('Error retrieving company details:', error);
        throw error;
    }
};

export const findUser = async (username, password) => {
    try {
        console.log('Entered findUser function');
        console.log('Finding user with username:'+ username);
        const name = username;

        const user = await Student.findOne({ name });

        if (!user) {
            console.log('User not found');
            return null; // User not found
        }

        if (user.password === password) {
            console.log('Password matches');
            return user; // User found and password matches
        } else {
            console.log('Password does not match');
            return null; // Password mismatch
        }
    } catch (error) {
        console.error('Error retrieving user:', error);
        throw error; // Rethrow the error for higher-level error handling
    }
};