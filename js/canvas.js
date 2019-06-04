const default_json = {
  'width': 650,
  'height': 500,
  'background': {
    'type': 'color',
    'data': 'lightblue'
  },
  'elements': [
    {
      'type': 'text',
      'content': 'Fill',
      'color': 'black',
      'fill': true,
      'font': '25px Arial',
      'position': [2, 50]
    },
    {
      'type': 'rectangle',
      'color': 'red',
      'fill': true,
      'start': [40, 0],
      'end': [120, 80]
    },
    {
      'type': 'circle',
      'color': 'red',
      'fill': true,
      'center': [180, 40],
      'radius': 40
    },
    {
      'type': 'text',
      'content': 'No',
      'color': 'black',
      'font': '25px Arial',
      'position': [2, 140]
    },
    {
      'type': 'text',
      'content': 'Fill',
      'color': 'black',
      'font': '25px Arial',
      'position': [2, 160]
    },
    {
      'type': 'rectangle',
      'color': 'blue',
      'start': [40, 100],
      'end': [120, 180]
    },
    {
      'type': 'circle',
      'color': 'blue',
      'center': [180, 140],
      'radius': 40
    },
    {
      'type': 'text',
      'content': 'Other',
      'color': 'black',
      'fill': true,
      'font': '17px Arial',
      'position': [2, 250]
    },
    {
      'type': 'line',
      'color': 'red',
      'start': [40, 200],
      'end': [120, 280]
    },
    {
      'type': 'image',
      'url': 'image.png',
      'position': [140, 200]
    }
  ]
};

const optionalFill = ['rectangle', 'circle', 'text'];

class Canvas {
  
  constructor(img='') {
    
    this.canvas = document.createElement("canvas");
    document.getElementById('canvas').appendChild(this.canvas);
    
    this.ctx = this.canvas.getContext('2d');

    this.textarea = document.createElement("textarea");
    
    this.textarea.value = JSON.stringify(default_json, null, 2);
    this.textarea.onkeyup = function() {
      
      window.image.render();
      
    };
    
    document.getElementById('textarea').appendChild(this.textarea);
    
    this.render();
    
  }
  
  render() {
    
    try {
      
      const json = JSON.parse(this.textarea.value);
    
      const canvas = this.canvas;
      const ctx = this.ctx;
    
      canvas.height = json.height;
      canvas.width = json.width;
      
      if(json.background.type === 'color') {
        ctx.fillStyle = json.background.data;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    
      json.elements.forEach(function(element) {
        
        if(element.type === 'line') {
          
          ctx.strokeStyle = element.color;
          
          ctx.moveTo(element.start[0], element.start[1]);
          ctx.lineTo(element.end[0], element.end[1]);
          
          ctx.stroke();
          
        } else if(element.type === 'image') {
          
          let img = new Image();
          
          img.onload = function() {
            ctx.drawImage(img, element.position[0], element.position[1]);
          }
          
          img.src = element.url;
          
        } else if(optionalFill.includes(element.type)) {
          
          ctx.fillStyle = element.color;
          ctx.strokeStyle = element.color;
          
          if(element.type === 'rectangle') {
            
            const s = element.start;
            element.end[0] = element.end[0] - s[0];
            element.end[1] = element.end[1] - s[1];
            const e = element.end;
            
            if(element.fill) ctx.fillRect(s[0], s[1], e[0], e[1]);
            ctx.strokeRect(s[0], s[1], e[0], e[1]);
          
          } else if(element.type === 'circle') {
          
            ctx.beginPath();
          
            ctx.arc(element.center[0], element.center[1], element.radius, 0, 2 * Math.PI);
            
            if(element.fill) ctx.fill();
            ctx.stroke();
          
          } else if(element.type === 'text') {
            
            ctx.font = element.font;
            
            if(element.fill) ctx.fillText(element.content, element.position[0], element.position[1]);
            ctx.strokeText(element.content, element.position[0], element.position[1])
            
          }
          
        }
        
      });
    
    } catch(e) {
      console.log(e);
    }
    
  }
  
}