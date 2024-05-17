import { Request } from "@hapi/hapi";
import { ResponseToolkit } from "@hapi/hapi/lib/types";
import { Customer } from "../../customer/domain/models/customer.model";
import { appDataSource } from "../../db/database";
import { LoginInput } from "../types/login-input";
import { JwtPayload } from "auth/types/jwt-payload";
import { generateJwtTokenAsync, checkValidations } from "./auth.service";

/*

********************** LOGIN LOGIC ********************** 

1. Extract the email and password from the req.payload object
2. Find a customer with the specified email address.
3. If the customer logins first time and customer's email has not been verified, update customer's emailVerified = true
4. Check if the password is valid.
5. If the password is invalid, return a 403 status code.
6. Generate a JWT token using the generateJwtTokenAsync function based on customer's information.
7. Return the JWT token back.

*/

export const login = async (req: Request, h: ResponseToolkit) => {
  const queryRunner = appDataSource.createQueryRunner();

  try {
    const { email, password } = req.payload as LoginInput;

    const customer: Customer = await queryRunner.manager.findOne(Customer, {
      where: { email },
    });

    // Verify Account in First Login
    if (!customer.emailVerified) {
      customer.emailVerified = true;
      await queryRunner.manager.save(Customer, customer);
    }

    const validationError = await checkValidations(password, customer);

    if (validationError) {
      return h.response(validationError).code(403);
    }

    const jwtPayload: JwtPayload = {
      id: customer.id,
      email: customer.email,
      firstName: customer.firstName,
      lastName: customer.lastName,
      gsmNumber: customer.gsmNumber,
      balance: customer.balance,
    };

    const JWTToken = generateJwtTokenAsync(jwtPayload);

    return h.response(JWTToken);
  } catch (error) {
    console.error("Error processing Purchase:", error);
    return h.response("Error processing Purchase").code(500);
  }
};
