import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Register a new user
export const registerUser = mutation({
  args: {
    email: v.string(),
    password: v.string(),
    fullName: v.string(),
    image: v.optional(v.string()),
    codingField: v.string(),
    experience: v.string(),
    linkedin: v.string(),
    github: v.string(),
    technologies: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    // Check if user already exists
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    // In production, hash the password before storing
    // const hashedPassword = await hash(args.password);

    const userId = await ctx.db.insert("users", {
      email: args.email,
      password: args.password, // Should be hashed in production
      fullName: args.fullName,
      image: args.image,
      codingField: args.codingField,
      experience: args.experience,
      linkedin: args.linkedin,
      github: args.github,
      technologies: args.technologies,
      createdAt: Date.now(),
    });

    return userId;
  },
});

// Get user by email (for login)
export const getUserByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();
    
    return user;
  },
});

// Get all developers
export const getAllDevelopers = query({
  args: {},
  handler: async (ctx) => {
    const users = await ctx.db.query("users").collect();
    
    // Don't return passwords
    return users.map(({ password, ...user }) => user);
  },
});

// Get user by ID
export const getUserById = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);
    
    if (!user) {
      return null;
    }
    
    // Don't return password
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  },
});

// Update user profile
export const updateUser = mutation({
  args: {
    userId: v.id("users"),
    fullName: v.optional(v.string()),
    image: v.optional(v.string()),
    codingField: v.optional(v.string()),
    experience: v.optional(v.string()),
    linkedin: v.optional(v.string()),
    github: v.optional(v.string()),
    technologies: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const { userId, ...updates } = args;
    
    await ctx.db.patch(userId, updates);
    
    return userId;
  },
});

// Delete user account
export const deleteUser = mutation({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.userId);
    return { success: true };
  },
});
