// SELECT CVS
const cvs = document.getElementById("bird");
const ctx = cvs.getContext("2d");

// GAME VARS AND CONSTS
let frames = 0;
const DEGREE = Math.PI / 180;

// LOAD SPRITE IMAGE
const sprite = new Image();
sprite.src = "img/sprite(custom).png";

const welcomeSprite = new Image();
welcomeSprite.src = "img/wellSprite.png";

const startSprites = [
  "img/mewn.png",
  "img/valle.png",
  "img/houseSun.png",
  "img/land.png",  
  "img/buidl.png",
  "img/Naturo.png",
  "img/reddawn.png",
  "img/dawn.png",
]

const startSprite = new Image()
startSprite.src = startSprites[Math.floor(Math.random() * startSprites.length)];

// LOAD SOUNDS

const SCORE_S = new Audio();
SCORE_S.src = "audio/sfx_point.wav";
SCORE_S.volume = 0.4;

const FLAP = new Audio();
FLAP.src = "audio/sfx_flap.wav";
FLAP.volume = 0.4;

const HIT = new Audio();
HIT.src = "audio/sfx_hit.wav";
HIT.volume = 0.4;

const SWOOSHING = new Audio();
SWOOSHING.src = "audio/sfx_swooshing.wav";
SWOOSHING.volume = 0.4;

const DIE = new Audio();
DIE.src = "audio/sfx_die.wav";
DIE.volume = 0.4;

const MUSIC = new Audio();
MUSIC.src = "audio/8bitAstley.mp3";
MUSIC.loop = true;
MUSIC.volume = 0.4;



// GAME STATE
const state = {
  current: 0,
  getReady: 0,
  game: 1,
  over: 2,
};

// START BUTTON COORD
const startBtn = {
  x: 120,
  y: 263,
  w: 83,
  h: 29,
};



// CONTROL THE GAME
cvs.addEventListener("click", function (evt) {
  evt.preventDefault();
  switch (state.current) {
    case state.getReady:
      state.current = state.game;
      SWOOSHING.play(); 
      MUSIC.play();     
      break;
    case state.game:
      if (bird.y - bird.radius <= 0) return;
      bird.flap();
      FLAP.play();
      break;
    case state.over:
      let rect = cvs.getBoundingClientRect();
      let clickX = evt.clientX - rect.left;
      let clickY = evt.clientY - rect.top;

      // CHECK IF WE CLICK ON THE START BUTTON
      if (
        clickX >= startBtn.x &&
        clickX <= startBtn.x + startBtn.w &&
        clickY >= startBtn.y &&
        clickY <= startBtn.y + startBtn.h
      ) {
        pipes.reset();
        bird.speedReset();
        score.reset();
        state.current = state.getReady;
      }
      break;
  }
});

// Start Screen Image

const st = {
  sX: 0,
  sY: 0,
  w: 320,
  h: 480,
  x: 0,
  y: 0,

  draw: function () {
    ctx.drawImage(
      welcomeSprite,
      this.sX,
      this.sY,
      this.w,
      this.h,
      this.x,
      this.y,
      this.w,
      this.h
    );

    ctx.drawImage(
      welcomeSprite,
      this.sX,
      this.sY,
      this.w,
      this.h,
      this.x + this.w,
      this.y,
      this.w,
      this.h
    );
  },
};

// BACKGROUND
const bg = {
  sX: 0,
  sY: 0,
  w: 320,
  h: 480,
  x: 0,
  y: 0,

  draw: function () {
    ctx.drawImage(
      startSprite,
      this.sX,
      this.sY,
      this.w,
      this.h,
      this.x,
      this.y,
      this.w,
      this.h
    );

    ctx.drawImage(
      sprite,
      this.sX,
      this.sY,
      this.w,
      this.h,
      this.x + this.w,
      this.y,
      this.w,
      this.h
    );
  },
};
// LOGO
const logo = {
  sX: 320,
  sY: 0,
  w: 206,
  h: 40,
  x: cvs.width / 2 - 206 / 2,
  y: cvs.height / 5,

  // Animation variables
  animationOffsetX: 0,
  animationOffsetY: 0,
  animationSpeedX: 0.1,
  animationSpeedY: 0.2,
  animationRangeX: 5,
  animationRangeY: 3,
  initialWidth: 206,
  initialHeight: 40,

  draw: function () {
    if (state.current == state.getReady) {      
      // Update animation offsets
      this.animationOffsetX += this.animationSpeedX;
      this.animationOffsetY += this.animationSpeedY;

      // Calculate the scaled width and height based on animation offsets
      const scaledWidth = this.initialWidth + Math.sin(this.animationOffsetX) * this.animationRangeX;
      const scaledHeight = this.initialHeight + Math.sin(this.animationOffsetY) * this.animationRangeY;

      // Calculate the position of the logo so that it remains centered
      const logoX = this.x + (this.w - scaledWidth) / 2;
      const logoY = this.y + (this.h - scaledHeight) / 2;

      // Draw the logo with the scaled width and height
      ctx.drawImage(
        welcomeSprite,
        this.sX,
        this.sY,
        this.w,
        this.h,
        logoX,
        logoY,
        scaledWidth,
        scaledHeight
      );
    }
  },
};

// LOGO Pepe
const logoPepe = {
  sX: 320,
  sY: 40,
  w: 60,
  h: 85,
  x: cvs.width / 2 - 60 / 2,
  y: cvs.height / 3 + 50,

  // Floating motion variables
  floatOffset: 0,
  floatSpeed: 0.1,
  floatRange: 10,

  draw: function () {
    if (state.current == state.getReady) {
      // Update the y position with the floating motion
      this.y = cvs.height / 3 + 50 + Math.sin(this.floatOffset) * this.floatRange;
      this.floatOffset += this.floatSpeed;
      
      ctx.drawImage(
        welcomeSprite,
        this.sX,
        this.sY,
        this.w,
        this.h,
        this.x,
        this.y,
        this.w,
        this.h
      );
    }
  },
};

// FOREGROUND
const fg = {
  sX: 276,
  sY: 0,
  w: 224,
  h: 112,
  x: 0,
  y: cvs.height - 112,

  dx: 2,

  draw: function () {
    ctx.drawImage(
      sprite,
      this.sX,
      this.sY,
      this.w,
      this.h,
      this.x,
      this.y,
      this.w,
      this.h
    );

    ctx.drawImage(
      sprite,
      this.sX,
      this.sY,
      this.w,
      this.h,
      this.x + this.w,
      this.y,
      this.w,
      this.h
    );
  },

  update: function () {
    if (state.current == state.game) {
      this.x = (this.x - this.dx) % (this.w / 2);
    }
  },
};

// PEPE
const bird = {
  animation: [
    { sX: 279, sY: 139 },
    { sX: 279, sY: 139 },
    { sX: 279, sY: 139 },
    { sX: 279, sY: 139 },
  ],
  x: 50,
  y: 150,
  w: 32,
  h: 51,

  radius: 12,

  frame: 0,

  gravity: 0.18,
  jump: 3.75,
  speed: 0,
  rotation: 0,

  draw: function () {
    let bird = this.animation[this.frame];

    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.drawImage(
      sprite,
      bird.sX,
      bird.sY,
      this.w,
      this.h,
      -this.w / 2,
      -this.h / 2,
      this.w,
      this.h
    );

    ctx.restore();
  },

  flap: function () {
    this.speed = -this.jump;
  },

  update: function () {
    // IF THE GAME STATE IS GET READY STATE, THE BIRD MUST FLAP SLOWLY
    this.period = state.current == state.getReady ? 10 : 5;
    // WE INCREMENT THE FRAME BY 1, EACH PERIOD
    this.frame += frames % this.period == 0 ? 1 : 0;
    // FRAME GOES FROM 0 To 4, THEN AGAIN TO 0
    this.frame = this.frame % this.animation.length;

    if (state.current == state.getReady) {
      this.y = 150; // RESET POSITION OF THE BIRD AFTER GAME OVER
      this.rotation = 0 * DEGREE;
    } else {
      this.speed += this.gravity;
      this.y += this.speed;

      if (this.y + this.h / 2 >= cvs.height - fg.h) {
        this.y = cvs.height - fg.h - this.h / 2;
        if (state.current == state.game) {
          state.current = state.over;
          DIE.play();
        }
      }

      // IF THE SPEED IS GREATER THAN THE JUMP MEANS THE BIRD IS FALLING DOWN
      if (this.speed >= this.jump) {
        this.rotation = 30 * DEGREE;
        this.frame = 1;
      } else {
        this.rotation = -15 * DEGREE;
      }
    }
  },
  speedReset: function () {
    this.speed = 0;
  },
};


// GET READY MESSAGE
const getReady = {
  sX: 0,
  sY: 0,
  w: 320,
  h: 480,
  x: 0,
  y: 0,

  draw: function () {
    if (state.current == state.getReady) {
      ctx.drawImage(
        welcomeSprite,
        this.sX,
        this.sY,
        this.w,
        this.h,
        this.x,
        this.y,
        this.w,
        this.h
      );
    }
  },
};

// GAME OVER MESSAGE
const gameOver = {
  sX: 175,
  sY: 228,
  w: 225,
  h: 202,
  x: cvs.width / 2 - 225 / 2,
  y: 90,

  draw: function () {
    if (state.current == state.over) {
      ctx.drawImage(
        sprite,
        this.sX,
        this.sY,
        this.w,
        this.h,
        this.x,
        this.y,
        this.w,
        this.h
      );
    }
  },
};


// PIPES
const pipes = {
  position: [],

  top: {
    sX: 553,
    sY: 0,
  },
  bottom: {
    sX: 502,
    sY: 0,
  },

  w: 53,
  h: 400,
  gap: 100,
  maxYPos: -150,
  dx: 2,

  draw: function () {
    for (let i = 0; i < this.position.length; i++) {
      let p = this.position[i];

      let topYPos = p.y;
      let bottomYPos = p.y + this.h + this.gap;

      // top pipe
      ctx.drawImage(
        sprite,
        this.top.sX,
        this.top.sY,
        this.w,
        this.h,
        p.x,
        topYPos,
        this.w,
        this.h
      );

      // bottom pipe
      ctx.drawImage(
        sprite,
        this.bottom.sX,
        this.bottom.sY,
        this.w,
        this.h,
        p.x,
        bottomYPos,
        this.w,
        this.h
      );
    }
  },

  update: function () {
    if (state.current !== state.game) return;

    if (frames % 100 == 0) {
      this.position.push({
        x: cvs.width,
        y: this.maxYPos * (Math.random() + 1),
      });
    }
    for (let i = 0; i < this.position.length; i++) {
      let p = this.position[i];

      let bottomPipeYPos = p.y + this.h + this.gap;

      // COLLISION DETECTION
      // TOP PIPE
      if (
        bird.x + bird.radius > p.x &&
        bird.x - bird.radius < p.x + this.w &&
        bird.y + bird.radius > p.y &&
        bird.y - bird.radius < p.y + this.h
      ) {
        state.current = state.over;
        HIT.play();
      }
      // BOTTOM PIPE
      if (
        bird.x + bird.radius > p.x &&
        bird.x - bird.radius < p.x + this.w &&
        bird.y + bird.radius > bottomPipeYPos &&
        bird.y - bird.radius < bottomPipeYPos + this.h
      ) {
        state.current = state.over;
        HIT.play();
      }

      // MOVE THE PIPES TO THE LEFT
      p.x -= this.dx;

      // if the pipes go beyond canvas, we delete them from the array
      if (p.x + this.w <= 0) {
        this.position.shift();
        score.value += 1;
        SCORE_S.play();
        score.best = Math.max(score.value, score.best);
        localStorage.setItem("best", score.best);
      }
    }
  },

  reset: function () {
    this.position = [];
  },
};

// MEDALS
const medals = [
  {
    scoreThreshold: 30,
    sX: 311,
    sY: 111,
    w: 45,
    h: 45,
    x: 71,
    y: 178,
  },
  {
    scoreThreshold: 20,
    sX: 311,
    sY: 158,
    w: 45,
    h: 45,
    x: 71,
    y: 178,
  },
  {
    scoreThreshold: 10,
    sX: 359,
    sY: 112,
    w: 45,
    h: 45,
    x: 71,
    y: 178,
  },
  {
    scoreThreshold: 5,
    sX: 359,
    sY: 158,
    w: 45,
    h: 45,
    x: 71,
    y: 178,
  },
];

// SCORE
const score = {
  best: parseInt(localStorage.getItem("best")) || 0,
  value: 0,
  medal: null,

  draw: function () {
    ctx.fillStyle = "#FFF";
    ctx.strokeStyle = "#000";

    if (state.current === state.game) {
      ctx.lineWidth = 2;
      ctx.font = "35px Teko";
      ctx.fillText(this.value, cvs.width / 2, 50);
      ctx.strokeText(this.value, cvs.width / 2, 50);
    } else if (state.current === state.over) {
      // SCORE VALUE
      ctx.font = "25px Teko";
      ctx.fillText(this.value, 225, 186);
      ctx.strokeText(this.value, 225, 186);
      // BEST SCORE
      ctx.fillText(this.best, 225, 228);
      ctx.strokeText(this.best, 225, 228);

      // MEDAL
      if (this.medal) {
        ctx.drawImage(
          sprite,
          this.medal.sX,
          this.medal.sY,
          this.medal.w,
          this.medal.h,
          this.medal.x,
          this.medal.y,
          this.medal.w,
          this.medal.h
        );
      }
    }
  },

  reset: function () {
    this.value = 0;
  },

  checkForMedal: function () {
    for (const medalData of medals) {
      if (this.value >= medalData.scoreThreshold) {
        this.medal = medalData;
        break;
      }
    }
  },
};


// DRAW
function draw() {
  
  bg.draw();
  pipes.draw();
  fg.draw();
  bird.draw();
  getReady.draw();
  gameOver.draw();
  score.draw();  
  logo.draw();
  logoPepe.draw();
}


// UPDATE
function update() {
  bird.update();
  fg.update();
  pipes.update();
  score.checkForMedal();
}

// LOOP
function loop() {
  // Play Music on start
  if (state.current === state.getReady) {
    MUSIC.play();
  }
  update();
  draw();
  frames++;

  requestAnimationFrame(loop);
}
loop();
