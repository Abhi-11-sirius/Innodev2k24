
const jwt = require('jsonwebtoken');
const mailSender = require('../utils/mailSender');

const bookSessionController = async (req, res) => {
  try {
    const { date, mentorId, menteeId } = req.body;

    // Parse and create expiration date (1 hour after the meeting time)
    const meetingDate = new Date(date);
    const expirationDate = new Date(meetingDate.getTime() + 60 * 60 * 1000); // 1 hour after meeting

    // Create token payload and generate token
    const tokenPayload = { mentorId, menteeId, exp: Math.floor(expirationDate.getTime() / 1000) };
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET); // Ensure JWT_SECRET is defined in your environment

    // Define the meeting link with the generated token
    const meetingUrl = `https://yourapp.com/join?token=${token}`;

    // Send email to mentee
    await mailSender(
      'mentee@example.com',  // Replace with actual mentee's email
      'MentorConnect Meeting Slot Confirmation',
      `<p>Hello,</p>
      <p>We are pleased to confirm your booking for a mentorship session through MentorConnect!</p>
      <p><strong>Meeting Details:</strong></p>
      <p>Date: ${meetingDate.toLocaleString()}</p>
      <p>Please join the meeting at your allotted time slot using the link below:</p>
      <a href="${meetingUrl}">Join Meeting</a>
      <p>Thank you for using MentorConnect, and we wish you a productive session!</p>
      <p>Best Regards,<br>MentorConnect Team</p>`
    );

    // Send email to mentor
    await mailSender(
      'mentor@example.com',  // Replace with actual mentor's email
      'MentorConnect Meeting Scheduled',
      `<p>Hello,</p>
      <p>Your mentorship session has been scheduled through MentorConnect!</p>
      <p><strong>Meeting Details:</strong></p>
      <p>Date: ${meetingDate.toLocaleString()}</p>
      <p>Please join the session at the scheduled time using the link below:</p>
      <a href="${meetingUrl}">Join Meeting</a>
      <p>Thank you for being part of MentorConnect and contributing to the community!</p>
      <p>Best Regards,<br>MentorConnect Team</p>`
    );

    // Send success response
    res.status(200).json({ message: 'Meeting scheduled successfully and emails sent to mentor and mentee.' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while scheduling the meeting.' });
  }
};

module.exports = bookSessionController;
