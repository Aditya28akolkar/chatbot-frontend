import api from "../api/axios";
export const getDocuments =
  async () => {

    const res =
      await api.get(
        "/documents"
      );

    return res.data;
};
export const uploadPdf = async (file) => {

  const formData = new FormData();

  formData.append(
    "file",
    file
  );

  const res = await api.post(
    "/upload-pdf",
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return res.data;
};