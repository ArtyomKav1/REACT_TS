import axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: { "API-KEY": "28fecdfd-75fe-4ebb-998d-a57490880d73" }

}
)

export const userAPI = {
    getUsersAPI(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response;
            });
    },
    retGetUsersAPI(pageNumber = 1, pageSize = 10) {
        return instance.get(`users?page=${pageNumber}&count=${pageSize}`)
    },
    followAPI(userId) {
        return instance.post(`follow/${userId}`)
    },
    unfollowAPI(userId) {
        return instance.delete(`follow/${userId}`)
    },
    getProfileAPI(userId) {
        console.warn('test - Obsolete method. Please use profileAPI object')
        return profileAPI.getProfileAPI(userId);
    }

}


export const authAPI = {
    me() {
        return instance.get(`auth/me`)
    },
    login(email, password, rememberMe = false, captcha = null) {
        return instance.post(`auth/login`, { email, password, rememberMe, captcha })
    },
    logout() {
        return instance.delete(`auth/login`)
    }
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url`)
    },

}



export const profileAPI = {
    getProfileAPI(userId) {
        return instance.get(`profile/${userId}`)
    },
    getStatusAPI(userId) {
        return instance.get(`profile/status/${userId}`)
    },
    updateStatusAPI(status) {
        return instance.put(`profile/status`, { status: status });
    },
    savePhotoAPI(file) {
        const formData = new FormData();
        formData.append("image", file);
        return instance.put(`profile/photo`, formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );
    },
    updateProfileAPI(profileData) {
        return instance.put(`profile`, profileData);
    },


}