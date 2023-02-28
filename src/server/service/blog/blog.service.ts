import connectMongo from "server/mongo/mongodb";
import BlogPostModel from "server/mongo/model/blogPost.model";
import type { Model } from "mongoose";
import mongoose from "mongoose";

const slugsUnderCreation = new Map<string, string>();
const checkedSlugsAndExists = new Map<string, string>();

/* Check if the blog exist, if it doesn't then the function 
   will create a new blog document where the id is the slug
============================================================ */
export async function checkIfBlogExist(slug: string, callback?: () => void) {
  connectMongo();
  try {
    if (checkedSlugsAndExists.has(slug)) {
      if (callback) await callback();
    } else {
      const blogExist = await BlogPostModel.exists({ slug });

      if (blogExist) {
        checkedSlugsAndExists.set(slug, slug);

        if (callback) await callback();
      } else {
        // check if the incoming slug of a blog is still creating
        if (!slugsUnderCreation.has(slug)) {
          slugsUnderCreation.set(slug, slug);

          await BlogPostModel.create(
            {
              _id: new mongoose.Types.ObjectId(),
              slug,
              views: 0,
              likes: 0,
              likers: [],
            },
            async () => {
              checkedSlugsAndExists.set(slug, slug);
              slugsUnderCreation.delete(slug);

              if (callback) await callback();
            },
          );
        }
      }
    }
  } catch (error) {
    checkedSlugsAndExists.delete(slug);
  }
}
export function isBlogModel<T>(model: Model<T>) {
  return model.modelName === "blog-posts";
}

/* Determine if the request is for data about blogs 
==================================================== */
export default async function analyzeRequestArguments<T>(
  model: Model<T>,
  slug: string,
) {
  if (isBlogModel(model)) checkIfBlogExist(slug);
}
