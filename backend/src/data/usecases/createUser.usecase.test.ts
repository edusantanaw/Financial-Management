import { ICreateUserData } from "../../domain/usecases/createUser.contract";

class CreateUserUsecase {}

describe("CreateUserUsecase", () => {
  test("should call userRepository.loadByEmail method with correct value", async () => {
    const { userRepository, createUserUsecase } = makeSut();
    await createUserUsecase.execute({
      email: "edu@email.com",
    } as ICreateUserData);
    expect(userRepository.emailInput).toBe("edu@email.com");
  });

  test("should call userRepository.loadByCpfCnph method with correct value", async () => {
    await createUserUsecase.execute({
      cpfCnpj: "123456789",
    } as ICreateUserData);
    expect(userRepository.cpfCnpjInput).toBe("123456789");
  });

  test("should throw if email already being used", async () => {
    const { userRepository, createUserUsecase } = makeSut();
    userRepository.emailAlreadyExists = true;
    const response = createUserUsecase.execute({
      cpfCnpj: "123456789",
      email: "edu@email.com",
    } as ICreateUserData);
    expect(response).rejects.toEqual(new AlreadyExistsError("email"));
  });

  test("should throw if cpfCnpj already being used", async () => {
    const { userRepository, createUserUsecase } = makeSut();
    userRepository.cpfCnpjAlreadyExists = true;
    const response = createUserUsecase.execute({
      cpfCnpj: "123456789",
      email: "edu@email.com",
    } as ICreateUserData);
    expect(response).rejects.toEqual(new AlreadyExistsError("cpf | cnpj"));
  });

  test("should call encrypter with correct value", async () => {
    const { createUserUsecase, encrypter } = makeSut();
    await createUserUsecase.execute({
      cpfCnpj: "123456789",
      email: "edu@email.com",
      password: "pass",
    } as ICreateUserData);
    expect(encrypter.input).toBe("pass");
  });

  test("should call tokenGenerator with correct values", async () => {
    const { createUserUsecase, tokenGenerator } = makeSut();
    const values = {
      cpfCnpj: "123456789",
      email: "edu@email.com",
      password: "1234",
      name: "1234",
      id: "123",
    } as ICreateUserData;
    await createUserUsecase.execute(values as ICreateUserData);
    const { password, ...rest } = values;
    expect(tokenGenerator.input).toEqual(rest);
  });

  test("should call userRepository.create with corrects values", async () => {
    const { createUserUsecase, tokenGenerator } = makeSut();
    const values = {
      cpfCnpj: "123456789",
      email: "edu@email.com",
      password: "1234",
      name: "1234",
      id: "123",
    } as ICreateUserData;
    await createUserUsecase.execute(values as ICreateUserData);
    const { password, ...rest } = values;
    expect(tokenGenerator.input).toEqual(rest);
  });
});
