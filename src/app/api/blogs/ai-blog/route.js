// src/app/api/ai-blog/route.js
import { NextResponse } from 'next/server';
import GenerateByAi from '@/services/openai';

export async function POST(req) {
  try {
    const { aiTitle, aiCategory, aiContent } = await req.json();

    // Input validation
    if (
      !aiTitle || typeof aiTitle !== 'string' || !aiTitle.trim() ||
      !aiCategory || typeof aiCategory !== 'string' || !aiCategory.trim() ||
      !aiContent || typeof aiContent !== 'string' || !aiContent.trim()
    ) {
      return NextResponse.json(
        {
          success: false,
          message: 'aiTitle, aiCategory, and aiContent are required and must be valid strings',
        },
        { status: 400 }
      );
    }

    // Trim input
    const title = aiTitle.trim();
    const category = aiCategory.trim();
    const content = aiContent.trim();

    // Prepare prompt
    const prompt = `
Write a detailed and engaging blog post based on the following information:

Title: ${title}
Category: ${category}

Content Ideas / Keywords: ${content}

- Make the blog informative and well-structured.
- Use proper headings and paragraphs.
- Make it SEO-friendly and easy to read.
- Include examples or tips if relevant.
`;

    // Generate AI blog
    const response = await GenerateByAi(prompt);

    if (!response) {
      return NextResponse.json(
        { success: false, message: 'Error generating blog' },
        { status: 500 }
      );
    }

    // Success response
    return NextResponse.json({
      success: true,
      message: 'AI blog generated successfully',
      aiblog: response,
    });

  } catch (error) {
    // Catch any unexpected errors
    return NextResponse.json(
      { success: false, message: error.message || 'Something went wrong' },
      { status: 500 }
    );
  }
}
