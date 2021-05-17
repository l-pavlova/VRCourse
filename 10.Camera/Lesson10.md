# Camera motion
- WebRTC (Web Real Time Communications) for real time access to camera and mic
- user permission for access
- getUserMedia()
- to turn an image black and white, use weights: 0.3𝑅+0.6𝐺+0.1𝐵
```
	function convert()
		{
			var img = document.getElementsByTagName('img')[0],
				canvas = document.getElementsByTagName('canvas')[0],
				context = canvas.getContext('2d');
			
			// image resize
			canvas.width = img.clientWidth;
			canvas.height = img.clientHeight;
			
			context.drawImage( img, 0, 0 );
			
			// color picking
			var image = context.getImageData( 0, 0, img.clientWidth, img.clientHeight ),
				data = image.data;
				
			// black and white transformation
			for( var i=0; i<data.length; i+=4 )
			{
				var r = data[i+0],
					g = data[i+1],
					b = data[i+2];
					
				var bw = Math.round(0.3*r+0.6*g+0.1*b);
				
				data[i+0] = bw;
				data[i+1] = bw;
				data[i+2] = bw;
			}

			// redraw
			context.putImageData( image, 0, 0 );
	}
```