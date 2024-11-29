import Course from '../models/Course.js';

// Enroll in a course (student only)
export const enrollInCourse = async (req, res) => {
    try {
        // Find the course by ID
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Check if the user is already enrolled in the course
        if (course.students.includes(req.user._id)) {
            return res.status(400).json({ message: 'Already enrolled in this course' });
        }

        // Add the user's ID to the course students list
        course.students.push(req.user._id);

        // Save the course with the new student
        await course.save();

        // Respond with a success message
        res.status(200).json({ message: 'Enrolled in the course successfully' });
    } catch (error) {
        // Handle unexpected errors
        console.error(error);
        res.status(500).json({ message: 'Error enrolling in the course' });
    }
};
