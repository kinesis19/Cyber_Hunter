function Start() {
	this.equipped = false;
}

function Update(dt) {
	if(this.equipped == true){
		return;
	}else{
		const dist = this.position.distanceTo(PLAYER.position);
		if(dist < 5){
			this.equipped = true;
			this.position.set(-0.5, 1, 0.5);
			this.scale.set(2, 2, 2);
			PLAYER.add(this);
		}
	}
	
}