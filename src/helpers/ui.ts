import { QVueGlobals } from 'quasar';
import { api } from 'src/boot/axios';
interface IId
{
  id: number;
}
/**
 * UI Helper
 * @param $q 
 * @returns  
 */
export function uiHelper ($q: QVueGlobals)
{
  const isDesktop = Boolean($q.platform.is['desktop']);
  const isMobile = Boolean($q.platform.is['mobile']);

  function imageHandler (imageId: number | IId | undefined, imageSize: 'sm' | 'md' | 'lg' = 'sm')
  {
    if (imageId && imageSize)
    {
      // Check if is Object
      if (!isNaN(imageId as number) && imageId === 1)
        return 'images/default.jpg';
      else if ((imageId as IId).id && !isNaN((imageId as IId).id))
        return api.get(`/images/${imageSize}/${(imageId as IId).id}`);
    }
    return 'images/default.jpg';
  }
  return {
    isDesktop, isMobile, imageHandler
  }
}