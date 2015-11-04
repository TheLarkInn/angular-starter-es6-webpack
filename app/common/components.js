import navbarComponent from './navbar/navbar';
import buttonComponent from './button/button';

export default app => {
  INCLUDE_ALL_MODULES([navbarComponent, buttonComponent], app);
}
