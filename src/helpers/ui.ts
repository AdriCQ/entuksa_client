import { QVueGlobals } from 'quasar';
/**
 * UI Helper
 * @param $q 
 * @returns  
 */
export function uiHelper ($q: QVueGlobals)
{
  const isDesktop = Boolean($q.platform.is['desktop']);
  const isMobile = Boolean($q.platform.is['mobile']);

  function imageHandler (imageId: number, imageSize: 'sm' | 'md' | 'lg' = 'sm')
  {
    console.log('Image Handler', { imageId, imageSize });
    return 'images/default.jpg';
  }
  return {
    isDesktop, isMobile, imageHandler
  }
}