import express from 'express';
import { addProfilePicture, deleteUser, employerRegistration, getAllUsers, getProfileById, getProfileContactById, jobSeekerRegistration, login, logout, updateProfilePicture, updateUser, updateUserPassword, uploadProfilePicture } from '../controllers/userController.js';
import { addRole, checkRole, verifyToken } from '../middlewares/authMiddleware.js';
import jwt from 'jsonwebtoken';

import { generateAndSendOTP, updatePassword, verifyOtpForPassword } from '../controllers/password_forget.js';

const router = express.Router();

router
    .route("/jobSeekerRegistration")
    .post(jobSeekerRegistration);
router
    .route("/employerRegistration")
    .post(employerRegistration);
router
    .route("/login")
    .post(login);
router
    .route("/logout")
    .post(logout);

router
    .route("/checkUserRole")
    .get(verifyToken, checkRole);
router
    .route("/userProfile")
    .get(verifyToken, getProfileById);
router
    .route("/userContactProfile")
    .get(verifyToken, getProfileContactById);
router
    .route("/updateProfilePicture")
    .put(verifyToken, updateProfilePicture);






// Forget password routes
router.route("/generateAndSendOTP").post(generateAndSendOTP);

router.route("/verifyOtpForPassword").post(verifyOtpForPassword);

router.route("/updatePassword").post(updatePassword);







// admin
router
    .route("/readAllUsers")
    .get(verifyToken, addRole(['admin']), getAllUsers);
router
    .route("/deleteUser/:userId")
    .delete(verifyToken, addRole(['admin']), deleteUser);


// update routes
router.put('/profile-picture', verifyToken, uploadProfilePicture, addProfilePicture);
router.put('/updateUser', verifyToken, updateUser);
router.post('/updateUserPassword', verifyToken, updateUserPassword);


// router.get('/checkUserRole', verifyToken, async (req, res) => {
//     try {
//         const userRole = req.user.role; // Assuming user is authenticated and req.user contains the logged-in user
//         res.status(200).json({ role: userRole });
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// });
router.get('/protected', (req, res) => {
    const token = req.cookies.token;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

            res.status(200).json({ message: `Welcome ${decoded.name}` });
        } catch (error) {
            res.status(401).json({ message: 'Invalid token' });
        }
    } else {
        res.status(401).json({ message: 'No token provided' });
    }
});

router.get('/employer-data', verifyToken, addRole(['jobSeeker', 'admin']), (_, res) => {
    res.json({ message: 'This is employer specific data' });
});
router.get('/employer-dataa', verifyToken, checkRole);
export default router;
