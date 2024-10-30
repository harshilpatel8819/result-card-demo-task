// src/mocks/handlers.ts
import { rest } from "msw";

export const handlers = [
  // Handler for successful API fetch
  rest.get("http://localhost:5173/data.json", (req, res, ctx) => {
    return res(
      ctx.status(200), // Ensures the response status is 200 OK
      ctx.json([{ category: "Reaction", score: 80 }]) // Mocked data
    );
  }),

  // Handler for a failed API fetch
  rest.get("http://localhost:5173/data.json", (req, res, ctx) => {
    return res(
      ctx.status(500), // Simulates an internal server error
      ctx.json({ message: "Failed to fetch data" }) // Error message
    );
  }),
];
