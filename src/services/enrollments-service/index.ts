<<<<<<< HEAD
import { request } from "@/utils/request";
import { notFoundError, requestError } from "@/errors";
=======
import { AddressEnrollment } from "@/protocols";
import { getAddress } from "@/utils/cep-service";
import { notFoundError } from "@/errors";
>>>>>>> 37c1102d7f1349f679ba1046f56e480624bbbc6b
import addressRepository, { CreateAddressParams } from "@/repositories/address-repository";
import enrollmentRepository, { CreateEnrollmentParams } from "@/repositories/enrollment-repository";
import { exclude } from "@/utils/prisma-utils";
import { Address, Enrollment } from "@prisma/client";
<<<<<<< HEAD
import { ViaCEPAddress } from "@/protocols";

async function getAddressFromCEP(cep: string): Promise<ViaCEPAddress> {
  const result = await request.get(`https://viacep.com.br/ws/${cep}/json/`);

  if (!result.data) {
    throw notFoundError();
  }

  const info: ViaCEPAddress = {
    logradouro: result.data.logradouro,
    complemento: result.data.complemento,
    bairro: result.data.bairro,
    localidade: result.data.localidade,
    uf: result.data.uf,
  }

  return result.data
=======

async function getAddressFromCEP(cep: string): Promise<AddressEnrollment> {
  const result = await getAddress(cep);

  if (!result) {
    throw notFoundError();
  }

  const {
    bairro,
    localidade,
    uf,
    complemento,
    logradouro
  } = result;

  const address = {
    bairro,
    cidade: localidade,
    uf,
    complemento,
    logradouro
  };

  return address;
>>>>>>> 37c1102d7f1349f679ba1046f56e480624bbbc6b
}

async function getOneWithAddressByUserId(userId: number): Promise<GetOneWithAddressByUserIdResult> {
  const enrollmentWithAddress = await enrollmentRepository.findWithAddressByUserId(userId);

  if (!enrollmentWithAddress) throw notFoundError();

  const [firstAddress] = enrollmentWithAddress.Address;
  const address = getFirstAddress(firstAddress);

  return {
    ...exclude(enrollmentWithAddress, "userId", "createdAt", "updatedAt", "Address"),
    ...(!!address && { address }),
  };
}

type GetOneWithAddressByUserIdResult = Omit<Enrollment, "userId" | "createdAt" | "updatedAt">;

function getFirstAddress(firstAddress: Address): GetAddressResult {
  if (!firstAddress) return null;

  return exclude(firstAddress, "createdAt", "updatedAt", "enrollmentId");
}

type GetAddressResult = Omit<Address, "createdAt" | "updatedAt" | "enrollmentId">;

async function createOrUpdateEnrollmentWithAddress(params: CreateOrUpdateEnrollmentWithAddress) {
  const enrollment = exclude(params, "address");
  const address = getAddressForUpsert(params.address);
<<<<<<< HEAD

  //TODO - Verificar se o CEP é válido
=======
  const result = await getAddressFromCEP(address.cep);

  if (result.error) {
    throw notFoundError();
  }

>>>>>>> 37c1102d7f1349f679ba1046f56e480624bbbc6b
  const newEnrollment = await enrollmentRepository.upsert(params.userId, enrollment, exclude(enrollment, "userId"));

  await addressRepository.upsert(newEnrollment.id, address, address);
}

function getAddressForUpsert(address: CreateAddressParams) {
  return {
    ...address,
    ...(address?.addressDetail && { addressDetail: address.addressDetail }),
  };
}

export type CreateOrUpdateEnrollmentWithAddress = CreateEnrollmentParams & {
  address: CreateAddressParams;
};

const enrollmentsService = {
  getOneWithAddressByUserId,
  createOrUpdateEnrollmentWithAddress,
  getAddressFromCEP
};

export default enrollmentsService;
