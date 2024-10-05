import { query } from './_generated/server';
// import { v } from 'convex/values';
// import { auth } from './auth';
import { getAuthUserId } from '@convex-dev/auth/server';

export const getUser = query({
  args: {},
  async handler(ctx) {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      return null;
    }

    return await ctx.db.get(userId);
  },
});
