const express = require('express');
const app = express();
const spawn = require('child_process').spawn;

app.use(express.static(__dirname + '/'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('views', __dirname);

const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  // res.render('index1');

  const process = spawn('python', ['./setup.py']);

  process.stdout.on('data', (data) => {
    const myData = data.toString();
    const myDataRaw = myData.replace(/[\[\]']+/g, '');
    var locations = myDataRaw.split(',');
    res
      .status(200)
      .render('index', { price: 0, locations: locations, data: 0 });
  });
});

app.post('/', (req, res) => {
  const propertyType = req.body.propertyType;
  const locationName = req.body.locationName;
  const cityName = req.body.cityName;
  const provinceName = req.body.provinceName;
  const bathroomNumber = parseFloat(req.body.bath);
  const areaMarla = parseFloat(req.body.areaMarla);
  const purposeName = req.body.purpose;
  const bedroomNumber = parseFloat(req.body.bed);

  const property_type = propertyType;
  const location = locationName;
  const city = cityName;
  const province_name = provinceName;
  const baths = bathroomNumber;
  const area_marla = areaMarla;
  const purpose = purposeName;
  const bedrooms = bedroomNumber;

  const process = spawn('python', [
    './setup.py',
    property_type,
    location,
    city,
    province_name,
    baths,
    area_marla,
    purpose,
    bedrooms,
  ]);

  process.stdout.on('data', (data) => {
    const myData = data.toString();
    const myDataRaw = myData.replace(/[\[\]']+/g, '');
    var locations = myDataRaw.split(',');

    const lastIndex = locations.slice(-1)[0];
    const price = parseFloat(lastIndex);
    res.status(200).render('index', {
      price: price,
      locations: locations,
      property_type: property_type,
      location: location,
      city: city,
      province_name: province_name,
      baths: baths,
      area_marla: area_marla,
      purpose: purpose,
      bedrooms: bedrooms,
      data: 1,
    });
  });
});

app.listen(port, () => {
  console.log('Server Start..');
});
