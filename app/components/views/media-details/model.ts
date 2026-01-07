import {
  getMovieDetailsApi,
  getTvShowDetailsApi,
} from '~/apis/media/endpoints';
import { userContext } from '~/contexts/user';
import { getSessionCookie, sessionIdCookie } from '~/apis/auth/utils';
import { getFavoriteByIdApi } from '~/apis/user/endpoints';
import type { Route } from '../../../routes/+types/media-details';
import { toggleFavoriteActionModel } from '~/actions/toggle-favorite';

type MediaType = 'movies' | 'tv-shows';
type NormalizedMediaType = 'movie' | 'tv';

function isMediaType(value: string): value is MediaType {
  return value === 'movies' || value === 'tv-shows';
}

export async function mediaDetailsLoaderModel({
  request,
  params,
}: Route.LoaderArgs) {
  try {
    const mediaType = params.mediaType;
    const id = params.id;

    if (!mediaType || !id) {
      throw new Error('Missing media type or id');
    }

    if (!isMediaType(mediaType)) {
      throw new Error(`Unsupported media type: ${mediaType}`);
    }

    const numericId = Number(id);

    if (!Number.isFinite(numericId)) {
      throw new Error(`Invalid id: ${id}`);
    }

    const normalizedMediaType: NormalizedMediaType =
      mediaType === 'movies' ? 'movie' : 'tv';

    const cookieHeader = request.headers.get('cookie');
    const sessionId = await getSessionCookie(cookieHeader);

    const favoritePromise = sessionId
      ? getFavoriteByIdApi({
          session_id: sessionId,
          media_type: normalizedMediaType,
          media_id: numericId,
        }).catch(() => null)
      : Promise.resolve(null);

    if (normalizedMediaType === 'movie') {
      const [data, favoriteResponse] = await Promise.all([
        getMovieDetailsApi({ movie_id: numericId }),
        favoritePromise,
      ]);

      return {
        mediaType: 'movie' as const,
        data,
        isFavorite: favoriteResponse?.favorite ?? false,
      };
    }

    const [data, favoriteResponse] = await Promise.all([
      getTvShowDetailsApi({ tv_id: numericId }),
      favoritePromise,
    ]);

    return {
      mediaType: 'tv' as const,
      data,
      isFavorite: favoriteResponse?.favorite ?? false,
    };
  } catch (error) {
    return {
      isError: true,
      errorMessage:
        error instanceof Error ? error.message : 'Unable to load details.',
    };
  }
}

export async function mediaDetailsActionModel({
  request,
  context,
}: Route.ActionArgs) {
  const cookieHeader = request.headers.get('cookie');
  const sessionId = await getSessionCookie(cookieHeader);
  const formData = await request.formData();
  const intent = formData.get('intent');
  const user = context.get(userContext);
  const accountId = user?.account?.id ?? null;

  if (intent === 'favorite-toggle') {
    return toggleFavoriteActionModel({
      sessionId,
      accountId,
      formData,
    });
  }

  return null;
}
