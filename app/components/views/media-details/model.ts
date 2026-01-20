import {
  getMovieDetailsApi,
  getTvShowDetailsApi,
} from '~/apis/media/endpoints';
import { userContext } from '~/contexts/user';
import { getSession } from '~/session.server';
import { getFavoriteByIdApi } from '~/apis/user/endpoints';
import type { Route } from '../../../routes/+types/media-details';
import { toggleFavoriteActionModel } from '~/components/favorite-button/model';

type NormalizedMediaType = 'movie' | 'tv';

export async function mediaDetailsLoaderModel({
  request,
  params,
}: Route.LoaderArgs) {
  const session = await getSession(request.headers.get('Cookie'));
  const sessionId = session.get('sessionId');

  const mediaType = params.mediaType;
  const id = params.id;
  const numericId = Number(id);
  const normalizedMediaType: NormalizedMediaType =
    mediaType === 'movies' ? 'movie' : 'tv';

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
}

export async function mediaDetailsActionModel({
  request,
  context,
}: Route.ActionArgs) {
  const session = await getSession(request.headers.get('Cookie'));
  const sessionId = session.get('sessionId');

  const formData = await request.formData();
  const intent = formData.get('intent');
  const user = context.get(userContext);
  const accountId = user?.account?.id ?? null;

  if (sessionId && intent === 'favorite-toggle') {
    return toggleFavoriteActionModel({
      sessionId,
      accountId,
      formData,
    });
  }
}
