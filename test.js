var c=document.getElementById("myCanvas1");
var ctx=c.getContext("2d");
var time=12.5;
var hovedTime=setInterval("updatePos()",time);
var kjør = true;
var kule = new Array();
const ANTALL = 500;
const SX = c.width/2;
const SY = c.height/2;
const G = 9.81;

var teller = 0;
kule.push(new Array(),new Array(),new Array(),new Array());
kule[0].push(SX,SY,0);
kule[1].push(3*SX/2,3*SY/2,0);
kule[2].push(SX/4,SY/2,0);
kule[3].push(SX/2,3*SY/2,0);
var r = new Array();

rek = new Array();
/*for(var i=0; i<kule.length; i++)
{
	r.push(kule[i][2]); 
}*/
while(rek.length < ANTALL)
{
	rek.push(new object(c.width*Math.random(),c.height*Math.random(),5,5));
}
function object(x,y,w,h){
	this.x = x;
	this.y = y;
	this.width = w;
	this.height = h;
	this.rad = w;
	//this.fill="#00FF00";
	this.draw = draw;
	function draw(){
		ctx.beginPath();
		ctx.fillStyle=this.fill;
		//ctx.fillRect(this.x,this.y,this.width,this.height);
		ctx.arc(this.x,this.y,this.rad,0,2*Math.PI);
		//ctx.stroke();
		ctx.fill();
		ctx.closePath();
	}
}
function drawKule(r)
{
	for(var k=0; k<kule.length; k++)
	{	
		kule[k][0] += r[k]*(Math.cos(teller/10)/2);
		kule[k][1] += r[k]*(Math.sin(teller/10)/2);
		ctx.beginPath();
		ctx.arc(kule[k][0],kule[k][1],r[k],0,2*Math.PI);
		ctx.fill();
		ctx.closePath();
		/*kule[k][0] += r[k]*Math.cos(teller/10)/2;
		kule[k][1] += r[k]*Math.sin(teller/2)/2;*/
	}
}
object.prototype.fill =null;
object.prototype.fartx = 20;
object.prototype.farty = 20;
for(var i=0;i<rek.length;i++)
{
	var farge = '#'+Math.floor(16777215*Math.random()).toString(16);
	rek[i].fill = farge;
	rek[i].fartx = Math.round(Math.random()*rek[i].fartx)-(rek[i].fartx/2);
	rek[i].farty = Math.round(Math.random()*rek[i].farty)-(rek[i].farty/2);
}

function updatePos(){
	ctx.clearRect(0,0,c.width,c.height);
	var tell = new Array();
	tell[0] = 10;
	tell[1] = 20;
	tell[2] = 20;
	tell[3] = 20;
	if(tyngdeG == null) var tyngdeG = G;
	
	for(var i=0;i<rek.length;i++)
	{
		var avstand = new Array();
		var katetX = new Array();
		var katetY = new Array();
		var tooClose = Boolean(false);
		for(var j = 0; j < kule.length; j++) // Beregner avstand fra hver av de store kulene
		{
			katetX[j] = kule[j][0]-rek[i].x;
			katetY[j] = kule[j][1]-rek[i].y;
			avstand[j] = Math.sqrt(Math.pow(katetX[j],2)+Math.pow(katetY[j],2));
			tooClose = tooClose || avstand[j] < rek[i].rad || avstand[j] < tell[j]; // Sjekker om avstanden er 'for nærme'
		}
		
		if(!(tooClose))
		//if(avstand[0] > rek[i].rad && avstand[0] > tell[0] && avstand[1] > tell[0])
		{	
			for(var j = 0; j < avstand.length; j++) // Beregner aksellerasjon og endrer farten
			{
				var akselx = (tyngdeG/Math.pow(avstand[j],2))*Math.atan(katetX[j]/avstand[j]);
				var aksely = (tyngdeG/Math.pow(avstand[j],2))*Math.asin(katetY[j]/avstand[j]);
				rek[i].fartx += akselx;
				rek[i].farty += aksely;
			}

			rek[i].x += rek[i].fartx;
			rek[i].y += rek[i].farty;
			//drawKule(tell);
		}else
		{
			rek[i].akselx = 0;
			rek[i].aksely = 0;
			rek[i].fartx = 0;
			rek[i].farty = 0;
			rek[i].x = kule[0][0];
			rek[i].y = kule[0][1];
			if (tell[0] < 5)
			{
				for(var t=0; t<tell.length; t++)
				{
					tell[t]++;
				}
			}
			tyngdeG = G + (6.67*tell[0]*2)*100;
			//drawKule(tell);
			//continue;
		}
		rek[i].draw();
	}
	drawKule(tell);
	/*ctx.beginPath();
	ctx.arc(kule[0][0],kule[0][1],tell1,0,2*Math.PI);
	//ctx.stroke();
	ctx.fill();
	ctx.closePath();
	ctx.beginPath();
	ctx.arc(kule[1][0],kule[1][1],tell1,0,2*Math.PI);
	ctx.fill();
	ctx.closePath();*/
	teller++;
	
}
function stopp(){
	var tuller = 0;
	while(tuller < rek.length)
	{
		rek[tuller].farty += rek[tuller].fartx;
		rek[tuller].fartx = 0;
		tuller++;
	}
	//alert(rek[29].fartx);
	switch(kjør){
		case true: clearInterval(hovedTime); kjør=false; break;
		case false: hovedTime=setInterval("updatePos()",time); kjør=true; break;
	}
}