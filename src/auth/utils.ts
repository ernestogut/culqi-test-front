export const isUserLoggedIn = () => {
    return (
        localStorage.getItem("userData") &&
        localStorage.getItem('privateKey')
    );
};

export const getUserData = () => JSON.parse(localStorage.getItem("userData")!);
export const getUserToken = () => localStorage.getItem("privateKey");

