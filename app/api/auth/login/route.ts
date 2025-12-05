import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Query Convex to find user by email
    const user = await fetchQuery(api.users.getUserByEmail, { email });

    if (!user) {
      return NextResponse.json(
        { message: "No account found with this email. Please register first." },
        { status: 404 }
      );
    }

    // Check password (in production, use proper hashing)
    if (user.password !== password) {
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 401 }
      );
    }

    // Return user ID for session
    return NextResponse.json({ userId: user._id });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Login failed. Please try again." },
      { status: 500 }
    );
  }
}
