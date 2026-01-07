import { updateFavoriteApi } from '~/apis/user/endpoints';

interface ToggleFavoriteActionModelArgs {
  sessionId: string | null;
  accountId: number | null;
  formData: FormData;
}

export async function toggleFavoriteActionModel({
  sessionId,
  accountId,
  formData,
}: ToggleFavoriteActionModelArgs) {
  const mediaId = Number(formData.get('mediaId'));
  const favorite = formData.get('favorite') === 'true';
  const mediaType = formData.get('mediaType') as 'movie' | 'tv';

  if (sessionId && accountId && mediaType) {
    try {
      return await updateFavoriteApi({
        account_id: accountId,
        session_id: sessionId,
        media_type: mediaType,
        media_id: mediaId,
        favorite,
      });
    } catch (error) {
      return {
        isError: true,
        errorMessage:
          error instanceof Error
            ? error.message
            : 'Unable to update favorite status.',
      };
    }
  }
}
