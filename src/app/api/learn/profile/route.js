import { updateProfileResult } from "@/lib/auth/handlers"

export async function POST(request) {
	const body = await request.json()
	const mobile = body.mobile || ""
	const result = updateProfileResult(mobile, body)

	if (result.error) {
		return Response.json(
			{ message: result.message },
			{ status: result.status },
		)
	}

	return Response.json({
		message: result.message,
		results: result.data,
	})
}
