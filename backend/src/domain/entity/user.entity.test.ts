import { UserEntity } from "./user.entity";

describe("UserEntity", () => {
  test("should create an randomUUID if id is not provied", () => {
    const user = new UserEntity({
      name: "name",
      cpfCnpj: "cpf",
      email: "email",
      password: "pass",
    });
    expect(user.getUserEntity.id).not.toBe(undefined);
    expect(user.getUserEntity.id).not.toBe(null);
  });

  test("should use provided id if an not null value is provided", () => {
    const user = new UserEntity({
      name: "name",
      cpfCnpj: "cpf",
      email: "email",
      password: "pass",
      id: "id",
    });
    expect(user.getUserEntity.id).toBe("id");
    expect(user.getUserEntity.id).not.toBe(null);
  });

  test("should set all values if are provided", () => {
    const values = {
      name: "name",
      cpfCnpj: "cpf",
      email: "email",
      password: "pass",
      id: "id",
    };
    const user = new UserEntity(values);
    expect(user.getUserEntity).toEqual(values);
  });

  test("should set change the token", () => {
    const values = {
      name: "name",
      cpfCnpj: "cpf",
      email: "email",
      password: "pass",
      id: "id",
      token: "123",
    };
    const user = new UserEntity(values);
    user.setToken = "1234";
    expect(user.getUserEntity.token).toBe("1234");
  });
});
