const userData = JSON.parse(localStorage.getItem('userData'))

export const USER_INFO = userData.info
export const USER_ROLES = userData.roles
export const USER_PERMISSIONS = userData.permissions

export function can(subject, action) {
    let permission = subject + ':' + action
    return USER_PERMISSIONS.some(function(item) {
        return item.name === permission;
    });
}