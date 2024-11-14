const Api = {
    REGISTER_USER: "/api/user/user-add",
    LOGIN_USER: "/api/user/user-login",
    GET_SINGLE_USER : "/api/user/get-single-user",
    REFRESH_TOKEN : "/api/user/referesh-token",
    ADD_TASK:"/api/user/task-create",
    EDIT_TASK:"/api/user/edit-task",
    GET_ALL_TASK:"/api/user/get-task",
    GET_SINGLE_TASK:"/api/user/get-single-task",
    DELETE_TASK:"/api/user/delete-task",
   common: {
     BASE_URL: "http://localhost:3008"
   },
 };
 export { Api };
 