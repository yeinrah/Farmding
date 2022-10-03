export const getLikeOrNot = (userId: number, likeUsers: any) => {
  for (const eachId of likeUsers) {
    if (eachId === userId) {
      return true;
    } else {
      return false;
    }
  }
};
