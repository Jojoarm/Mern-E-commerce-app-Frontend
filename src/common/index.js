const backendDomain = 'http://localhost:8080/api';

const SummaryApi = {
  signUp: {
    url: `${backendDomain}/signup`,
    method: 'post',
  },
  signIn: {
    url: `${backendDomain}/signin`,
    method: 'post',
  },
  logout_user: {
    url: `${backendDomain}/logout`,
    method: 'get',
  },
  current_user: {
    url: `${backendDomain}/user-details`,
    method: 'get',
  },
  allUsers: {
    url: `${backendDomain}/all-users`,
    method: 'get',
  },
  updateUser: {
    url: `${backendDomain}/update-user`,
    method: 'post',
  },
};

export default SummaryApi;
