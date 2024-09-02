import express from 'express';
import { single, multiple } from '../middlewares/upload.middleware';
import { handleUpload } from '../utils/cloudinary';
import { toDataURI } from '../utils/encode';

const router = express.Router();

// router.get('/upload/single', single, (req, res) => {});
// router.get('/upload/multiple', multiple, (req, res) => {});

router.post('/upload/single', single, async (req, res) => {
  try {
    // Check apakah ada file yang diupload
    if (req.file === undefined) {
      return res.status(400).json({
        status: 400,
        message: 'No files uploaded (File is Required)',
        data: null,
      });
    }

    const dataURI = toDataURI(req.file);
    // Panggil fungsi handleUpload untuk upload file ke cloudinary dengan parameter dataURI (format base64)
    const result: any = await handleUpload(dataURI);

    // Response jika request berhasil (file telah terupload)
    res.status(200).json({
      status: 200,
      message: 'Single File Upload Success',
      result: result.secure_url,
    });
  } catch (error) {
    console.error('Error uploading file :', error);

    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/upload/multiple', multiple, async (req, res) => {
  try {
    // Check apakah ada file-file yang diupload
    if (req.files === undefined || req.files?.length === 0) {
      return res.status(400).json({
        status: 400,
        message: 'No files uploaded (Files are Required)',
        data: null,
      });
    }

    // Melakukan type assertion untuk req.files sebagai array dari objek Express.Multer.File (untuk menghindari error pada saat loop keseluruhan req.files)
    const files = req.files as Express.Multer.File[];

    // const dataURIs = files.map((file) => toDataURI(file));
    const dataURIs = files
      ?.map((file: Express.Multer.File) => toDataURI(file))
      .map(handleUpload);

    // define uploadedUrls - untuk menampung url file yang telah diupload
    const uploadedUrls: string[] = [];

    // Loop seluruh file yang ada pada req.files
    for (const file of files) {
      // Untuk setiap file panggil fungsi handleUpload untuk upload file ke cloudinary dengan parameter buffer dan orifinal dari setiap file dari req.files
      // const result: any = await handleUpload(file.buffer, file.originalname);
      const result: any = await Promise.all(dataURIs);

      // Push url hasil upload ke variabel uploadedUrls (Untuk keperluan ditampilkan pada response json)
      uploadedUrls.push(result.secure_url);
    }

    // Response jika request berhasil (file-file telah terupload)
    res.status(200).json({
      status: 200,
      message: 'Multiple File Upload Success',
      result: uploadedUrls,
    });
  } catch (error) {
    console.error('Error uploading files :', error);

    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
