const Blog = require('../models/blogModel');
const fs = require('fs');
const cloudinaryUploadImg = require('../utils/cloudinary');
const validateMongoDbId = require('../utils/validateMongoodbId');
const asyncHandler = require('express-async-handler');

const createBlog = asyncHandler(async (req, res) => {
  try {
    const newBlog = await Blog.create(req.body);
    res.json(newBlog);
  } catch (error) {
    throw new Error(error);
  }
});

const updateBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const blog = await Blog.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.json(blog);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const blog = await Blog.findByIdAndDelete(id);

    res.json(blog);
  } catch (error) {
    throw new Error(error);
  }
});

const getBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updateViews = await Blog.findByIdAndUpdate(
      id,
      {
        $inc: { numViews: 1 },
      },
      { new: true },
    )
      .populate('likes')
      .populate('dislikes');

    res.json(updateViews);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllBlog = asyncHandler(async (req, res) => {
  try {
    // Filtering
    const queryObj = { ...req.query };
    const excludeFields = ['page', 'sort', 'limit', 'fields'];
    excludeFields.forEach((field) => {
      delete queryObj[field];
    });

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `${match}`);

    let query = Blog.find(JSON.parse(queryStr));

    // Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');

      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    // Limiting the fields
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');

      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }

    // pagination
    const page = req.query.page;
    const limit = req.query.limit;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);

    if (page) {
      const count = await Blog.countDocuments();
      if (skip >= count) throw new Error('This Page does not exists');
    }

    const blog = await query;
    res.json(blog);
  } catch (error) {
    throw new Error(error);
  }
});

const likeBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.body;
  validateMongoDbId(blogId);

  // Find the blog which you want to be liked
  const blog = await Blog.findById(blogId);
  // Find the login user
  const loginUserId = req?.user?._id;
  // Find if the user has liked the blog
  const isLiked = blog?.isLiked;
  // Find if the user has disliked the blog
  const alreadyDisliked = blog?.dislikes?.find(
    (userId) => userId?.toString() === loginUserId?.toString(),
  );

  if (isLiked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { likes: loginUserId },
        isLiked: false,
        ...(alreadyDisliked
          ? {
              $pull: { dislikes: loginUserId },
              isDisliked: false,
            }
          : {}),
      },
      { new: true },
    );
    res.json(blog);
  } else {
    console.log('loginUserId: ', loginUserId);
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $push: { likes: loginUserId },
        isLiked: true,
        ...(alreadyDisliked
          ? {
              $pull: { dislikes: loginUserId },
              isDisliked: false,
            }
          : {}),
      },
      { new: true },
    );
    res.json(blog);
  }
});

const dislikeBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.body;
  validateMongoDbId(blogId);

  // Find the blog which you want to be liked
  const blog = await Blog.findById(blogId);
  // Find the login user
  const loginUserId = req?.user?._id;
  // Find if the user has disliked the blog
  const isDisliked = blog?.isDisliked;
  // Find if the user has liked the blog
  const alreadyLiked = blog?.likes?.find(
    (userId) => userId?.toString() === loginUserId?.toString(),
  );

  if (isDisliked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { dislikes: loginUserId },
        isDisliked: false,
        ...(alreadyLiked
          ? {
              $pull: { likes: loginUserId },
              isLiked: false,
            }
          : {}),
      },
      { new: true },
    );
    res.json(blog);
  } else {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $push: { dislikes: loginUserId },
        isDisliked: true,
        ...(alreadyLiked
          ? {
              $pull: { likes: loginUserId },
              isLiked: false,
            }
          : {}),
      },
      { new: true },
    );
    res.json(blog);
  }
});

const uploadImages = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const uploader = (path) => cloudinaryUploadImg(path, 'images');
    const urls = [];
    const files = req.files;
    for (const file of files) {
      const { path } = file;
      const newpath = await uploader(path);

      urls.push(newpath);
      fs.unlinkSync(path);
    }

    const findBlog = await Blog.findByIdAndUpdate(
      id,
      {
        images: urls.map((file) => {
          return file;
        }),
      },
      { new: true },
    );

    res.json(findBlog);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createBlog,
  updateBlog,
  getBlog,
  deleteBlog,
  getAllBlog,
  likeBlog,
  dislikeBlog,
  uploadImages,
};
