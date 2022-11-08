import del from 'del';

//Удаление директории
export default () => {
  return del('./docs');
}
