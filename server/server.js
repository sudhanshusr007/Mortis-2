import app from "./app.js";
import cloudinary from "cloudinary";
import userStatusRouter from './router/userStatusRouter.js';

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const port = process.env.PORT || 3000;

app.use('/api/user', userStatusRouter);

app.listen(port, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
});
const port = process.env.PORT || 3000;

app.use('/api/user', userStatusRouter);

app.listen(port, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
});
);
