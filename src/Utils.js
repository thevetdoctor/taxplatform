export const getFilterNumber = (filter) => {
    switch (filter) {
        case "rejected":
            return -1;
        case "pending":
            return 0;
        case "approved":
            return 1;
        case "signed":
            return 2;
        case "completed":
            return 3;
    }
};
