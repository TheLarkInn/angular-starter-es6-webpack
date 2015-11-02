// This index file exposes all modules into the module export for the main app to use.
// AKA: When you add a new service [folder], you will need to import it here and then
// add it to the INCLUDE_ALL_MODULES array argument;
import usersService from './users/users'

export default app => {
  INCLUDE_ALL_MODULES([
    usersService
  ], app);
}
