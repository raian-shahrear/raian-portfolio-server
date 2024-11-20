import { model, Schema } from 'mongoose';
import { TBlog } from './blogs.interface';

const blogSchema = new Schema<TBlog>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const BlogModel = model<TBlog>('Blog', blogSchema);
