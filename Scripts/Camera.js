const CAMERA_POSITION_OFFSET = { x: 20, y: 30, z: -20 }; 
const CAMERA_LOOK_AT_OFFSET = { x: 0, y: 10, z: 0 }; 

const avatar = REDBRICK.AvatarManager.createDefaultAvatar();
const camera = WORLD.getObject("MainCamera");
avatar.setDefaultController();

// Convert degrees to radians
function toRadians(degrees) {
  return degrees * Math.PI / 180;
}

// Set up initial camera position relative to the avatar
function updateCameraPosition() {
  camera.position.set(
    avatar.position.x + CAMERA_POSITION_OFFSET.x,
    avatar.position.y + CAMERA_POSITION_OFFSET.y,
    avatar.position.z + CAMERA_POSITION_OFFSET.z
  );

  // Ensure the camera is looking at the avatar with an offset
  camera.lookAt(
    avatar.position.x + CAMERA_LOOK_AT_OFFSET.x,
    avatar.position.y + CAMERA_LOOK_AT_OFFSET.y,
    avatar.position.z + CAMERA_LOOK_AT_OFFSET.z
  );
}

// Update function to maintain the quarter-view perspective
function Update() {
  updateCameraPosition();
}

// Initialize the camera position
updateCameraPosition();
