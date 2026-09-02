"use server"

// import * as Sentry from "@sentry/nextjs"
import { headers } from "next/headers"
import { bgRed, blue, bold, green, red, yellow } from "picocolors"

// Default options for API requests
const DEFAULT_OPTIONS = {
	customAuthorization: false,
	headers: {},
	method: "GET",
	noContentType: false,
	responseType: "json",
	skipResponseHandling: false,
}

/**
 * Logs the status of an API request with color-coded output
 *
 * @param {undefined | null | number} status - The status code of the response.
 * @param {string} method - The HTTP method used for the request.
 * @param {string} url - The URL of the request.
 * @returns {void} Logs the request status with color-coded status.
 */
const logRequestStatus = ({ status, method, url }) => {
	const statusColor = status
		? status >= 200 && status < 300
			? green(status)
			: status >= 400 && status < 500
				? yellow(status)
				: red(status)
		: red("-")

	console.log(`${statusColor} - ${bold(blue(method))}: ${url}`)
}

/**
 * Custom fetch function for making API requests.
 *
 * @param {string} baseUrl - The base URL for the API.
 * @param {string} endpoint - The endpoint to fetch from.
 * @param {Object} options - Fetch options including method, headers, and body.
 * @returns {Promise<Object>} The response object containing error status and response data.
 */
export const customFetch = async (baseUrl, endpoint, incoming = {}) => {
	let errMsg, responseData
	const options = {
		...DEFAULT_OPTIONS,
		...incoming,
		headers: { ...DEFAULT_OPTIONS.headers, ...incoming.headers },
	}

	const apiDetails = {
		body: null,
		errMsg: null,
		headers: null,
		method: options.method,
		noContentType: options.noContentType,
		responseType: options.responseType,
		skipResponseHandling: options.skipResponseHandling,
		status: null,
		statusText: null,
		url: `${baseUrl}${endpoint}`,
	}

	/**
	 * Captures error details for logging and monitoring.
	 *
	 * @param {string} error - The error message.
	 * @param {string} from - The context from which the error originated.
	 */
	const captureError = (error, from) => {
		const errorDetails = {
			errMsg,
			error,
			from,
			...apiDetails,
		}
		console.log(`${bgRed("ERROR")}:`, errorDetails)

		// Sentry.withScope(scope => {
		// 	const errorInstance = error instanceof Error ? error : new Error(error)
		// 	scope.setContext("API Error Details", errorDetails)
		// 	Sentry.captureException(errorInstance)
		// })
	}

	try {
		// Add default Content-Type header if not disabled
		if (!options.noContentType) {
			if (!options.headers) options.headers = {}
			options.headers["Content-Type"] ??= "application/json"
		} else delete options.headers?.["Content-Type"]

		// Stringify the body if it's provided and content type is set
		if (options.body && !options.noContentType)
			options.body = JSON.stringify(options.body)

		apiDetails.headers = options.headers
		apiDetails.body = options.body

		const res = await fetch(`${baseUrl}${endpoint}`, {
			body: options.body,
			headers: options.headers,
			method: options.method,
		})

		// Capture response status and details
		apiDetails.status = res.status
		apiDetails.statusText = res.statusText ?? "OK"

		logRequestStatus(apiDetails)

		// If skipping response handling, return raw response
		if (options.skipResponseHandling)
			return { data: res, error: false, message: null }

		// Parse the response data based on the expected response type
		try {
			responseData = await res[options.responseType]()
		} catch (err) {
			errMsg = `Error reading response as ${options.responseType}: ${err.message}`
			apiDetails.errMsg = errMsg
			captureError(
				"Response Parsing Error",
				"responseParsing",
				apiDetails,
			)
			return {
				data: null,
				error: true,
				message: errMsg,
			}
		}

		// Handle unsuccessful responses
		if (!res.ok) {
			errMsg = responseData.message || "Something went wrong"
			apiDetails.errMsg = errMsg
			captureError("API Failed", "apiError", apiDetails)
			return {
				data: null,
				error: true,
				message: errMsg,
			}
		}

		// Return successful response data
		return {
			data:
				responseData.results?.data ??
				responseData.results ??
				responseData,
			error: false,
			message: responseData.message ?? "",
		}
	} catch (err) {
		errMsg = `Error occurred while fetching ${baseUrl}${endpoint}: ${err.message}`
		apiDetails.errMsg = errMsg
		captureError("Something went wrong", "apiHandler", apiDetails)
		return { data: null, error: true, message: errMsg }
	}
}

export const getApiBase = async () => {
	if (process.env.NEXT_PUBLIC_APP_URL) return process.env.NEXT_PUBLIC_APP_URL
	if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`

	const headerStore = await headers()
	const host =
		headerStore.get("x-forwarded-host") ||
		headerStore.get("host") ||
		"localhost:3000"
	const proto =
		headerStore.get("x-forwarded-proto") ||
		(host.includes("localhost") ? "http" : "https")
	return `${proto}://${host}`
}

export const fetchApi = async (endpoint, options = {}) => {
	const baseUrl = await getApiBase()
	return customFetch(baseUrl, endpoint, options)
}
