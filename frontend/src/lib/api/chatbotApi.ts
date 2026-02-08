import api from "@/lib/api/http";

export async function sendMessage(
  message: string,
  context?: Record<string, unknown>
) {
  const { data } = await api.post("/chatbot", { message, context });
  return data;
}
