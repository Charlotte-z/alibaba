import { User } from "../typings";
import { userList } from "./../mock/userListData";

class MockService {
  queryPagedUserList(page: number, pageSize: number) {
    const start = pageSize * (page - 1);
    return Promise.resolve({
      total: userList.length,
      rows: userList.slice(start, start + pageSize),
    });
  }

  async deleteUser(userId: number): Promise<Array<User>> {
    return new Promise((resolve, reject) => {
      const userFound = userList.findIndex((user) => user.id === userId);
      if (userFound !== -1) {
        userList.splice(userFound, 1);
        resolve(userList);
      }
      reject([]);
    });
  }

  editUser(user: User, userId: number): Promise<Array<User>> {
    return new Promise((resolve, reject) => {
      const userFound = userList.findIndex((user) => user.id === userId);
      if (userFound !== -1) {
        userList.splice(userFound, 1, user);
        resolve(userList);
      }
      reject([]);
    });
  }
}

export const mockService = new MockService();
