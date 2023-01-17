var video = document.querySelector('#videoElement');
var stopVideo = document.querySelector('#stop');
var canvas, ctx;

if (navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: true })
    .then(function (stream) {
      video.srcObject = stream;
    })
    .catch(function (error) {
      console.log('Something went wrong!');
    });
}

stopVideo.addEventListener('click', stop, false);

function stop(e) {
  var stream = video.srcObject;
  var tracks = stream.getTracks();

  for (var i = 0; i < tracks.length; i++) {
    var track = tracks[i];
    track.stop();
  }

  video.srcObject = null;
}

function init() {
  // Get the canvas and obtain a context for
  // drawing in it
  canvas = document.getElementById('myCanvas');
  ctx = canvas.getContext('2d');
}

function snapshot() {
  // Draws current image from the video element into the canvas
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
}

function getDocument() {
  console.log('trying to get mini app document');
  try {
    console.log('here we go');
    AlipayJSBridge.call(
      'downloadFile',
      {
        url: 'https://www.safaricom.co.ke/images/Amended-TsCs-Postpay-and-Prepay-Bundles.pdf',
      },
      ({ apFilePath }) => {
        AlipayJSBridge.call(
          'openDocument',
          {
            filePath: apFilePath,
            fileType: 'pdf',
          },
          ({ res }) => {
            console.log('res', res);
          }
        );
      }
    );
  } catch (error) {
    console.log('error', error);
    alert(error);
  }
}

function makePayBillPayment() {
  try {
    AlipayJSBridge.call(
      'payBill',
      {
        businessID: '1112223',
        billReference: '123456789',
        amount: '30.0',
        currency: 'KES', // currencyCode to be used - only KES supported for now
        reason: 'Electricity bill', // optional field
      },
      (res) => {
        console.log('success', res);
        alert(`paybill, ${JSON.stringify(res)}`);
        AlipayJSBridge(
          'alert',
          { title: 'Success', content: JSON.stringify(res) },
          () => {},
          () => {}
        );
        //
      },
      (res) => {
        alert(res);
        console.log(('errror', res));
        AlipayJSBridge(
          'alert',
          { title: 'Fail', content: JSON.stringify(res) },
          () => {},
          () => {}
        );
      }
    );
  } catch (error) {
    console.log('error', error);
    alert(error);
  }
}

function makeTillPayment() {
  try {
    AlipayJSBridge.call(
      'buyGoods',
      {
        tillNumber: '89900',
        amount: '25.0',
        currency: 'KES', // currencyCode to be used - only KES supported for now
        reason: 'Jon Groceries', // optional field
      },
      (res) => {
        alert(`BuyGoods ${JSON.stringify(res)}`);
        // AlipayJSBridge.alert({
        //   content: JSON.stringify(res),
        // });
      },
      (res) => {
        alert(res);
        AlipayJSBridge(
          'alert',
          {
            title: 'Fail',
            content: JSON.stringify(res),
          },
          () => {},
          () => {}
        );
      }
    );
  } catch (error) {
    console.log('error', error);
    alert(error);
  }
}
