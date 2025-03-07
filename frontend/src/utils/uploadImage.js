import axiosInstance from "./axiosInstance";

const uploadImage = async (image) => {
    try {
        let response;

        if (typeof image === "string") {
            response = await axiosInstance.post('/image-upload-url', { imageUrl: image });
        } else {
            const formData = new FormData();
            formData.append('image', image);

            response = await axiosInstance.post('/image-upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        }

        return response.data;
    } catch (error) {
        console.log("Error uploading the image", error);
        throw error;
    }
};

export default uploadImage;
