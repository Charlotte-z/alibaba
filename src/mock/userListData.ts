import { User } from "./../typings";

export const userList = new Array(13).fill(0).map(
  (_, idx): User => ({
    id: idx,
    name: `用户[${idx + 1}]`,
    age: Math.floor(Math.random() * 100),
    sex: Math.random() > 0.5 ? "男" : "女",
    email: "---",
  })
);
