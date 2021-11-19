import { AxiosError } from 'axios';
import { QVueGlobals } from 'quasar';
import { Router } from 'vue-router';
import { baseURL } from 'src/boot/axios';
import { ErrorData } from 'src/types';
import { ROUTE_NAME } from '.';
interface IId
{
  id: number;
}
/**
 * UI Helper
 * @param $q 
 * @returns  
 */
export function uiHelper ($q: QVueGlobals, $router?: Router)
{
  const isDesktop = Boolean($q.platform.is['desktop']);
  const isMobile = Boolean($q.platform.is['mobile']);
  /**
   * errorHandler
   * @param _error 
   */
  function errorHandler (_error: AxiosError<ErrorData>, _default = 'Ha ocurrido un error')
  {
    if (_error.response && _error.response.data)
    {
      if (_error.response.status === 401)
      {
        // Show notification
        $q.notify({
          type: 'warning',
          icon: 'mdi-account-off',
          message: 'Necesita iniciar sesión o registrarse',
          position: 'center'
        });
        if ($router) void $router.push({ name: ROUTE_NAME.AUTH_LOGIN });
      } else
      {
        // Show notification
        $q.notify({
          type: 'negative',
          icon: 'mdi-alert-circle-outline',
          message: _error.response.data.message,
          position: 'center'
        });
      }
    } else
    {
      $q.notify({
        type: 'negative',
        icon: 'mdi-alert-circle-outline',
        message: _default,
        position: 'center'
      });
    }
  }
  /**
   * imageHandler
   * @param imageId 
   * @param imageSize 
   * @returns 
   */
  function imageHandler (imageId: number | IId | undefined, imageSize: 'sm' | 'md' | 'lg' = 'sm')
  {
    if (imageId && imageSize)
    {
      // Check if is Object
      if (!isNaN(imageId as number) && imageId === 1)
        return `${baseURL}/images/${imageSize}/${imageId}`;
      else if ((imageId as IId).id && !isNaN((imageId as IId).id))
        return `${baseURL}/images/${imageSize}/${(imageId as IId).id}`;
    }
    return 'images/default.jpg';
  }
  return {
    isDesktop, isMobile, errorHandler, imageHandler
  }
}