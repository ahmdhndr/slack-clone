import {
  convexAuthNextjsMiddleware,
  createRouteMatcher,
  nextjsMiddlewareRedirect,
} from '@convex-dev/auth/nextjs/server';

const isPublicPage = createRouteMatcher(['/auth']);
// const isProtectedRoute = createRouteMatcher(['/']);

export default convexAuthNextjsMiddleware((request, { convexAuth }) => {
  console.log('CHECK\n', convexAuth.isAuthenticated());
  if (isPublicPage(request) && convexAuth.isAuthenticated()) {
    return nextjsMiddlewareRedirect(request, '/');
  }
  if (!isPublicPage(request) && !convexAuth.isAuthenticated()) {
    return nextjsMiddlewareRedirect(request, '/auth');
  }
});

export const config = {
  // The following matcher runs middleware on all routes
  // except static assets.
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
