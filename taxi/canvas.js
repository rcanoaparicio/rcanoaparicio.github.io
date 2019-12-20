window.onload = () => {
  console.log('Taxi!');
  let canvas = document.getElementById('canvas');
  let ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const space = canvas.width / 20;

  dots = []

  streets = [];
  is_drawing = false;

  new_street = [[0, 0], [0, 0]];

  let points = []
  for (let i = 0; i < 20; ++i) {
    points[i] = []
    for (let j =0; j < 20; ++j) {
      points[i][j] = true;
    }
  }

  function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#FFFFFF";
    for (let y = space; y < canvas.height; y += space) {
      for (let x = space; x < canvas.width; x += space) {
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, 2 * Math.PI);
        ctx.fill();
      }
    }

    for (let i = 0; i < streets.length; i++) {
      let s = streets[i];
      ctx.strokeStyle = "#FFFFFF";
      ctx.lineWidth = 10;
      ctx.beginPath();
      ctx.moveTo(s[0][0]*space, s[0][1]*space);
      ctx.lineTo(s[1][0]*space, s[1][1]*space);
      ctx.stroke();
      ctx.fillStyle = "#FFFFFF";
      ctx.beginPath();
      ctx.arc(s[0][0]*space, s[0][1]*space, 5, 0, 2 * Math.PI);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(s[1][0]*space, s[1][1]*space, 5, 0, 2 * Math.PI);
      ctx.fill();
    }

    if (is_drawing) {
      ctx.strokeStyle = "#FFFFFF";
      ctx.lineWidth = 10;
      ctx.beginPath();
      ctx.moveTo(new_street[0][0]*space, new_street[0][1]*space);
      ctx.lineTo(new_street[1][0]*space, new_street[1][1]*space);
      ctx.stroke();
      ctx.fillStyle = "#FFFFFF";
      ctx.beginPath();
      ctx.arc(new_street[0][0]*space, new_street[0][1]*space, 10, 0, 2 * Math.PI);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(new_street[1][0]*space, new_street[1][1]*space, 10, 0, 2 * Math.PI);
      ctx.fill();
    }

  }

  function getDistance(a, b) {
    return sqrt((a[0]-b[0])^2 + (a[0]-b[0])^2);
  }

  function closestPoint(p) {
    let b = [canvas.width/2, canvas.height/2];
    let xx = Math.ceil((p[0] - space/2)/space);
    let yy = Math.ceil((p[1] - space/2)/space);
    draw();
    ctx.fillStyle = "#FFFFFF";
    ctx.beginPath();
    ctx.arc(xx*space, yy*space, 10, 0, 2 * Math.PI);
    ctx.fill();
  }

  canvas.addEventListener('mousemove', (evt) => {
    let mousePos = getMousePos(canvas, evt);
    if (is_drawing) {
      new_street[1] = [Math.ceil((mousePos.x- space/2)/space), Math.ceil((mousePos.y- space/2)/space)];
      //draw();
    }

    closestPoint([mousePos.x, mousePos.y]);

  });

  canvas.addEventListener('click', (evt) => {
    let mousePos = getMousePos(canvas, evt);
    if (is_drawing) {
      new_street[1] = [Math.ceil((mousePos.x- space/2)/space), Math.ceil((mousePos.y- space/2)/space)];
      if (new_street[0][0] == new_street[1][0] && new_street[0][1] == new_street[1][1]) return;
      is_drawing = false;
      streets.push([[new_street[0][0], new_street[0][1]], [new_street[1][0], new_street[1][1]]]);
      draw();
    }
    else {
      is_drawing = true;
      new_street[0] = [Math.ceil((mousePos.x- space/2)/space), Math.ceil((mousePos.y- space/2)/space)];
    }
  });


  draw();
}
