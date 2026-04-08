import { Environment, Experience, Floor, World } from "base-experience";
import type FirstPersonCameraOctree from "../../camera/FirstPersonCameraOctree";
import Wall from "../objects/Wall";

export default class NatureWorld extends World {
  declare experience: Experience;
  declare environment: Environment;
  declare resources: Experience["resources"];
  declare floor: Floor;
  declare wall: Wall;

  init() {
    super.init();
    this.floor = new Floor();
    this.floor.mesh.position.y = -5;
    this.wall = new Wall();
    this.wall.mesh.position.y = -5;
    this.environment = new Environment();

    const camera = Experience.instance?.camera as FirstPersonCameraOctree;
    if (camera.worldOctree) {
      camera.worldOctree.fromGraphNode(this.floor.mesh);
      camera.worldOctree.fromGraphNode(this.wall.mesh);
    }
  }
}
