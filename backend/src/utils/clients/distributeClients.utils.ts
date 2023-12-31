import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Client, Operator } from "../../entities";
import { IclientsRequest } from "../../interfaces/clients.interfaces";

export const distributeClients = async (
  listClients: Client[] | IclientsRequest[]
): Promise<void> => {
  const operatorRepository: Repository<Operator> =
    AppDataSource.getRepository(Operator);

  const clientRepository: Repository<Client> =
    AppDataSource.getRepository(Client);

  const listOperators = await operatorRepository.find({
    relations: {
      clients: true,
    },
  });

  const totalOperators = listOperators.length - 1;
  let countOperators = 0;

  listOperators.sort((operatorA, operatorB) => {
    const clientsLengthDiff =
      operatorA.clients.length - operatorB.clients.length;
    if (clientsLengthDiff !== 0) {
      return clientsLengthDiff;
    } else {
      return operatorA.id - operatorB.id;
    }
  });

  const listClientToCreate = listClients.map((client) => {
    const newCLient = clientRepository.create({
      ...client,
      operator: listOperators[countOperators],
    });

    if (totalOperators == countOperators) {
      countOperators = 0;
    } else {
      countOperators++;
    }

    return newCLient;
  });

  await AppDataSource.createQueryBuilder()
    .insert()
    .into(Client)
    .values(listClientToCreate)
    .execute();
};
