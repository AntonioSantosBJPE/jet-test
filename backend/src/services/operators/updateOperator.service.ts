import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Operator } from "../../entities";
import { TrequestCreateOperator } from "../../interfaces/operators.interfaces";

export const updateOperatorService = async (
  operator: Operator,
  body: TrequestCreateOperator
): Promise<Operator> => {
  const operatorRepository: Repository<Operator> =
    AppDataSource.getRepository(Operator);

  const operatorUpdate = operatorRepository.create({ ...operator, ...body });

  await operatorRepository.save(operatorUpdate);

  return operatorUpdate;
};
