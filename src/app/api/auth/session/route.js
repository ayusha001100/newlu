import { findUser } from "@/lib/data/auth-users"

export function GET(request) {
	const mobile = request.nextUrl.searchParams.get("mobile") || ""
	const user = mobile ? findUser(mobile) : null

	return Response.json({
		message: "",
		results: { user },
	})
}
