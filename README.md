# 📚 ClarityDocs

**ClarityDocs** is an AI-powered web application that lets users upload PDF documents and receive clean, concise summaries using **OpenAI** and **Gemini**. The app extracts raw text using **Langchain**, handles authentication with **Clerk**, manages payments with **Stripe**, and delivers a seamless user experience via **Next.js 14**, **TypeScript**, and **Tailwind CSS**.

---

## ✨ Features

- 📄 Upload PDFs with ease
- 🔍 Extracts clean text using Langchain
- 🧠 Get AI-generated summaries using OpenAI and Gemini
- 🔐 Secure user authentication via Clerk
- 💳 Accept payments using Stripe
- ⚡ Fast, responsive UI built with Next.js and Tailwind CSS
- 🌐 Deployed on Vercel

---

## 🧰 Tech Stack

| Category          | Technologies Used                           |
|------------------ |-------------------------------------------- |
| 👨‍💻 Frontend       | Next.js 14, TypeScript, Tailwind CSS        |
| 🧠 Backend         | Node.js, Next.js App Router API Routes      |
| 🔐 Authentication | Clerk                                       |
| 💳 Payments       | Stripe                                      |
| 🤖 AI Integration | OpenAI API, Gemini API                      |
| 📜 PDF Parsing    | Langchain                                   |
| 🚀 Deployment     | Vercel                                      |


## 🚀 Getting Started

This project was bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

--- 

## 🛠️ 1. Clone the Repository

```bash
git clone https://github.com/yashutandon/ClarityDocs.git
cd ClarityDocs

## 📦 2. Install Dependencies

```bash
npm install
# or
yarn install

## 🔐 3. Add Environment Variables

Create a .env.local file in the root directory and add the following:

CLERK_SECRET_KEY=your_clerk_secret
CLERK_PUBLISHABLE_KEY=your_clerk_publishable
OPENAI_API_KEY=your_openai_key
GEMINI_API_KEY=your_gemini_key
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

## ▶️ 4. Run the Development Server

```bash
npm run dev
Visit: http://localhost:3000

## ⚙️ 5. API & Services Overview

Service	Usage
🔐 Clerk	User authentication and session management
💳 Stripe	Handling user payments and subscriptions
📄 Langchain	Parsing & extracting text from uploaded PDF files
🧠 OpenAI	Summarizing extracted content (via GPT-4)
🧠 Gemini	Alternative summarizer (from Google)
🚀 Vercel	Hosting and continuous deployment

##📚 6. Learn More
Here are some useful resources to understand the tools used:

📘 Next.js Documentation
🎓 Learn Next.js Interactive Tutorial
🔐 Clerk Docs
💳 Stripe Docs
🧠 OpenAI API Docs
📄 Langchain Docs
🧪 Gemini API

## 🚀 7. Deployment
ClarityDocs is deployed on Vercel for fast, global delivery.
You can easily deploy your own fork by clicking the button below:


Or follow the guide here: Next.js Deployment Docs

##🧑‍💻 8. Author
Made with ❤️ by Yashu Tandon
📧 Email: yashutandon@gmail.com
📸 Instagram: @yashu_tandon

## ⭐9. Support & Feedback
If you liked this project, please consider:

⭐ Starring this repository
🗣️ Sharing it with your developer friends
🛠️ Creating issues or pull requests if you find bugs or want to contribute