import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
	const isPreview = !!process.env.NEXT_IS_PREVIEW;
	console.log(" ++ The middleware is triggered ++", isPreview, !isPreview);
	if (!isPreview) {
		return NextResponse.redirect(new URL("/under-construction", request.url));
	}
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 */
		"/((?!api|_next/static|_next/image|favicon.ico|under-construction).*)",
	],
};
