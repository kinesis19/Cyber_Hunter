class Bullet {
    constructor(player, gunObject, bulletSize) {
        this.player = player;
        this.gunObject = gunObject;
        this.bulletSize = bulletSize;

        // Mesh for the bullet
        this.object = null;
        // Velocity vector for movement
        this.velocity = null;
        // Bullet life duration
        this.life = 0.4;

        this.init();
    }

    init() {
        // Create the bullet mesh
        const geometry = new THREE.BoxGeometry(this.bulletSize, this.bulletSize, this.bulletSize);
        const material = new THREE.MeshBasicMaterial({ color: 0xEF5A6F });
        const bullet = new THREE.Mesh(geometry, material);

        this.object = bullet;

        // Calculate the gun's current position and direction
        const gunPosition = new THREE.Vector3();
        const gunDirection = new THREE.Vector3();

        this.gunObject.getWorldPosition(gunPosition); // Get the gun's world position
        this.gunObject.getWorldDirection(gunDirection); // Get the gun's direction

        // Add an offset to the gun's position (forward direction)
        const offsetDistance = 2; // Distance in front of the gun
        const spawnPosition = gunPosition.add(gunDirection.multiplyScalar(offsetDistance));

        // Set the bullet's position to the calculated spawn position
        this.object.position.copy(spawnPosition);

        // Set the bullet's velocity in the same direction as the gun's direction
        this.velocity = gunDirection.clone().multiplyScalar(0.5); // Adjust speed

        // Add the bullet to the world
        WORLD.add(this.object);
    }

    update(dt) {
        if (!this.object || !this.velocity) return;

        // Move the bullet according to its velocity
        this.object.position.add(this.velocity);

        // Decrease bullet life over time
        this.life -= dt;

        // Remove the bullet if its life runs out
        if (this.life < 0) {
            this.object.removeFromParent();
        }
    }
}


let bulletSize = 1;
const bullets = [];
const gunObject = WORLD.getObject("Gun");

const fireProjectile = () => {
    const bullet = new Bullet(PLAYER, gunObject, bulletSize);
    bullets.push(bullet);
}
let duration = 1000;
function Start(){
    setInterval(() => {
        if(!gunObject.equipped){
            return;
        }else{
            fireProjectile();
        }
    }, duration);
}

function Update(dt){
    for(let i = 0; i < bullets.length; i++){
        bullets[i].update(dt);
        
        if(bullets[i].life < 0){
            bullets.splice(i, 1);
            i--;
        }else{
            REDBRICK.Signal.send("CHECK_ENEMY_HIT", {bullet: bullets[i]});
        }
    }
}

