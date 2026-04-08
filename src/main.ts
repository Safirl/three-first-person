import "./reset.css";
import "./style.css";
import {
  Experience,
  TemplateWorld,
  type InputEventArgs,
  type InputProfile,
} from "base-experience";
import { templateSources } from "base-experience";
import {
  BitControllerProfile,
  keyboardProfile,
} from "./templates/inputs/inputProfiles";
import NatureWorld from "./templates/world/NatureWorld";
import FirstPersonCameraOctree from "./camera/FirstPersonCameraOctree";

const init = () => {
  const canvas: HTMLCanvasElement = document.getElementById(
    "three",
  ) as HTMLCanvasElement;
  if (!canvas) {
    console.error("no canvas found with three identifier");
    return;
  }

  canvas.style.width = "100%";
  canvas.style.height = "100%";

  // const world = new TemplateWorld();
  const natureWorld = new NatureWorld();

  const camera = new FirstPersonCameraOctree();
  const experience = new Experience(
    canvas,
    templateSources,
    camera,
    natureWorld,
  );
  const profiles: InputProfile[] = [keyboardProfile, BitControllerProfile];

  experience.inputSystem.addInputProfiles(profiles);
  // experience.inputSystem.on("left", (args: InputEventArgs) => {
  //   const gamepad = args.controller as Gamepad
  //   if (typeof args.controller === typeof Gamepad) {
  //     console.log("controller: ", gamepad.id, " triggered: ", args.type)
  //   } else {
  //     console.log("controller: ", args.controller, " triggered: ", args.type)
  //   }
  // })
};

init();
