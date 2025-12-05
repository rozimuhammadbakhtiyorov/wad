import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    email: v.string(),
    password: v.string(), // Should be hashed
    fullName: v.string(),
    image: v.optional(v.string()),
    codingField: v.string(),
    experience: v.string(),
    linkedin: v.string(),
    github: v.string(),
    technologies: v.array(v.string()),
    createdAt: v.number(),
  })
    .index("by_email", ["email"]),
});
