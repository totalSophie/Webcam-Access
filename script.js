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
    // my.downloadFile({
    //   url: 'https://docs.prudentiallife.co.ke/assets/miniapp/terms_conditions/prutect.pdf',
    //   success({ apFilePath }) {
    //     console.log(apFilePath);
    //     my.openDocument({
    //       filePath: apFilePath,
    //       fileType: 'pdf',
    //       success: (res) => {
    //         console.log('failres', res);
    //       },
    //       fail: (res) => {
    //         console.log('failres', res);
    //       },
    //     });
    //   },
    //   fail(res) {
    //     console.log('error', res);
    //     alert(res);
    //     my.alert({
    //       content: res.errorMessage || res.error,
    //     });
    //   },
    // });
    // my.downloadFile({
    //   url: 'https://www.safaricom.co.ke/images/Amended-TsCs-Postpay-and-Prepay-Bundles.pdf',
    //   success({ apFilePath }) {
    //     console.log('success res 0', apFilePath);
    //     console.log(apFilePath);
    //     my.openDocument({
    //       filePath: apFilePath,
    //       fileType: 'pdf',
    //       success: (res) => {
    //         console.log('success res 1', res);
    //       },
    //       fail: (res) => {
    //         console.log(' fail error 1', res);
    //       },
    //     });
    //   },
    //   fail(res) {
    //     console.log('error download error 0', res);
    //     my.alert({
    //       content: res.errorMessage || res.error,
    //     });
    //   },
    // });
  } catch (error) {
    console.log('error', error);
    alert(error);
  }
}

function makePayBillPayment() {
  try {
    my.call('payBill', {
      businessID: '1112223',
      billReference: '123456789',
      amount: '30.0',
      currency: 'KES', // currencyCode to be used - only KES supported for now
      reason: 'Electricity bill', // optional field
      success: function (res) {
        console.log('success', res);
        my.alert({
          title: 'Success',
          content: JSON.stringify(res),
        });
      },
      fail: function (res) {
        console.log(('errror', error));
        my.alert({
          title: 'Fail',
          content: JSON.stringify(res),
        });
      },
    });
  } catch (error) {
    console.log('error', error);
    alert(error);
  }
}

function makeTillPayment() {
  try {
    my.call('buyGoods', {
      tillNumber: '89900',
      amount: '25.0',
      currency: 'KES', // currencyCode to be used - only KES supported for now
      reason: 'Jon Groceries', // optional field
      success: function (res) {
        my.alert({
          content: JSON.stringify(res),
        });
      },
      fail: function (res) {
        my.alert({
          content: JSON.stringify(res),
        });
      },
    });
  } catch (error) {
    console.log('error', error);
    alert(error);
  }
}
