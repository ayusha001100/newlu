import { sessionResult } from "@/lib/auth/handlers"

export function GET(request) {
	const mobile = request.nextUrl.searchParams.get("mobile") || ""
	const result = sessionResult(mobile)

	return Response.json({
		message: result.message,
		results: result.data,
	})
}
