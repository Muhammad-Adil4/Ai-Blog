// src/app/api/ai-blog/route.js
import { NextResponse } from 'next/server';
import GenerateByAi from '@/services/openai';

export async function POST(req) {
  try {
    // Destructure incoming data, aiContent optional
    const { aiTitle, aiCategory, aiContent = "" } = await req.json();

    // Validate title and category
    if (!aiTitle || !aiTitle.trim() || !aiCategory || !aiCategory.trim()) {
      return NextResponse.json(
        { success: false, message: 'aiTitle and aiCategory are required and must be valid strings' },
        { status: 400 }
      );
    }

    const title = aiTitle.trim();
    const category = aiCategory.trim();
    const context = aiContent.trim(); // optional

    // Build AI prompt
    const prompt = `
Write a detailed and engaging blog post based on the following information:

Title: ${title}
Category: ${category}

Content Ideas / Keywords: ${context}

- Make the blog informative and well-structured.
- Use proper headings and paragraphs.
- Make it SEO-friendly and easy to read.
- Include examples or tips if relevant.
`;

    const response = await GenerateByAi(prompt);

    if (!response) {
      return NextResponse.json(
        { success: false, message: 'Error generating blog' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'AI blog generated successfully',
      aiblog: response,
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message || 'Something went wrong' },
      { status: 500 }
    );
  }
}
