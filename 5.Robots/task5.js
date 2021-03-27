sceneInit();
sceneObjects();
scene.remove(object);

// седалка
var seat = robotElement(60, 5, 60);
seat.position.y = 60;
scene.add(seat);

const leg = robotElement(5, 30, 5, seat);
const legl = robotElement(5, 30, 5, leg);
//leg.position.y = -10;
leg.rotation.x = Math.PI;
leg.position.set(25, 0, 0);


const legr = robotElement(5, 30, 5, seat);
const legrl = robotElement(5, 30, 5, legr);

legr.rotation.x = Math.PI;
legr.position.x = -25;

function animate() {
    /*
        const angle = 0.5 + 0.5 * Math.sin(t);// so it's between 0 and 1
        seat.position.y = 60 * Math.cos(angle);//between 0 and 60
    
        leg.rotation.z = -angle;//upper half moves one direction, lower half moves the other
        legl.rotation.z = 2 * angle;
    
        legr.rotation.z = angle;
        legrl.rotation.z = -2 * angle;
    
    */

    //JUMPING 
    const angle = 0.5 + 0.5 * Math.sin(t);
    seat.position.y = 30+60*Math.abs(Math.cos(3*t));//bigger alpha in cos, faster changing cos, faster movement, bigger k, bigger tragectory

    let ang = 0, vibe=0;
    if(seat.position.y <60)//bend legs 
    {
        ang = Math.acos(seat.position.y/60)
    } else {
        vibe = (seat.position.y-60)/150;
        vibe *= vibe;
    }
    leg.rotation.z = -ang - vibe *Math.sin(80*t);///vibe makes it just vibe ya know
    legl.rotation.z = 2 * ang;
    
    legr.rotation.z = ang - vibe *Math.sin(80*t);
    legrl.rotation.z = -2 * ang;

    scene.rotation.y = t / 10;
}