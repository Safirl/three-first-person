import { Environment, Experience, Floor, World } from "base-experience";

export default class NatureWorld extends World {
  declare experience: Experience;
  declare environment: Environment;
  declare resources: Experience["resources"];
  declare floor: Floor;

  onResourcesLoaded() {
    this.floor = new Floor();
    this.floor.mesh.position.y = -5;
    this.environment = new Environment();
  }
}
