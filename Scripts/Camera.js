const CAMERA_POSITION = { x: 0, y: 30, z: 0 }; 
const CAMERA_ROTATION = { x: -75, y: 0, z: 0 }; 

const avatar = REDBRICK.AvatarManager.createDefaultAvatar();
const camera = WORLD.getObject("MainCamera");
avatar.setDefaultController();

// Convert degrees to radians.
function toRadians(degrees) {
  return degrees * Math.PI / 180;
}

// Set camera position and rotation to the specified values.
camera.position.set(CAMERA_POSITION.x, CAMERA_POSITION.y, CAMERA_POSITION.z);
camera.rotation.set(
  toRadians(CAMERA_ROTATION.x), 
  toRadians(CAMERA_ROTATION.y), 
  toRadians(CAMERA_ROTATION.z)
);

// Update function to keep the camera following the avatar's X and Z positions
function Update() {
  camera.position.x = avatar.position.x;
  camera.position.z = avatar.position.z;
}
