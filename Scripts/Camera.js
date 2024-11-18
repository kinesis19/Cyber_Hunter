// //카메라가 플레이어 위치로부터 떨어진 거리, 로테이션 값
const CAMERA_POSITION_WEIGHT_Y = 80; 
const CAMERA_ROTATION_X = -90;
const CAMERA_ROTATION_Z = 0;

const avatar = REDBRICK.AvatarManager.createDefaultAvatar();
const camera = WORLD.getObject("MainCamera");
avatar.setDefaultController();

//카메라 Y값 및 로테이션 초기값 설정.
camera.position.y = CAMERA_POSITION_WEIGHT_Y;
camera.rotation.set(toRadians(CAMERA_ROTATION_X), 0, toRadians(CAMERA_ROTATION_Z)); //rotation.set() 메소드는 매개변수를 라디안으로 입력 받음.

// Degree (도)를 Radian (라디안)으로 변환하는 함수.
function toRadians(degrees) {
  return degrees * Math.PI / 180;
}

//매 프레임 마다 카메라의 X와 Z값을 플레이어로부터 일정한 거리로 업데이트 해줌.
function Update(){
    camera.position.x = avatar.position.x;
    camera.position.z = avatar.position.z;
}