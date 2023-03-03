/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable consistent-return */
import type { Model } from "mongoose";
import type { StatsType } from "types/api.types";

import connectMongo from "server/mongo/mongodb";
import BlogPostModel, {
  BlogPostDocument,
} from "server/mongo/model/blogPost.model";
import mongoose from "mongoose";

const slugUnderCreation = new Map<string, BlogPostDocument>();

/* Check if the blog exist, if it doesn't then the function 
   will create a new blog document where the id is the slug
============================================================ */
export async function checkIfBlogExistAndReturn(
  slug: string,
  callback?: (blog: BlogPostDocument, isNew: boolean) => void,
) {
  connectMongo();

  const existingBlog = await BlogPostModel.findOne({ slug });

  if (existingBlog === null) {
    if (!slugUnderCreation.has(slug)) {
      const newBlog = new BlogPostModel({
        _id: new mongoose.Types.ObjectId(),
        slug,
        views: 0,
        likes: 0,
        likers: [],
      });

      slugUnderCreation.set(slug, newBlog);

      await BlogPostModel.create(newBlog, (err, res) => {
        slugUnderCreation.delete(slug);
        if (callback) callback(res, true);
      });

      return { blog: newBlog, isNew: true };
    }

    if (callback) {
      callback(slugUnderCreation.get(slug) as BlogPostDocument, true);
    }

    return {
      blog: slugUnderCreation.get(slug) as BlogPostDocument,
      isNew: true,
    };
  }

  if (callback) callback(existingBlog as BlogPostDocument, false);
  return { blog: existingBlog as BlogPostDocument, isNew: false };
}

export function isBlogModel<T>(model: Model<T>) {
  return model.modelName === "blog-posts";
}

/* Services for fetching stats
============================== */
export async function selectStatsFromBlog(slug: string, fields: StatsType[]) {
  connectMongo();

  const { blog } = await checkIfBlogExistAndReturn(slug);

  const stats = fields.reduce<{ [K in StatsType]: number }>(
    (prev, curr) => ({
      ...prev,
      [curr]: blog[curr],
    }),
    { likes: 0, views: 0 },
  );

  return stats;
}

/* Services for mutating stats
============================== */
export async function incBlogStat(slug: string, field: "views" | "likes") {
  connectMongo();

  checkIfBlogExistAndReturn(slug, async (blog, isNew) => {
    if (isNew) return;

    const updatedBlog = blog;

    updatedBlog[field] += 1;

    await updatedBlog.save();
  });
}

export async function decBlogStat(slug: string, field: "views" | "likes") {
  connectMongo();

  checkIfBlogExistAndReturn(slug, async (blog, isNew) => {
    if (isNew) return;

    const updatedBlog = blog;

    updatedBlog[field] -= 1;

    await updatedBlog.save();
  });
}

/* Services for blog likes
============================= */
export async function editBlogLikersList(
  slug: string,
  uniqueId: string,
  operation: "add" | "remove",
) {
  connectMongo();

  checkIfBlogExistAndReturn(slug, async (blog, isNew) => {
    if (isNew) return;

    const updatedBlog = blog;

    if (operation === "add") {
      updatedBlog.likers.push(uniqueId);
    } else {
      updatedBlog.likers = updatedBlog.likers.filter(
        liker => liker !== uniqueId,
      );
    }

    await updatedBlog.save();
  });
}

export async function getBlogLikers(slug: string) {
  connectMongo();

  const { blog } = await checkIfBlogExistAndReturn(slug);

  return blog.likers;
}

export async function getHasLiked(slug: string, uniqueIpId: string) {
  connectMongo();

  const likers = await getBlogLikers(slug);
  if (!likers) throw new Error("The target can't be found !");

  const hasLiked = likers.includes(uniqueIpId);

  return hasLiked;
}
