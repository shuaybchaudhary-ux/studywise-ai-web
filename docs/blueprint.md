# **App Name**: StudyWise AI

## Core Features:

- AI Tutoring: Provides personalized explanations and answers to specific questions, adapting to the student's learning style and knowledge level. The AI uses multiple reasoning passes with access to web search tools.
- Concept Summarization: Generates concise summaries of complex topics and educational resources using a Large Language Model, aiding in quick revision and understanding. The AI will have access to multiple summarization tools.
- Practice Question Generation: Creates practice questions tailored to the study material, allowing students to test their knowledge and identify areas for improvement.
- Interactive Chat Interface: A user-friendly interface for interacting with the AI chatbot, enabling natural language input and clear, structured output.
- Progress Tracking: Tracks the student's learning progress, identifying strengths and weaknesses to focus on.
- Personalized Study Plans: Generates custom study schedules based on learning preferences, time constraints, and exam dates.
- Sidebar: Collapsible sidebar with options: Chat, Quiz Generator, Notes Upload, History, Summaries, Diagrams, Upgrade to Pro, Settings, and user account information following the style of the attached image.
- Header: Header with App Logo (StudyWise AI), Profile dropdown (Settings, Upgrade to Pro, Logout), and Sidebar toggle button.
- Main Content Area: The main content area changes based on the selected menu item in the sidebar.
- Fixed Input Bar: A fixed input bar at the bottom of the screen for the Chat page.
- Chat Functionality: Chat page with message list (AI left, user right) following the style of the attached image, fixed input bar with text field + send button. Save chats to Firestore (title, user messages + AI responses). Sidebar History section: show all past chats by title (click → open, delete option). Use Gemini API for AI responses.
- Quiz Generator: Page with input field: "Enter Topic". When user submits → Call Gemini API: Generate 5 MCQs with 4 options each + correct answer. Display quiz in clean UI (card layout). Save quiz in Firestore (linked to user). Allow quiz to be revisited in History section
- Diagram Generator: Input field for user topic. Call Gemini API: Generate Mermaid.js diagram code (flowchart, mindmap, etc.). Render diagram using mermaid-react. Save diagrams in Firestore. Allow revisiting in History section
- Selectable Tone: Save selected tone in Firestore. Retrieve it on each request and attach it to the AI’s system or user prompt.

## Style Guidelines:

- Primary color: Moderate blue (#6699CC) for trust and focus.
- Background color: Very light blue (#F0F8FF) to reduce distractions.
- Accent color: Soft orange (#E59866) for highlights and interactive elements.
- Body and headline font: 'PT Sans', a humanist sans-serif.
- Code font: 'Source Code Pro' for displaying code snippets.
- Simple and clear icons to represent study tools and features.
- Subtle transitions and feedback animations to enhance the user experience.
- Responsive design to adapt to different screen sizes