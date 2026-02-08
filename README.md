# NovaFYP Advisor
Intelligent Final Year Project Discovery & Recommendation Platform using NLP and RAG.

NovaFYP Advisor helps students discover, plan, and validate final year project ideas using insights from a large archive of past FYPs. The platform combines semantic search, recommendations, and a RAG-powered chatbot for guided decision-making.

## Planning Phase (MVP Focus)
This project centers on a structured planning phase that guides teams from idea to execution:

1. **MVP Planning**
	- Define the problem and core solution.
	- Identify the target users and their top 2-3 pain points.
	- Validate scope with a simple success metric (e.g., time to find ideas).
	- Decide the MVP boundaries: must-have, should-have, out-of-scope.
2. **Technical Architecture**
	- Choose your tools and stack.
	- Define the data flow: dataset ingestion -> search/recommendation -> API -> UI.
	- Specify core services: vector store/embedding, RAG/chatbot, analytics.
	- Plan deployment targets and environment variables.
3. **User Stories**
	- Map the complete user experience.
	- Prioritize key flows: Discover, Search, Chatbot, Profile/Bookmarks.
	- Add acceptance criteria for each story to keep scope honest.
4. **Design System**
	- Create the look, feel, and interactions.
	- Define typography, color palette, and spacing scale.
	- Establish reusable components: cards, filters, chatbot, dashboards.

These steps are represented in the landing page so users understand the workflow immediately.

## Access Rules (Auth + UX)
- **Discover** and **Dashboard** are open without login.
- **Chatbot** and **Bookmarks/Profile** require authentication.
- Supabase auth is validated via `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

If Supabase keys are missing, the app falls back to mock auth for the UX prototype.

## Dataset
Kaggle source used for the dashboard reference:
https://www.kaggle.com/datasets/nabeelqureshitiii/past-fyp-data

## Repo Structure
- `frontend/` - Next.js UI
- `backend/` - Recommendation system API (cloned from https://github.com/mohammedabdullahcs/fyp_recommendation_system.git)

## API Guidelines (Backend Contract)
Base URL example: `http://yourserver.com/api/v1`

### Endpoints
- `GET /projects` - List or filter projects
- `POST /recommendations` - Similar projects for a selected title
- `POST /search` - Semantic search by natural language
- `POST /chatbot` - Conversational RAG chatbot
- `GET /trends` - Analytics data for dashboards
- `POST /personalized_recommendations` - Profile-based recommendations

### Request/Response Snapshot
**GET /projects**
- Query: `domain`, `technology`, `year`, `difficulty`, `hardware`

**POST /search**
```json
{
  "query": "AI project using Python without hardware",
  "top_k": 5
}
```

**POST /chatbot**
```json
{
  "user_message": "Suggest me 3 trending AI projects in Python",
  "conversation_history": [
	 { "role": "user", "message": "I want AI projects" },
	 { "role": "bot", "message": "Do you have any preferred technologies?" }
  ],
  "top_k": 5
}
```

### Frontend Notes
- Display results as project cards (title, abstract, domain, tech, uniqueness, source URL).
- Filters call `GET /projects` with query params.
- Chatbot uses `POST /chatbot` and shows `bot_response` + recommended projects.
- Trends dashboard uses `GET /trends` for charts.
- Similar projects use `POST /recommendations`.
- Personalized cards use `POST /personalized_recommendations`.
