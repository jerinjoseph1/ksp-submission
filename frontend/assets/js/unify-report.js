$(document).ready(function () {

    var getParams = function (url) {
        var params = {};
        var parser = document.createElement('a');
        parser.href = url;
        var query = parser.search.substring(1);
        var vars = query.split('&');
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split('=');
            params[pair[0]] = decodeURIComponent(pair[1]);
        }
        return params;
    };

    id = getParams(window.location.search)


    $.ajax({
        type: "GET",
        url: `http://localhost:3000/getPerson/${id.id}`,
        encode: true,
    }).done(function (data) {
        console.log(data);

        $('#personName').html(data.result.Person_Name)
        $('#fatherName').html(data.result.Father_Name)
        $('#address').html(data.result.Pres_Address1)
        $('#address2').html(data.result.Perm_Address1)
        $('#age').html(data.result.Age)
        $('#gender').html(data.result.Gender)
        $('#state').html(data.result.State)
        $('#district').html(data.result.District_Name)
        $('#psName').html(data.result.PS_Name)
        $('#crimeNumber').html(data.result.Crime_No)
        $('#firNo').html(data.result.FIRNo)
        $('#firId').html(data.result.FIR_ID)
        $('#firDate').html(data.result.FIR_Date)
        $('#arrId').html(data.result.Arr_ID)
        $('#arrestDate').html(data.result.Arrest_Date)
        $('#personStatus').html(data.result.PersonStatus)
        $('#majorHead').html(data.result.Major_Head)
        $('#minorHead').html(data.result.Minor_Head)
        $('#dedt').html(data.result.DEDT)

        storageRef.child(`face/${data.result.Photo_Full_front}`).getDownloadURL()
        .then((url) => {
            // Or inserted into an <img> element
            var img = document.getElementById('personPhoto');
            img.setAttribute('src', url);
        })
        .catch((error) => {
            // Handle any errors
        });





    });

    const firebaseConfig = {

      };
    
      // Initialize Firebase
      const app = firebase.initializeApp(firebaseConfig);
      const storage = firebase.storage()
      const storageRef = firebase.storage().ref();


})