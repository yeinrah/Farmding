export const getLikeOrNot = async (userId: number, likeUsers: any) => {
  for (const eachId of likeUsers) {
    if (eachId === userId) {
      return 1;
    }
  }
};
