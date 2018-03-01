let c = document.getElementById("c");
let ctx = c.getContext("2d");

    c.height = window.innerHeight;
    c.width = window.innerWidth;

let numbb = "0123456789abcdefghijklmnoprstuwxyz";

numbb = numbb.split("");

let font_size = 12;
let columns = c.width/font_size; 
let drops = [];

for(var x = 0; x < columns; x++)
	drops[x] = 1; 

function functionDraw() {
            ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
            ctx.fillRect(0, 0, c.width, c.height);
            
            ctx.fillStyle = "#0F0"; 
            ctx.font = font_size + "px Munro";
            for(let i = 0; i < drops.length; i++) {
                
                let text = numbb[Math.floor(Math.random()*numbb.length)];
                
                ctx.fillText(text, i*font_size, drops[i]*font_size);
                
                
                if(drops[i]*font_size > c.height && Math.random() > 0.975)
                    drops[i] = 0;
                
                drops[i]++;
            }
        }



