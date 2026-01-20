import type { RouterContextProvider } from 'react-router';
import { updateFavoriteApi } from '~/apis/user/endpoints';
import { userContext } from '~/contexts/user';
import { getSession } from '~/session.server';

interface ToggleFavoriteActionModelArgs {
  context: Readonly<RouterContextProvider>;
  request: Request;
  formData: FormData;
}

export async function toggleFavoriteActionModel({
  request,
  context,
  formData,
}: ToggleFavoriteActionModelArgs) {
  const session = await getSession(request.headers.get('Cookie'));
  const sessionId = session.get('sessionId');
  const user = context.get(userContext);
  const accountId = user.account?.id;

  const mediaId = Number(formData.get('mediaId'));
  const favorite = formData.get('favorite') === 'true';
  const mediaType = formData.get('mediaType') as 'movie' | 'tv';

  if (!sessionId || !accountId) return;

  return await updateFavoriteApi({
    account_id: accountId,
    session_id: sessionId,
    media_type: mediaType,
    media_id: mediaId,
    favorite,
  });
}
