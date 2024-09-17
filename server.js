const express = require("express");
const admin = require("./firebase"); // Import the initialized admin SDK
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(bodyParser.json());

// Basic route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Route to send a message
app.post("/send-message", async (req, res) => {
  const { token, title, body, customData, badge } = req.body; // Add 'badge' to destructuring
  console.log(token);

  const message = {
    // Setting the notification content for iOS
    apns: {
      payload: {
        aps: {
          alert: {
            title: title,
            body: body,
          },
          badge: badge, // Set badge count dynamically
          sound: "default", // Notification sound
          "content-available": 1, // Silent notification flag
        },
        customData: customData, // Your custom data
      },
    },
    token: token,
  };

  try {
    const response = await admin.messaging().send(message);
    res.status(200).send(`Message sent: ${response}`);
  } catch (error) {
    res.status(500).send(`Error sending message: ${error}`);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// FOR ANDROID
// {
//   "type": "service_account",
//   "project_id": "citushealthandroid",
//   "private_key_id": "54c346c3cfeff088a635e6541e6bd6b9b3b6f83c",
//   "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDVP44RtBQwQj3j\neHtN31/f6eRTvdwzu3315p4XGkNw6n1YutuerQNWMLgrW5qD0iIdFmTIBfDc/Vua\nlCWvoLNgtEUptRMMD88Mzw3BCNQFvI5LxQCIBg3b4lLdiy1mTgk+lNQHnJlMG3bx\nUqKYFVmCqy0PHfIYjmSRKSGaHZ6YA6jefmxJ37tRErI7QHubDVXWeuI/9EL6dKv5\n+NhJZ3Nea1AVAKwHqIuvNjNenp4PWowwM01hD4bjQJu92tk16tACBZO3tqMm4i6P\n05Kqnpe6e0qzPAHlY0I7BZGHMBHwR9xwkJpK9tSF0+skji3maSLG5uVSSEGKfyNS\nvym+kDp9AgMBAAECggEAPEXb5mYTJLa8XlxR4adGpnep2P97S0XtqsCVo2sBb9tf\nNWKPK5C0NjrL+zlHeYW9raIEN0LymsujhhPkePj/alBZkhnDee/H8lNdjFdt8fci\n8wiKB2hKp4EXMdYiLV3WIBGZwlMBQzEqE7hrC3hRVe0C7dhlcopgo2TQQgqoJkex\n8oJWNplXrH2aLT/++OctjQtaVzTl001G0vTT//LFds83k1Qd4mmcRPxFgrEi27zX\nDJGX0HYV+DBicHfRhA9OjkHE+jzDCMHj7naePlTeGinYvG0SDkJfALG6zoIeP2iy\nW+GcaWhAKzVrMVCRvHlk+ewn5Ey9+gsSNrot5flMkwKBgQD+yD1QDaPdw3qW6k+b\nkyeLjTHfqvZsa1qNPL2bYNm4pMBWTev9KqdtC80BnqKk+3Ynxt8CzcO5aw1KIeMM\nkF5RfXlhVv8oyxIHLUVkVvwz34zXTNIqWICnp4AcW4vxmRrQOAlLcqunzh32V1BD\nybBXAdESzk+Q8KnZgd+UWCa4PwKBgQDWRH46OCKnSkIIG6eI43HN2Uz/sxwMfy39\n7Tab1gtl/7hq4dkYDlQ7etyUdjkwb8RDVXexjnQW9kVmnjzjIIYtPyiOZKUwolNB\n4Wd3rbTcncxSrwVeaTdOAQs5ZPuFsrci5FQyUAtNnguYUfDKKn+2RJ3yoKdRsW49\notituoF+QwKBgGzObwDFEnoehTf2ENFL4tOCFQ6EIIDkx+MRUZgNoG1uToWM+X9A\nvAehxocujB8RFMCf+ZVk8nU49o/2MNSowt7iSvf7AzUUpDpUZxIW49XzXl6D/C0B\nZtAyhE+X+QfQbtcFV1LVQeGD8N/HIgwREjHWIMd7PBeV77Nn92eOzdpZAoGBAJH5\nB6XSKImf5WxwqqpviVCcAgERnMJGwqaDvPhd0lYi6Rin1Ka23FvJUA00nbGJ80OM\nLocgbaZXEODgXMq/lamtpYuctY10iRQQ49R82wKR3mlWI2o2dB8IRwVK7rAfGPUE\naPf94DV4vp1+9XRFj8w04wYwvMzC/D+xebyhmybRAoGAPsuLpX8Sj0Tzo+3UXULw\nbf0RYnu8tuxjCeCkVkyzidr06Z8x0ubw6Ho9UlMnDu/oqFA6mQetiqgiq7xvW8Gx\ntfLcUsDn85MdWyF/hY0+XqdnFuAzsAwZLUGVAs6DvA//I8hCC7tmBP2KOKEFHgyR\ni9kYvzGeDlhDCHMH5EtDdCc=\n-----END PRIVATE KEY-----\n",
//   "client_email": "firebase-adminsdk-l085i@citushealthandroid.iam.gserviceaccount.com",
//   "client_id": "115701480079697446367",
//   "auth_uri": "https://accounts.google.com/o/oauth2/auth",
//   "token_uri": "https://oauth2.googleapis.com/token",
//   "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
//   "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-l085i%40citushealthandroid.iam.gserviceaccount.com",
//   "universe_domain": "googleapis.com"
// }

// const express = require("express");
// const admin = require("./firebase"); // Import the initialized admin SDK
// const bodyParser = require("body-parser");

// const app = express();
// const port = 3000;

// // Middleware to parse JSON bodies
// app.use(express.json());
// app.use(bodyParser.json());

// // Basic route
// app.get("/", (req, res) => {
//   res.send("Hello, World!");
// });

// // Route to send a message
// app.post("/send-message", async (req, res) => {
//   const { token, id, data, body } = req.body; // Destructuring to include 'id'

//   const message = {
//     token: token,
//     notification: {
//       title: "[Reminder]", // Static title as per JSON example
//       body: body,
//     },
//     android: {
//       priority: "high",
//       notification: {
//         sound: data.soundname,
//         channel_id: data.android_channel_id,
//       },
//     },
//     apns: {
//       payload: {
//         aps: {
//           alert: {
//             title: "[Reminder]", // Static title as per JSON example
//             body: body,
//           },
//           badge: parseInt(data.badge, 10), // Convert badge to an integer
//           sound: data.soundname,
//           "content-available": 1, // Silent notification flag
//         },
//         "user-data": data["user-data"], // Custom user data
//       },
//     },
//     data: {
//       id: id, // Include the 'id' field in the data payload
//       priority: data.priority,
//       "user-data": data["user-data"],
//     },
//   };

//   try {
//     const response = await admin.messaging().send(message);
//     res.status(200).send(`Message sent: ${response}`);
//   } catch (error) {
//     res.status(500).send(`Error sending message: ${error.message}`);
//   }
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

// {
//   "type": "service_account",
//   "project_id": "citushealthandroid",
//   "private_key_id": "54c346c3cfeff088a635e6541e6bd6b9b3b6f83c",
//   "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDVP44RtBQwQj3j\neHtN31/f6eRTvdwzu3315p4XGkNw6n1YutuerQNWMLgrW5qD0iIdFmTIBfDc/Vua\nlCWvoLNgtEUptRMMD88Mzw3BCNQFvI5LxQCIBg3b4lLdiy1mTgk+lNQHnJlMG3bx\nUqKYFVmCqy0PHfIYjmSRKSGaHZ6YA6jefmxJ37tRErI7QHubDVXWeuI/9EL6dKv5\n+NhJZ3Nea1AVAKwHqIuvNjNenp4PWowwM01hD4bjQJu92tk16tACBZO3tqMm4i6P\n05Kqnpe6e0qzPAHlY0I7BZGHMBHwR9xwkJpK9tSF0+skji3maSLG5uVSSEGKfyNS\nvym+kDp9AgMBAAECggEAPEXb5mYTJLa8XlxR4adGpnep2P97S0XtqsCVo2sBb9tf\nNWKPK5C0NjrL+zlHeYW9raIEN0LymsujhhPkePj/alBZkhnDee/H8lNdjFdt8fci\n8wiKB2hKp4EXMdYiLV3WIBGZwlMBQzEqE7hrC3hRVe0C7dhlcopgo2TQQgqoJkex\n8oJWNplXrH2aLT/++OctjQtaVzTl001G0vTT//LFds83k1Qd4mmcRPxFgrEi27zX\nDJGX0HYV+DBicHfRhA9OjkHE+jzDCMHj7naePlTeGinYvG0SDkJfALG6zoIeP2iy\nW+GcaWhAKzVrMVCRvHlk+ewn5Ey9+gsSNrot5flMkwKBgQD+yD1QDaPdw3qW6k+b\nkyeLjTHfqvZsa1qNPL2bYNm4pMBWTev9KqdtC80BnqKk+3Ynxt8CzcO5aw1KIeMM\nkF5RfXlhVv8oyxIHLUVkVvwz34zXTNIqWICnp4AcW4vxmRrQOAlLcqunzh32V1BD\nybBXAdESzk+Q8KnZgd+UWCa4PwKBgQDWRH46OCKnSkIIG6eI43HN2Uz/sxwMfy39\n7Tab1gtl/7hq4dkYDlQ7etyUdjkwb8RDVXexjnQW9kVmnjzjIIYtPyiOZKUwolNB\n4Wd3rbTcncxSrwVeaTdOAQs5ZPuFsrci5FQyUAtNnguYUfDKKn+2RJ3yoKdRsW49\notituoF+QwKBgGzObwDFEnoehTf2ENFL4tOCFQ6EIIDkx+MRUZgNoG1uToWM+X9A\nvAehxocujB8RFMCf+ZVk8nU49o/2MNSowt7iSvf7AzUUpDpUZxIW49XzXl6D/C0B\nZtAyhE+X+QfQbtcFV1LVQeGD8N/HIgwREjHWIMd7PBeV77Nn92eOzdpZAoGBAJH5\nB6XSKImf5WxwqqpviVCcAgERnMJGwqaDvPhd0lYi6Rin1Ka23FvJUA00nbGJ80OM\nLocgbaZXEODgXMq/lamtpYuctY10iRQQ49R82wKR3mlWI2o2dB8IRwVK7rAfGPUE\naPf94DV4vp1+9XRFj8w04wYwvMzC/D+xebyhmybRAoGAPsuLpX8Sj0Tzo+3UXULw\nbf0RYnu8tuxjCeCkVkyzidr06Z8x0ubw6Ho9UlMnDu/oqFA6mQetiqgiq7xvW8Gx\ntfLcUsDn85MdWyF/hY0+XqdnFuAzsAwZLUGVAs6DvA//I8hCC7tmBP2KOKEFHgyR\ni9kYvzGeDlhDCHMH5EtDdCc=\n-----END PRIVATE KEY-----\n",
//   "client_email": "firebase-adminsdk-l085i@citushealthandroid.iam.gserviceaccount.com",
//   "client_id": "115701480079697446367",
//   "auth_uri": "https://accounts.google.com/o/oauth2/auth",
//   "token_uri": "https://oauth2.googleapis.com/token",
//   "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
//   "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-l085i%40citushealthandroid.iam.gserviceaccount.com",
//   "universe_domain": "googleapis.com"
// }
