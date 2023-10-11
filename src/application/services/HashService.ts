import IHashService from "../../domain/services/IHashService";
import bcrypt from "bcrypt"
import config from "../../infra/config";

export default class HashService implements IHashService {
  hash(k: string): string {
    const salt = bcrypt.genSaltSync(config.salt_rounds as number);
    return bcrypt.hashSync(k, salt);

  }
  compare(plain: string, hash: string): boolean {
    return bcrypt.compareSync(plain, hash)
  }

} 