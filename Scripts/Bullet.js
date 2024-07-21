class Bullet{
    constructor(player, gunObject, bulletSize){
        this.player = player;
        this.gunObject = gunObject;
        this.bulletSize = bulletSize;
        // Mesh
        this.object = null;
        // velocity vector
        this.velocity = null;
        // life
        this.life = 0.4;
        this.init();
    }
    
    init(){
        const geometry = new THREE.BoxGeometry(this.bulletSize, this.bulletSize, this.bulletSize);
        const material = new THREE.MeshBasicMaterial({color: 0xEF5A6F});
        const bullet = new THREE.Mesh(geometry, material);
        
        this.object = bullet;
        // set position of bullet
        this.gunObject.getWorldPosition(this.object.position);
        
        // set velocity vector
        const velocityVector = new THREE.Vector3();
        this.velocity = this.player.getWorldDirection(velocityVector);
        
        // add bullet to world
        WORLD.add(this.object);
    }
    
    update(dt){
        if(!this.object || !this.velocity){
            return;
        }else{
            this.object.position.add(this.velocity);
            this.life -= dt;
            
            if(this.life < 0){
                this.object.removeFromParent();
            }
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

