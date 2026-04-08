import { StaticObject } from "base-experience";
import * as THREE from "three";

export default class Wall extends StaticObject {
  setGeometry() {
    this.geometry = new THREE.BoxGeometry(10, 2, 0.5);
  }
}
