import Course from '../models/Course.js';
import mongoose from 'mongoose';

// Create a course (instructor or admin)
export const createCourse = async (req, res) => {
    const { title, description, students } = req.body;  // Include students

    // Ensure title and description are provided
    if (!title || !description) {
        return res.status(400).json({ message: 'Title and description are required' });
    }

    // Ensure req.user.id is defined
    if (!req.user || !req.user.id) {
        return res.status(400).json({ message: 'Instructor ID is required' });
    }

    // Create a new course instance
    const course = new Course({
        title,
        description,
        instructor: req.user.id,  // Use req.user.id for the instructor
        students: students || [],  // Add students if provided, otherwise default to an empty array
    });

    try {
        await course.save();
        res.status(201).json(course);
    } catch (error) {
        console.error('Error creating course:', error);
        res.status(500).json({ message: 'Error creating course', error: error.message });
    }
};


// Example controller function to add a student to a course
export const addStudentToCourse = async (req, res) => {
    const { courseId, studentId } = req.body;

    try {
        // Find the course and add the student to the course's students array
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Add the student to the course's students array if not already added
        if (!course.students.includes(studentId)) {
            course.students.push(studentId);
            await course.save();
            res.status(200).json(course);
        } else {
            res.status(400).json({ message: 'Student is already enrolled in this course' });
        }
    } catch (error) {
        console.error('Error adding student to course:', error);
        res.status(500).json({ message: 'Error adding student to course', error: error.message });
    }
};


// Get all courses (public)
export const getCourses = async (req, res) => {
    try {
        // Populate 'instructor' and 'students' fields with their names
        const courses = await Course.find()
            .populate('instructor', 'name')  // Populate instructor with name
            .populate('students', 'name');  // Populate students with name

        res.json(courses);
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).json({ message: 'Error fetching courses', error: error.message });
    }
};


// Update a course (instructor or admin)
export const updateCourse = async (req, res) => {
    const course = await Course.findById(req.params.id);
    
    if (!course) {
        return res.status(404).json({ message: 'Course not found' });
    }

    console.log('Logged-in user:', req.user);
    console.log('Course instructor ID:', course.instructor);

    // Check if the user has the required role
    if (!['moderator', 'admin'].includes(req.user.role) && !course.instructor.equals(new mongoose.Types.ObjectId(req.user._id))) {
        return res.status(403).json({ message: 'Forbidden: Not your course or insufficient permissions' });
    }

    // Update the course
    Object.assign(course, req.body);
    await course.save();
    res.json(course);
};


// Delete a course (admin only)
export const deleteCourse = async (req, res) => {
    try {
        // Find the course by ID
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Check if the user is an admin or the instructor of the course
        if (req.user.role !== 'admin' && !course.instructor.equals(new mongoose.Types.ObjectId(req.user._id))) {
            return res.status(403).json({ message: 'Forbidden: Not authorized to delete this course' });
        }

        // Delete the course
        await Course.findByIdAndDelete(req.params.id);
        res.json({ message: 'Course deleted successfully' });
    } catch (error) {
        console.error('Error deleting course:', error);
        res.status(500).json({ message: 'Error deleting course', error: error.message });
    }
};
