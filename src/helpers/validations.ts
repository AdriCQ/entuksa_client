/**
 * 
 * @returns Validation Object
 */
export function Validations () {
  const isEmail = (msg: string) => (value: string) => (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.exec(value)) ? msg : true);
  const lengthEqual = (cnt: number, msg: string) => (value: string) => (value.length != cnt) ? msg : true;
  const lengthLess = (cnt: number, msg: string) => (value: string) => (value.length >= cnt) ? msg : true;
  const lengthMore = (cnt: number, msg: string) => (value: string) => (value.length <= cnt) ? msg : true;
  const required = (msg: string) => (value: string) => (!value || value.length <= 0) ? msg : true;
  const sameAs = (same_value: string, msg: string) => (value: string) => (value !== same_value) ? msg : true;

  return {
    isEmail,
    lengthEqual,
    lengthLess,
    lengthMore,
    required,
    sameAs
  }
}
