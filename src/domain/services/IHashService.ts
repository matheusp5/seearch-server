export default interface IHashService {
  hash(k: string): string;
  compare(k: string, z: string): boolean
}