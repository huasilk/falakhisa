//Berikut fungsi-fungsi rutin 
//============================//
//Fungsi ini digunakan untuk menghitung Julian Day dari sebuah tanggal dan waktu dalam format Tanggal, Bulan, Tahun, Jam Desimal, dan Timezone. 
//Fungsi ini menerima 5 parameter, yaitu Tanggal (TglM), Bulan (BlnM), Tahun (ThnM), Jam Desimal (JamDes), dan Timezone (TimeZone).
//Fungsi ini berguna untuk menghitung Julian Day dari sebuah tanggal dan waktu dalam aplikasi astronomi atau astrologi. 
//Julian Day adalah sistem penanggalan yang digunakan oleh para ahli astronomi untuk menyederhanakan perhitungan tanggal dan waktu 
//dalam observasi astronomi.

function KMJD(TglM, BlnM, ThnM, JamDes = 0, TimeZone = 0) {
  // Deklarasi Variabel dan Tipe Variabel
  let DDUT, MM, YM, a, b, JD;
  // Proses Perhitungan
  // Tanggal dan Jam Desimal Lokal ke Tanggal Desimal UT
  DDUT = TglM + ((JamDes - TimeZone) / 24);
  // Penyesuaian Bulan dan Tahun untuk memudahkan perhitungan
  if (BlnM > 2) {
    MM = BlnM; YM = ThnM;
  } else {
    MM = BlnM + 12; YM = ThnM - 1;
  }
  // Koreksi Paus Gregorius berlaku sejak tanggal 15 Oktober 1582 M
  if ((ThnM + BlnM / 100 + TglM / 10000) >= 1582.1015) {
    a = Math.floor(YM / 100); b = 2 - a + Math.floor(a / 4);
  } else {
    a = 0; b = 0;
  }
  // Perhitungan Julian Day tahap akhir
  JD = Math.floor(365.25 * (YM + 4716)) + Math.floor(30.6001 * (MM + 1)) + DDUT + b - 1524.5;
  // Hasil Perhitungan
  return JD;
}


//Ini adalah sebuah fungsi bernama JDKM yang digunakan untuk mengonversi tanggal Julian menjadi tanggal Gregorian (Kalender Barat). 
//Fungsi ini mengambil tiga argumen: tanggal Julian (JD), zona waktu (TimeZone) dan opsi hasil (OptResult).
//Fungsi ini melakukan beberapa perhitungan matematika untuk mengonversi tanggal Julian menjadi tanggal Gregorian. 
//fungsi akan mengembalikan hasil dalam bentuk format tertentu, seperti nama hari, pasaran, tanggal, bulan, tahun, dan sebagainya,
//tergantung pada opsi hasil yang diberikan. Ada juga beberapa variabel yang digunakan dalam perhitungan, seperti CJD, Z, F, JamDes, 
//Alpha, a, b, c, D, E, TglM, BlnM, ThnM, ThnMAYNS, ThnMHYNS, NmBlnMDt, NmBlnM, NoHrM, NmHrMDt, NmPsMDt, NmHrM, NmPsM, dan Hasil.

function JDKM(JD, TimeZone = 0, OptResult = '') {
  // Declare variables and their types
  let CJD = 0;
  let Z = 0;
  let F = 0;
  let JamDes = 0;
  let Alpha = 0;
  let a = 0;
  let b = 0;
  let c = 0;
  let D = 0;
  let E = 0;
  let TglM = 0;
  let BlnM = 0;
  let ThnM = 0;
  let ThnMAYNS = '';
  let ThnMHYNS = '';
 // let NmBlnMDt = [];
 //let NmBlnM = '';
 // let NoHrM = 0;
 // let NmHrMDt = [];
 // let NmHrM = '';
//  let NoPsM = 0;
 // let NmPsMDt = [];
 //let NmPsM = '';
 // let Result = '';

  // Calculations
  // Convert to Chronological Julian Day, Chronological Julian Day Number,
  // Fractional Part of the Day, and Decimal Time
  CJD = JD + 0.5 + (TimeZone / 24);
  Z = Math.floor(CJD);
  F = CJD - Z;
  JamDes = F * 24;

  // Correction of Gregorian Pause calculation
  if (Z >= 2298161) {
    Alpha = Math.floor((Z - 1867216.25) / 36524.25);
    a = Z + 1 + Alpha - Math.floor(Alpha / 4);
  } else {
    Alpha = 0;
    a = Z;
  }

  // Core calculation
  b = a + 1524;
  c = Math.floor((b - 122.1) / 365.25);
  D = Math.floor(365.25 * c);
  E = Math.floor((b - D) / 30.6001);

  // Determine the date, month, and year of the Gregorian calendar
  TglM = b - D - Math.floor(30.6001 * E);
  if (E < 14) {
    BlnM = E - 1;
  } else if (E === 14 || E === 15) {
    BlnM = E - 13;
  }
  if (BlnM > 2) {
    ThnM = c - 4716;
  } else if (BlnM === 1 || BlnM === 2) {
    ThnM = c - 4715;
  }

  // ThnMAYNS = Gregorian year with Astronomical Year Numbering System
  // Thnmhyns = Gregorian year with Historical Year Numbering System
  if (ThnM > 0) {
    ThnMHYNS = ThnM + ' M';
    ThnMAYNS = '+' + ThnM;
  } else {
    ThnMHYNS = Math.abs(ThnM) + 1 + ' SM';
    ThnMAYNS = ThnM;
  }

 
  // Penentuan Nama Bulan Miladi
  var NmBlnMDt = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
  var NmBlnM = NmBlnMDt[BlnM - 1];

  // Penentuan Nama Hari dan Pasaran Berdasarkan Kalender Miladi
  var NoHrM = Z - 7 * Math.floor(Z / 7);
  var NoPsM = Z - 5 * Math.floor(Z / 5);
  var NmHrMDt = ["Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu", "Ahad"];
  var NmPsMDt = ["Legi", "Pahing", "Pon", "Wage", "Kliwon"];
  var NmHrM = NmHrMDt[NoHrM];
  var NmPsM = NmPsMDt[NoPsM];

  // Penentuan Format Hasil Perhitungan
  var Result;
  switch (OptResult.toUpperCase().replace(/ /g, "")) {
    case "":
      Result = NmHrM + " " + NmPsM + ", " + TglM + " " + NmBlnM + " " + ThnMHYNS;
      break;
    case "JAMDES":
      Result = JamDes;
      break;
    case "PECAHANHARI":
      Result = F;
      break;
    case "TGLM":
    case "TGL":
      Result = TglM;
      break;
    case "BLNM":
    case "BLN":
      Result = BlnM;
      break;
    case "NMBLNM":
      Result = NmBlnM;
      break;
    case "THNM":
    case "THN":
      Result = ThnM;
      break;
    case "THNMAYNS":
      Result = ThnMAYNS;
      break;
    case "THNMHYNS":
      Result = ThnMHYNS;
      break;
    case "HARI":
    case "HR":
      Result = NmHrM;
      break;
    case "PASARAN":
    case "PS":
      Result = NmPsM;
      break;
    case "HARIPASARAN":
      Result = NmHrM + " " + NmPsM;
      break;
      case "TGLBLNTHN":
      Result = TglM + " " + NmBlnM + " " + ThnM;
      break;
    default:
      Result = NmHrM + " " + NmPsM + ", " + TglM + " " + NmBlnM + " " + ThnMHYNS;
  }

  // Hasil Perhitungan
  return Result;
}



// fungsi Deg to Rad, rad to deg deci to DDMS modFDiv

 // Fungsi untuk mengubah radian ke derajat
      function radToDeg(rad) {
        return rad * (180 / Math.PI);
      }

      // Fungsi untuk mengubah derajat ke radian
      function degToRad(deg) {
        return deg * (Math.PI / 180);
      }
      
	// DDDMS adalah sebuah fungsi JavaScript untuk mengkonversi  dari format desimal menjadi format derajat-menit-detik (DMS). 
  //Fungsi ini menerima dua parameter, yaitu koordinat desimal yang akan dikonversi dan opsi hasil yang dapat ditentukan oleh pengguna.
  //Fungsi ini menghitung derajat, menit, dan detik dari koordinat desimal, kemudian mengembalikan hasil dalam format DMS 
  //dengan simbol derajat, menit, dan detik. Fungsi ini juga mendukung opsi hasil, yaitu "L" untuk menambahkan penanda arah utara/selatan, 
  //atau "B" untuk menambahkan penanda arah timur/barat pada hasil konversi.

function DDDMS(decimals, OptResult="") {
  var Result="";
  let decimal = Math.abs(decimals);
  var degrees = Math.floor(decimal);
  var minutes = Math.floor((decimal - degrees) * 60);
  var seconds = (((decimal - degrees) * 60 - minutes) * 60).toFixed(3);

switch (OptResult.replace(/\s/g, "").toUpperCase()) {
  case "":
    Result = (decimals >= 0 ? degrees : "- " + degrees) + "° " + 
    (minutes < 10 ? "0" + minutes : minutes) + "' " + 
    (seconds < 10 ? "0" + seconds : seconds) + "''";
    break; // tambahkan break di sini

  case "L":
    if (decimals < 0) {
      Result = degrees + "° " + 
        (minutes < 10 ? "0" + minutes : minutes) + "' " + 
        (seconds < 10 ? "0" + seconds : seconds) + "''" + " LS";
    } else {
      Result = degrees + "° " + 
        (minutes < 10 ? "0" + minutes : minutes) + "' " + 
        (seconds < 10 ? "0" + seconds : seconds) + "''" + " LU";
    }
    break;

  case "B":
    if (decimals < 0) {
      Result = degrees + "° " + 
        (minutes < 10 ? "0" + minutes : minutes) + "' " + 
        (seconds < 10 ? "0" + seconds : seconds) + "''" + " BB";
    } else {
      Result = degrees + "° " + 
        (minutes < 10 ? "0" + minutes : minutes) + "' " + 
        (seconds < 10 ? "0" + seconds : seconds) + "''" + " BT";
    }
    break;

  default:
    Result = (decimals >= 0 ? degrees : "- " + degrees) + "° " + 
    (minutes < 10 ? "0" + minutes : minutes) + "' " + 
    (seconds < 10 ? "0" + seconds : seconds) + "''";
    break;
}
return Result;
}

//DHHMS ini digunakan untuk mengonversi waktu dalam bentuk desimal jam menjadi format jam:menit:detik atau durasi waktu.

function DHHMS(decimalHourss, OptResult="") {
	var Result;
  var decimalHours =Math.abs(decimalHourss);
  var hours = Math.floor(decimalHours);
  var minutes = Math.floor((decimalHours - hours) * 60);
  var seconds = (((decimalHours - hours) * 60) - minutes) * 60;

  var formattedHours = hours.toString().padStart(2, '0');
  var formattedMinutes = minutes.toString().padStart(2, '0');
  var formattedSeconds = seconds.toFixed(3).toString().padStart(6, '0');
  var tanda ="";
  if (Math.sign(decimalHourss)== -1){
    tanda = "- ";
    tanda2 = "kurang ";
  };
	switch (OptResult.replace(/\s/g, "").toUpperCase()) {
	case "":
    Result = tanda + formattedHours + ':' + formattedMinutes + ':' + formattedSeconds;
	break;
	case "DURASI":
    Result = tanda + formattedHours + ' jam ' + formattedMinutes + ' menit ' + formattedSeconds + " detik";
    break;
    default:
    Result = tanda + formattedHours + ':' + formattedMinutes + ':' + formattedSeconds;
	break;

	}
  return Result;
}

   
// fungsi untuk pembagian modulo (sisa bagi)
function ModFDiv(dividend, divisor) {
  return dividend - divisor * Math.floor(dividend / divisor);
}
      
// Fungsi "azimuthWithCosine" digunakan untuk menghitung arah sudut antara dua titik koordinat pada permukaan bumi menggunakan rumus kosinus.
//Fungsi ini membutuhkan empat parameter, yaitu lat1 (garis lintang titik awal), long1 (garis bujur titik awal), lat2 (garis lintang titik akhir),
//dan long2 (garis bujur titik akhir).
//Pertama, fungsi ini menghitung selisih bujur antara titik awal dan titik akhir. Selisih ini kemudian diubah ke dalam rentang 0-360 derajat 
//dengan menggunakan fungsi ModFDiv.
//Kemudian, semua parameter diubah dari satuan derajat menjadi satuan radian menggunakan fungsi degToRad. 
//Selanjutnya, jarak antara kedua titik koordinat dihitung menggunakan rumus kosinus.
//Setelah itu, fungsi ini menghitung arah sudut antara dua titik koordinat menggunakan rumus kosinus dan tangen. Hasilnya 
//kemudian dikonversi ke dalam satuan derajat menggunakan fungsi radToDeg.
//Jika selisih bujur lebih besar dari 180 derajat, maka hasil arah sudut akan dikoreksi dengan menguranginya dari 360 derajat.
//Akhirnya, fungsi ini mengembalikan nilai arah sudut dalam satuan derajat.

        function azimuthWithCosine(lat1, long1, lat2, long2) {
        var selisihLong = (long1 + 180) - (long2 + 180);
        
       selisihLong = ModFDiv(selisihLong , 360);
	  /selisihLong = degToRad(selisihLong);/
        lat1 = degToRad(lat1);
        long1 = degToRad(long1);
        lat2 = degToRad(lat2);
        long2 = degToRad(long2);
        var jarak = Math.acos(Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(degToRad(selisihLong)));
        var azimuthWithCos = Math.acos(-Math.tan(lat2) / Math.tan(jarak) + Math.sin(lat1) / Math.cos(lat2) / Math.sin(jarak));
	  azimuthWithCos = radToDeg(azimuthWithCos)
        if (selisihLong > 180) {
          azimuthWithCos = 360 - azimuthWithCos;
        }
        return azimuthWithCos;
      }





// Fungsi Deltat adalah sebuah fungsi JavaScript yang digunakan untuk menghitung nilai Delta T (perbedaan waktu atom dan waktu astronomi)
// berdasarkan Julian Day. Delta T adalah selisih antara waktu atom (waktu yang ditentukan berdasarkan getaran atom) dan waktu astronomi
// (waktu yang ditentukan berdasarkan rotasi Bumi). Fungsi ini memiliki beberapa variabel yang digunakan dalam perhitungan,
// seperti TlM (tahun), JDTlMAw (Julian Day dari awal tahun), JDTlMAk (Julian Day dari akhir tahun), JHrlTlM (jumlah hari dari awal tahun),
// JHrTlM (jumlah hari dalam setahun), dY (tahun desimal), kU, kT (variabel lain yang digunakan dalam perhitungan). 
//Kemudian, fungsi menggunakan serangkaian pernyataan kondisional (if-else) untuk menghitung nilai Delta T berdasarkan tahun desimal.

function Deltat(JD) {
  let TlM = 0;
  let JDTlMAw = 0;
  let JDTlMAk = 0;
  let JHrlTlM = 0;
  let JHrTlM = 0;
  let dY = 0;
  let kU = 0;
  let kT = 0;
  let DltT = 0;
  let sCorr = 0;
  
  TlM = JDKM(JD, 0, "ThnM");
  JDTlMAw = KMJD(1, 1, TlM, 0, 0);
  JDTlMAk = KMJD(31, 12, TlM, 24, 0);
  JHrlTlM = JD - JDTlMAw;
  JHrTlM = JDTlMAk - JDTlMAw;
  dY = TlM + JHrlTlM / JHrTlM;
  
  if (dY <= -500) {
    kU = (dY - 1820) / 100;
    DltT = -20 + 32 * kU * kU;
  } else if (dY > -500 && dY <= 500){
    kU = dY / 100;
    DltT = 10583.6 - 1014.41 * kU + 33.78311 * kU * kU - 5.952053 * kU * kU * kU - 0.1798452 * kU * kU * kU * kU + 0.022174192 * Math.pow(kU, 5) + 0.0090316521 * Math.pow(kU, 6);
  } else if (dY > 500 && dY <= 1600){
    kU = (dY - 1000) / 100;
    DltT = 1574.2 - 556.01 * kU + 71.23472 * kU * kU + 0.319781 * kU * kU * kU - 0.8503463 * kU * kU * kU * kU - 0.005050998 * Math.pow(kU, 5) + 0.0083572073 * Math.pow(kU, 6);
  } else if (dY > 1600 && dY <= 1700){
    kT = dY - 1600;
    DltT = 120 - 0.9808 * kT - 0.01532 * kT * kT + kT * kT * kT / 7129;
  } else if (dY > 1700 && dY <= 1800){
    kT = dY - 1700;
    DltT = 8.83 + 0.1603 * kT - 0.0059285 * kT * kT + 0.00013336 * Math.pow(kT, 3) - Math.pow(kT, 4) / 1174000;
  } else if (dY > 1800 && dY <= 1860) {
    kT = dY - 1800;
    DltT = 13.72 - 0.332447 * kT + 0.0068612 * kT * kT + 0.0041116 * kT * kT * kT - 0.00037436 * kT * kT * kT * kT + 0.0000121272 * kT * kT * kT * kT * kT - 0.0000001699 * kT * kT * kT * kT * kT * kT + 0.000000000875 * kT * kT * kT * kT * kT * kT * kT;

  } else if (dY > 1860 && dY <= 1900) {
    kT = dY - 1860;
    DltT = 7.62 + 0.5737 * kT - 0.251754 * kT * kT + 0.01680668 * kT * kT * kT - 0.0004473624 * kT * kT * kT * kT + kT * kT * kT * kT * kT / 233174;
  } else if (dY > 1900 && dY <= 1920) {
    kT = dY - 1900;
    DltT = -2.79 + 1.494119 * kT - 0.0598939 * kT * kT + 0.0061966 * kT * kT * kT - 0.000197 * kT * kT * kT * kT;
  } else if (dY > 1920 && dY <= 1941) {
    kT = dY - 1920;
    DltT = 21.2 + 0.84493 * kT - 0.0761 * kT * kT + 0.0020936 * kT * kT * kT;
  } else if (dY > 1941 && dY <= 1961) {
    kT = dY - 1950;
    DltT = 29.07 + 0.407 * kT - kT * kT / 233 + kT * kT * kT / 2547;
  } else if (dY > 1961 && dY <= 1986) {
    kT = dY - 1975;
    DltT = 45.45 + 1.067 * kT - kT * kT / 260 - kT * kT * kT / 718;
  } else if (dY > 1986 && dY <= 2005) {
    kT = dY - 2000;
   
        DltT = 63.86 + 0.3345 * kT - 0.060374 * kT * kT  + 0.0017275 * kT * kT * kT  + 0.000651814 * kT * kT * kT * kT  + 0.00002373599 * kT * kT * kT * kT * kT ;
    } else if (dY > 2005 && dY <= 2050){
        kT = dY - 2000;
        DltT = 62.92 + 0.32217 * kT + 0.005589 * kT * kT ;
    } else if (dY > 2050 && dY <= 2150){
        DltT = -20 + 32 * ((dY - 1820) / 100) * ((dY - 1820) / 100) - 0.5628 * (2150 - dY);
    } else if (dY > 2150) {
        kU = (dY - 1820) / 100;
        DltT = -20 + 32 * kU * kU;
    }
    if (dY < 1955 || dY > 2005) {
    sCorr = -0.000012932 * Math.pow(dY - 1955, 2);
    DltT += sCorr;
  } else {
    sCorr = 0;
    DltT = DltT;
  }
  return DltT;
}


    // data matahari

      function NutationInLongitude(JD) {
  let T = (JD - 2451545) / 36525;
  let D = 297.85036 + 445267.11148 * T - 0.0019142 * Math.pow(T, 2) + Math.pow(T, 3) / 189474;
  let M = 357.52772 + 35999.05034 * T - 0.0001603 * Math.pow(T, 2) - Math.pow(T, 3) / 300000;
  let M_ = 134.96298 + 477198.867398 * T + 0.0086972 * Math.pow(T, 2) + T * 3 / 56250;
  let F = 93.27191 + 483202.017538 * T - 0.0036825 * Math.pow(T, 2) + Math.pow(T, 3) / 327270;
  let Omg = 125.04452 - 1934.136261 * T + 0.0020708 * Math.pow(T, 2) + Math.pow(T, 3) / 450000;
    D = degToRad(ModFDiv(D, 360));
    M = degToRad(ModFDiv(M, 360));
    M_ = degToRad(ModFDiv( M_, 360));
    F = degToRad(ModFDiv(F, 360));
    Omg = degToRad(ModFDiv(Omg, 360));
    let DltPsi = 0;
    DltPsi += (-171996 + -174.2 * T) * Math.sin(0 * D + 0 * M + 0 *  M_ + 0 * F + 1 * Omg);;
    DltPsi += (-13187 + -1.6 * T) * Math.sin(-2 * D + 0 * M + 0 *  M_ + 2 * F + 2 * Omg);;
    DltPsi += (-2274 + -0.2 * T) * Math.sin(0 * D + 0 * M + 0 *  M_ + 2 * F + 2 * Omg);;
    DltPsi += (2062 + 0.2 * T) * Math.sin(0 * D + 0 * M + 0 *  M_ + 0 * F + 2 * Omg);;
    DltPsi += (1426 + -3.4 * T) * Math.sin(0 * D + 1 * M + 0 *  M_ + 0 * F + 0 * Omg);;
    DltPsi += (712 + 0.1 * T) * Math.sin(0 * D + 0 * M + 1 *  M_ + 0 * F + 0 * Omg);;
    DltPsi += (-517 + 1.2 * T) * Math.sin(-2 * D + 1 * M + 0 *  M_ + 2 * F + 2 * Omg);;
    DltPsi += (-386 + -0.4 * T) * Math.sin(0 * D + 0 * M + 0 *  M_ + 2 * F + 1 * Omg);;
    DltPsi += (-301 + 0 * T) * Math.sin(0 * D + 0 * M + 1 *  M_ + 2 * F + 2 * Omg);;
    DltPsi += (217 + -0.5 * T) * Math.sin(-2 * D + -1 * M + 0 *  M_ + 2 * F + 2 * Omg);;
    DltPsi += (-158 + 0 * T) * Math.sin(-2 * D + 0 * M + 1 *  M_ + 0 * F + 0 * Omg);;
    DltPsi += (129 + 0.1 * T) * Math.sin(-2 * D + 0 * M + 0 *  M_ + 2 * F + 1 * Omg);;
    DltPsi += (123 + 0 * T) * Math.sin(0 * D + 0 * M + -1 *  M_ + 2 * F + 2 * Omg);;
    DltPsi += (63 + 0 * T) * Math.sin(2 * D + 0 * M + 0 *  M_ + 0 * F + 0 * Omg);;
    DltPsi += (63 + 0.1 * T) * Math.sin(0 * D + 0 * M + 1 *  M_ + 0 * F + 1 * Omg);;
    DltPsi += (-59 + 0 * T) * Math.sin(2 * D + 0 * M + -1 *  M_ + 2 * F + 2 * Omg);;
    DltPsi += (-58 + -0.1 * T) * Math.sin(0 * D + 0 * M + -1 *  M_ + 0 * F + 1 * Omg);;
    DltPsi += (-51 + 0 * T) * Math.sin(0 * D + 0 * M + 1 *  M_ + 2 * F + 1 * Omg);;
    DltPsi += (48 + 0 * T) * Math.sin(-2 * D + 0 * M + 2 *  M_ + 0 * F + 0 * Omg);;
    DltPsi += (46 + 0 * T) * Math.sin(0 * D + 0 * M + -2 *  M_ + 2 * F + 1 * Omg);;
    DltPsi += (-38 + 0 * T) * Math.sin(2 * D + 0 * M + 0 *  M_ + 2 * F + 2 * Omg);;
    DltPsi += (-31 + 0 * T) * Math.sin(0 * D + 0 * M + 2 *  M_ + 2 * F + 2 * Omg);;
    DltPsi += (29 + 0 * T) * Math.sin(0 * D + 0 * M + 2 *  M_ + 0 * F + 0 * Omg);;
    DltPsi += (29 + 0 * T) * Math.sin(-2 * D + 0 * M + 1 *  M_ + 2 * F + 2 * Omg);;
    DltPsi += (26 + 0 * T) * Math.sin(0 * D + 0 * M + 0 *  M_ + 2 * F + 0 * Omg);;
    DltPsi += (-22 + 0 * T) * Math.sin(-2 * D + 0 * M + 0 *  M_ + 2 * F + 0 * Omg);;
    DltPsi += (21 + 0 * T) * Math.sin(0 * D + 0 * M + -1 *  M_ + 2 * F + 1 * Omg);;
    DltPsi += (17 + -0.1 * T) * Math.sin(0 * D + 2 * M + 0 *  M_ + 0 * F + 0 * Omg);;
    DltPsi += (16 + 0 * T) * Math.sin(2 * D + 0 * M + -1 *  M_ + 0 * F + 1 * Omg);;
    DltPsi += (-16 + 0.1 * T) * Math.sin(-2 * D + 2 * M + 0 *  M_ + 2 * F + 2 * Omg);;
    DltPsi += (-15 + 0 * T) * Math.sin(0 * D + 1 * M + 0 *  M_ + 0 * F + 1 * Omg);;
    DltPsi += (-13 + 0 * T) * Math.sin(-2 * D + 0 * M + 1 *  M_ + 0 * F + 1 * Omg);;
    DltPsi += (-12 + 0 * T) * Math.sin(0 * D + -1 * M + 0 *  M_ + 0 * F + 1 * Omg);;
    DltPsi += (11 + 0 * T) * Math.sin(0 * D + 0 * M + 2 *  M_ + -2 * F + 0 * Omg);;
    DltPsi += (-10 + 0 * T) * Math.sin(2 * D + 0 * M + -1 *  M_ + 2 * F + 1 * Omg);;
    DltPsi += (-8 + 0 * T) * Math.sin(2 * D + 0 * M + 1 *  M_ + 2 * F + 2 * Omg);;
    DltPsi += (7 + 0 * T) * Math.sin(0 * D + 1 * M + 0 *  M_ + 2 * F + 2 * Omg);;
    DltPsi += (-7 + 0 * T) * Math.sin(-2 * D + 1 * M + 1 *  M_ + 0 * F + 0 * Omg);;
    DltPsi += (-7 + 0 * T) * Math.sin(0 * D + -1 * M + 0 *  M_ + 2 * F + 2 * Omg);;
    DltPsi += (-7 + 0 * T) * Math.sin(2 * D + 0 * M + 0 *  M_ + 2 * F + 1 * Omg);;
    DltPsi += (6 + 0 * T) * Math.sin(2 * D + 0 * M + 1 *  M_ + 0 * F + 0 * Omg);;
    DltPsi += (6 + 0 * T) * Math.sin(-2 * D + 0 * M + 2 *  M_ + 2 * F + 2 * Omg);;
    DltPsi += (6 + 0 * T) * Math.sin(-2 * D + 0 * M + 1 *  M_ + 2 * F + 1 * Omg);;
    DltPsi += (-6 + 0 * T) * Math.sin(2 * D + 0 * M + -2 *  M_ + 0 * F + 1 * Omg);;
    DltPsi += (-6 + 0 * T) * Math.sin(2 * D + 0 * M + 0 *  M_ + 0 * F + 1 * Omg);;
    DltPsi += (5 + 0 * T) * Math.sin(0 * D + -1 * M + 1 *  M_ + 0 * F + 0 * Omg);;
    DltPsi += (-5 + 0 * T) * Math.sin(-2 * D + -1 * M + 0 *  M_ + 2 * F + 1 * Omg);;
    DltPsi += (-5 + 0 * T) * Math.sin(-2 * D + 0 * M + 0 *  M_ + 0 * F + 1 * Omg);;
    DltPsi += (-5 + 0 * T) * Math.sin(0 * D + 0 * M + 2 *  M_ + 2 * F + 1 * Omg);;
    DltPsi += (4 + 0 * T) * Math.sin(-2 * D + 0 * M + 2 *  M_ + 0 * F + 1 * Omg);;
    DltPsi += (4 + 0 * T) * Math.sin(-2 * D + 1 * M + 0 *  M_ + 2 * F + 1 * Omg);;
    DltPsi += (4 + 0 * T) * Math.sin(0 * D + 0 * M + 1 *  M_ + -2 * F + 0 * Omg);;
    DltPsi += (-4 + 0 * T) * Math.sin(-1 * D + 0 * M + 1 *  M_ + 0 * F + 0 * Omg);;
    DltPsi += (-4 + 0 * T) * Math.sin(-2 * D + 1 * M + 0 *  M_ + 0 * F + 0 * Omg);;
    DltPsi += (-4 + 0 * T) * Math.sin(1 * D + 0 * M + 0 *  M_ + 0 * F + 0 * Omg);;
    DltPsi += (3 + 0 * T) * Math.sin(0 * D + 0 * M + 1 *  M_ + 2 * F + 0 * Omg);;
    DltPsi += (-3 + 0 * T) * Math.sin(0 * D + 0 * M + -2 *  M_ + 2 * F + 2 * Omg);;
    DltPsi += (-3 + 0 * T) * Math.sin(-1 * D + -1 * M + 1 *  M_ + 0 * F + 0 * Omg);;
    DltPsi += (-3 + 0 * T) * Math.sin(0 * D + 1 * M + 1 *  M_ + 0 * F + 0 * Omg);;
    DltPsi += (-3 + 0 * T) * Math.sin(0 * D + -1 * M + 1 *  M_ + 2 * F + 2 * Omg);;
    DltPsi += (-3 + 0 * T) * Math.sin(2 * D + -1 * M + -1 *  M_ + 2 * F + 2 * Omg);;
    DltPsi += (-3 + 0 * T) * Math.sin(0 * D + 0 * M + 3 *  M_ + 2 * F + 2 * Omg);;
    DltPsi += (-3 + 0 * T) * Math.sin(2 * D + -1 * M + 0 *  M_ + 2 * F + 2 * Omg);;
    DltPsi /= 36000000;
  return DltPsi;
}
//
function NutationInObliquity(JD) {
  let T = (JD - 2451545) / 36525;
  let D = 297.85036 + 445267.11148 * T - 0.0019142 * Math.pow(T, 2) + Math.pow(T, 3) / 189474;
  let M = 357.52772 + 35999.05034 * T - 0.0001603 * Math.pow(T, 2) - Math.pow(T, 3) / 300000;
  let M_ = 134.96298 + 477198.867398 * T + 0.0086972 * Math.pow(T, 2) + T * 3 / 56250;
  let F = 93.27191 + 483202.017538 * T - 0.0036825 * Math.pow(T, 2) + Math.pow(T, 3) / 327270;
  let Omg = 125.04452 - 1934.136261 * T + 0.0020708 * Math.pow(T, 2) + Math.pow(T, 3) / 450000;
    D = degToRad(ModFDiv(D, 360));
    M = degToRad(ModFDiv(M, 360));
    M_ = degToRad(ModFDiv( M_, 360));
    F = degToRad(ModFDiv(F, 360));
    Omg = degToRad(ModFDiv(Omg, 360));

     let   DltEps = 0;
    DltEps += (92025 + 8.9 * T) * Math.cos(0 * D + 0 * M + 0 *  M_ + 0 * F + 1 * Omg);
    DltEps += (5736 + -3.1 * T) * Math.cos(-2 * D + 0 * M + 0 *  M_ + 2 * F + 2 * Omg);
    DltEps += (977 + -0.5 * T) * Math.cos(0 * D + 0 * M + 0 *  M_ + 2 * F + 2 * Omg);
    DltEps += (-895 + 0.5 * T) * Math.cos(0 * D + 0 * M + 0 *  M_ + 0 * F + 2 * Omg);
    DltEps += (54 + -0.1 * T) * Math.cos(0 * D + 1 * M + 0 *  M_ + 0 * F + 0 * Omg);
    DltEps += (-7 + 0 * T) * Math.cos(0 * D + 0 * M + 1 *  M_ + 0 * F + 0 * Omg);
    DltEps += (224 + -0.6 * T) * Math.cos(-2 * D + 1 * M + 0 *  M_ + 2 * F + 2 * Omg);
    DltEps += (200 + 0 * T) * Math.cos(0 * D + 0 * M + 0 *  M_ + 2 * F + 1 * Omg);
    DltEps += (129 + -0.1 * T) * Math.cos(0 * D + 0 * M + 1 *  M_ + 2 * F + 2 * Omg);
    DltEps += (-95 + 0.3 * T) * Math.cos(-2 * D + -1 * M + 0 *  M_ + 2 * F + 2 * Omg);
    DltEps += (0 + 0 * T) * Math.cos(-2 * D + 0 * M + 1 *  M_ + 0 * F + 0 * Omg);
    DltEps += (-70 + 0 * T) * Math.cos(-2 * D + 0 * M + 0 *  M_ + 2 * F + 1 * Omg);
    DltEps += (-53 + 0 * T) * Math.cos(0 * D + 0 * M + -1 *  M_ + 2 * F + 2 * Omg);
    DltEps += (0 + 0 * T) * Math.cos(2 * D + 0 * M + 0 *  M_ + 0 * F + 0 * Omg);
    DltEps += (-33 + 0 * T) * Math.cos(0 * D + 0 * M + 1 *  M_ + 0 * F + 1 * Omg);
    DltEps += (26 + 0 * T) * Math.cos(2 * D + 0 * M + -1 *  M_ + 2 * F + 2 * Omg);
    DltEps += (32 + 0 * T) * Math.cos(0 * D + 0 * M + -1 *  M_ + 0 * F + 1 * Omg);
    DltEps += (27 + 0 * T) * Math.cos(0 * D + 0 * M + 1 *  M_ + 2 * F + 1 * Omg);
    DltEps += (0 + 0 * T) * Math.cos(-2 * D + 0 * M + 2 *  M_ + 0 * F + 0 * Omg);
    DltEps += (-24 + 0 * T) * Math.cos(0 * D + 0 * M + -2 *  M_ + 2 * F + 1 * Omg);
    DltEps += (16 + 0 * T) * Math.cos(2 * D + 0 * M + 0 *  M_ + 2 * F + 2 * Omg);
    DltEps += (13 + 0 * T) * Math.cos(0 * D + 0 * M + 2 *  M_ + 2 * F + 2 * Omg);
    DltEps += (0 + 0 * T) * Math.cos(0 * D + 0 * M + 2 *  M_ + 0 * F + 0 * Omg);
    DltEps += (-12 + 0 * T) * Math.cos(-2 * D + 0 * M + 1 *  M_ + 2 * F + 2 * Omg);
    DltEps += (0 + 0 * T) * Math.cos(0 * D + 0 * M + 0 *  M_ + 2 * F + 0 * Omg);
    DltEps += (0 + 0 * T) * Math.cos(-2 * D + 0 * M + 0 *  M_ + 2 * F + 0 * Omg);
    DltEps += (-10 + 0 * T) * Math.cos(0 * D + 0 * M + -1 *  M_ + 2 * F + 1 * Omg);
    DltEps += (0 + 0 * T) * Math.cos(0 * D + 2 * M + 0 *  M_ + 0 * F + 0 * Omg);
    DltEps += (-8 + 0 * T) * Math.cos(2 * D + 0 * M + -1 *  M_ + 0 * F + 1 * Omg);
    DltEps += (7 + 0 * T) * Math.cos(-2 * D + 2 * M + 0 *  M_ + 2 * F + 2 * Omg);
    DltEps += (9 + 0 * T) * Math.cos(0 * D + 1 * M + 0 *  M_ + 0 * F + 1 * Omg);
    DltEps += (7 + 0 * T) * Math.cos(-2 * D + 0 * M + 1 *  M_ + 0 * F + 1 * Omg);
    DltEps += (6 + 0 * T) * Math.cos(0 * D + -1 * M + 0 *  M_ + 0 * F + 1 * Omg);
    DltEps += (0 + 0 * T) * Math.cos(0 * D + 0 * M + 2 *  M_ + -2 * F + 0 * Omg);
    DltEps += (5 + 0 * T) * Math.cos(2 * D + 0 * M + -1 *  M_ + 2 * F + 1 * Omg);
    DltEps += (3 + 0 * T) * Math.cos(2 * D + 0 * M + 1 *  M_ + 2 * F + 2 * Omg);
    DltEps += (-3 + 0 * T) * Math.cos(0 * D + 1 * M + 0 *  M_ + 2 * F + 2 * Omg);
    DltEps += (0 + 0 * T) * Math.cos(-2 * D + 1 * M + 1 *  M_ + 0 * F + 0 * Omg);
    DltEps += (3 + 0 * T) * Math.cos(0 * D + -1 * M + 0 *  M_ + 2 * F + 2 * Omg);
    DltEps += (3 + 0 * T) * Math.cos(2 * D + 0 * M + 0 *  M_ + 2 * F + 1 * Omg);
    DltEps += (0 + 0 * T) * Math.cos(2 * D + 0 * M + 1 *  M_ + 0 * F + 0 * Omg);
    DltEps += (-3 + 0 * T) * Math.cos(-2 * D + 0 * M + 2 *  M_ + 2 * F + 2 * Omg);
    DltEps += (-3 + 0 * T) * Math.cos(-2 * D + 0 * M + 1 *  M_ + 2 * F + 1 * Omg);
    DltEps += (3 + 0 * T) * Math.cos(2 * D + 0 * M + -2 *  M_ + 0 * F + 1 * Omg);
    DltEps += (3 + 0 * T) * Math.cos(2 * D + 0 * M + 0 *  M_ + 0 * F + 1 * Omg);
    DltEps += (0 + 0 * T) * Math.cos(0 * D + -1 * M + 1 *  M_ + 0 * F + 0 * Omg);
    DltEps += (3 + 0 * T) * Math.cos(-2 * D + -1 * M + 0 *  M_ + 2 * F + 1 * Omg);
    DltEps += (3 + 0 * T) * Math.cos(-2 * D + 0 * M + 0 *  M_ + 0 * F + 1 * Omg);
    DltEps += (3 + 0 * T) * Math.cos(0 * D + 0 * M + 2 *  M_ + 2 * F + 1 * Omg);
    DltEps += (0 + 0 * T) * Math.cos(-2 * D + 0 * M + 2 *  M_ + 0 * F + 1 * Omg);
    DltEps += (0 + 0 * T) * Math.cos(-2 * D + 1 * M + 0 *  M_ + 2 * F + 1 * Omg);
    DltEps += (0 + 0 * T) * Math.cos(0 * D + 0 * M + 1 *  M_ + -2 * F + 0 * Omg);
    DltEps += (0 + 0 * T) * Math.cos(-1 * D + 0 * M + 1 *  M_ + 0 * F + 0 * Omg);
    DltEps += (0 + 0 * T) * Math.cos(-2 * D + 1 * M + 0 *  M_ + 0 * F + 0 * Omg);
    DltEps += (0 + 0 * T) * Math.cos(1 * D + 0 * M + 0 *  M_ + 0 * F + 0 * Omg);
    DltEps += (0 + 0 * T) * Math.cos(0 * D + 0 * M + 1 *  M_ + 2 * F + 0 * Omg);
    DltEps += (0 + 0 * T) * Math.cos(0 * D + 0 * M + -2 *  M_ + 2 * F + 2 * Omg);
    DltEps += (0 + 0 * T) * Math.cos(-1 * D + -1 * M + 1 *  M_ + 0 * F + 0 * Omg);
    DltEps += (0 + 0 * T) * Math.cos(0 * D + 1 * M + 1 *  M_ + 0 * F + 0 * Omg);
    DltEps += (0 + 0 * T) * Math.cos(0 * D + -1 * M + 1 *  M_ + 2 * F + 2 * Omg);
    DltEps += (0 + 0 * T) * Math.cos(2 * D + -1 * M + -1 *  M_ + 2 * F + 2 * Omg);
    DltEps += (0 + 0 * T) * Math.cos(0 * D + 0 * M + 3 *  M_ + 2 * F + 2 * Omg);
    DltEps += (0 + 0 * T) * Math.cos(2 * D + -1 * M + 0 *  M_ + 2 * F + 2 * Omg);
    DltEps /= 36000000
    return DltEps;
}
//
function MeanObliquityOfEcliptic(JD) {
  let T = (JD - 2451545) / 36525;
  let U = T / 100;
  let Eps0 = (23 + 26 / 60 + 21.448 / 3600) + (-4680.93 * U
                                            - 1.55 * Math.pow(U, 2)
                                            + 1999.25 * Math.pow(U, 3)
                                            - 51.38 * Math.pow(U, 4)
                                            - 249.67 * Math.pow(U, 5)
                                            - 39.05 * Math.pow(U, 6)
                                            + 7.12 * Math.pow(U, 7)
                                            + 27.87 * Math.pow(U, 8)
                                            + 5.79 * Math.pow(U, 9)
                                            + 2.45 * Math.pow(U, 10)) / 3600;

  return Eps0;
}

//
function ObliquityOfEcliptic(JD) {
  var Eps0 = MeanObliquityOfEcliptic(JD);
  var DltEps = NutationInObliquity(JD);
  var Eps = Eps0 + DltEps;
  return Eps;
}

function EarthHeliocentricLongitude(JD) {
  let Tau = (JD - 2451545) / 365250;
  let L0 = 0;
  L0 += 175347046 * Math.cos(0 + 0 * Tau);
  L0 += 3341656 * Math.cos(4.6692568 + 6283.07585 * Tau);
  L0 += 34894 * Math.cos(4.6261 + 12566.1517 * Tau);
  L0 += 3497 * Math.cos(2.7441 + 5753.3849 * Tau);
  L0 += 3418 * Math.cos(2.8289 + 3.5231 * Tau);
  L0 += 3136 * Math.cos(3.6277 + 77713.7715 * Tau);
  L0 += 2676 * Math.cos(4.4181 + 7860.4194 * Tau);
  L0 += 2343 * Math.cos(6.1352 + 3930.2097 * Tau);
  L0 += 1324 * Math.cos(0.7425 + 11506.7698 * Tau);
  L0 += 1273 * Math.cos(2.0371 + 529.691 * Tau);
  L0 += 1199 * Math.cos(1.1096 + 1577.3435 * Tau);
  L0 += 990 * Math.cos(5.233 + 5884.927 * Tau);
  L0 += 902 * Math.cos(2.045 + 26.298 * Tau);
  L0 += 857 * Math.cos(3.508 + 398.149 * Tau);
  L0 += 780 * Math.cos(1.179 + 5223.694 * Tau);
  L0 += 753 * Math.cos(2.533 + 5507.553 * Tau);
    L0 += 505 * Math.cos(4.583 + 18849.228 * Tau);
    L0 += 492 * Math.cos(4.205 + 775.523 * Tau);
    L0 += 357 * Math.cos(2.92 + 0.067 * Tau);
    L0 += 317 * Math.cos(5.849 + 11790.629 * Tau);
    L0 += 284 * Math.cos(1.899 + 796.298 * Tau);
    L0 += 271 * Math.cos(0.315 + 10977.079 * Tau);
    L0 += 243 * Math.cos(0.345 + 5486.778 * Tau);
    L0 += 206 * Math.cos(4.806 + 2544.314 * Tau);
    L0 += 205 * Math.cos(1.869 + 5573.143 * Tau);
    L0 += 202 * Math.cos(2.458 + 6069.777 * Tau);
    L0 += 156 * Math.cos(0.833 + 213.299 * Tau);
    L0 += 132 * Math.cos(3.411 + 2942.463 * Tau);
    L0 += 126 * Math.cos(1.083 + 20.775 * Tau);
    L0 += 115 * Math.cos(0.645 + 0.98 * Tau);
    L0 += 103 * Math.cos(0.636 + 4694.003 * Tau);
    L0 += 102 * Math.cos(0.976 + 15720.839 * Tau);
    L0 += 102 * Math.cos(4.267 + 7.114 * Tau);
    L0 += 99 * Math.cos(6.21 + 2146.17 * Tau);
    L0 += 98 * Math.cos(0.68 + 155.42 * Tau);
    L0 += 86 * Math.cos(5.98 + 161000.69 * Tau);
    L0 += 85 * Math.cos(1.3 + 6275.96 * Tau);
    L0 += 85 * Math.cos(3.67 + 71430.7 * Tau);
    L0 += 80 * Math.cos(1.81 + 17260.15 * Tau);
    L0 += 79 * Math.cos(3.04 + 12036.46 * Tau);
    L0 += 75 * Math.cos(1.76 + 5088.63 * Tau);
    L0 += 74 * Math.cos(3.5 + 3154.69 * Tau);
    L0 += 74 * Math.cos(4.68 + 801.82 * Tau);
    L0 += 70 * Math.cos(0.83 + 9437.76 * Tau);
    L0 += 62 * Math.cos(3.98 + 8827.39 * Tau);
    L0 += 61 * Math.cos(1.82 + 7084.9 * Tau);
    L0 += 57 * Math.cos(2.78 + 6286.6 * Tau);
    L0 += 56 * Math.cos(4.39 + 14143.5 * Tau);
    L0 += 56 * Math.cos(3.47 + 6279.55 * Tau);
    L0 += 52 * Math.cos(0.19 + 12139.55 * Tau);
    L0 += 52 * Math.cos(1.33 + 1748.02 * Tau);
    L0 += 51 * Math.cos(0.28 + 5856.48 * Tau);
    L0 += 49 * Math.cos(0.49 + 1194.45 * Tau);
    L0 += 41 * Math.cos(5.37 + 8429.24 * Tau);
    L0 += 41 * Math.cos(2.4 + 19651.05 * Tau);
    L0 += 39 * Math.cos(6.17 + 10447.39 * Tau);
    L0 += 37 * Math.cos(6.04 + 10213.29 * Tau);
    L0 += 37 * Math.cos(2.57 + 1059.38 * Tau);
    L0 += 36 * Math.cos(1.71 + 2352.87 * Tau);
    L0 += 36 * Math.cos(1.78 + 6812.77 * Tau);
    L0 += 33 * Math.cos(0.59 + 17789.85 * Tau);
    L0 += 30 * Math.cos(0.44 + 83996.85 * Tau);
    L0 += 30 * Math.cos(2.74 + 1349.87 * Tau);
    L0 += 25 * Math.cos(3.16 + 4690.48 * Tau);
    //'**
    let L1 = 0;
    L1 += 628331966747 * Math.cos(0 + 0 * Tau);
    L1 += 206059 * Math.cos(2.678235 + 6283.07585 * Tau);
    L1 += 4303 * Math.cos(2.6351 + 12566.1517 * Tau);
    L1 += 425 * Math.cos(1.59 + 3.523 * Tau);
    L1 += 119 * Math.cos(5.796 + 26.298 * Tau);
    L1 += 109 * Math.cos(2.966 + 1577.344 * Tau);
    L1 += 93 * Math.cos(2.59 + 18849.23 * Tau);
    L1 += 72 * Math.cos(1.14 + 529.69 * Tau);
    L1 += 68 * Math.cos(1.87 + 398.15 * Tau);
    L1 += 67 * Math.cos(4.41 + 5507.55 * Tau);
    L1 += 59 * Math.cos(2.89 + 5223.69 * Tau);
    L1 += 56 * Math.cos(2.17 + 155.42 * Tau);
    L1 += 45 * Math.cos(0.4 + 796.3 * Tau);
    L1 += 36 * Math.cos(0.47 + 775.52 * Tau);
    L1 += 29 * Math.cos(2.65 + 7.11 * Tau);
    L1 += 21 * Math.cos(5.34 + 0.98 * Tau);
    L1 += 19 * Math.cos(1.85 + 5486.78 * Tau);
    L1 += 19 * Math.cos(4.97 + 213.3 * Tau);
    L1 += 17 * Math.cos(2.99 + 6275.96 * Tau);
    L1 += 16 * Math.cos(0.03 + 2544.31 * Tau);
    L1 += 16 * Math.cos(1.43 + 2146.17 * Tau);
    L1 += 15 * Math.cos(1.21 + 10977.08 * Tau);
    L1 += 12 * Math.cos(2.83 + 1748.02 * Tau);
    L1 += 12 * Math.cos(3.26 + 5088.63 * Tau);
    L1 += 12 * Math.cos(5.27 + 1194.45 * Tau);
    L1 += 12 * Math.cos(2.08 + 4694 * Tau);
    L1 += 11 * Math.cos(0.77 + 553.57 * Tau);
    L1 += 10 * Math.cos(1.3 + 6286.6 * Tau);
    L1 += 10 * Math.cos(4.24 + 1349.87 * Tau);
    L1 += 9 * Math.cos(2.7 + 242.73 * Tau);
    L1 += 9 * Math.cos(5.64 + 951.72 * Tau);
    L1 += 8 * Math.cos(5.3 + 2352.87 * Tau);
    L1 += 6 * Math.cos(2.65 + 9437.76 * Tau);
    L1 += 6 * Math.cos(4.67 + 4690.48 * Tau);
    //'**
    let L2 = 0;
    L2 += 52919 * Math.cos(0 + 0 * Tau);
    L2 += 8720 * Math.cos(1.0721 + 6283.0758 * Tau);
    L2 += 309 * Math.cos(0.867 + 12566.152 * Tau);
    L2 += 27 * Math.cos(0.05 + 3.52 * Tau);
    L2 += 16 * Math.cos(5.19 + 26.3 * Tau);
    L2 += 16 * Math.cos(3.68 + 155.42 * Tau);
    L2 += 10 * Math.cos(0.76 + 18849.23 * Tau);
    L2 += 9 * Math.cos(2.06 + 77713.77 * Tau);
    L2 += 7 * Math.cos(0.83 + 775.52 * Tau);
    L2 += 5 * Math.cos(4.66 + 1577.34 * Tau);
    L2 += 4 * Math.cos(1.03 + 7.11 * Tau);
    L2 += 4 * Math.cos(3.44 + 5573.14 * Tau);
    L2 += 3 * Math.cos(5.14 + 796.3 * Tau);
    L2 += 3 * Math.cos(6.05 + 5507.55 * Tau);
    L2 += 3 * Math.cos(1.19 + 242.73 * Tau);
    L2 += 3 * Math.cos(6.12 + 529.69 * Tau);
    L2 += 3 * Math.cos(0.31 + 398.15 * Tau);
    L2 += 3 * Math.cos(2.28 + 553.57 * Tau);
    L2 += 2 * Math.cos(4.38 + 5223.69 * Tau);
    L2 += 2 * Math.cos(3.75 + 0.98 * Tau);
    //'**
    let L3 = 0;
    L3 += 289 * Math.cos(5.844 + 6283.076 * Tau);
    L3 += 35 * Math.cos(0 + 0 * Tau);
    L3 += 17 * Math.cos(5.49 + 12566.15 * Tau);
    L3 += 3 * Math.cos(5.2 + 155.42 * Tau);
    L3 += 1 * Math.cos(4.72 + 3.52 * Tau);
    L3 += 1 * Math.cos(5.3 + 18849.23 * Tau);
    L3 += 1 * Math.cos(5.97 + 242.73 * Tau);
    //'**
    L4 = 0;
    L4 += 114 * Math.cos(3.142 + 0 * Tau);
    L4 += 8 * Math.cos(4.13 + 6283.08 * Tau);
    L4 += 1 * Math.cos(3.84 + 12566.15 * Tau);
   // '**
    let L5 = 0;

    L5 += 1 * Math.cos(3.14 + 0 * Tau);
    let l = (L0 + L1 * Tau + L2 * Math.pow(Tau, 2) + L3 * Math.pow(Tau, 3) + L4 * Math.pow(Tau, 4) + L5 * Math.pow(Tau, 5)) / 100000000;
  l = (180 / Math.PI) * l;
  l = ModFDiv(l, 360);
  return l;
}
//
function EarthHeliocentricLatitude(JD) {
  const Tau = (JD - 2451545) / 365250;
  let B0 = 0;
  B0 += 280 * Math.cos(3.199 + 84334.662 * Tau);
  B0 += 102 * Math.cos(5.422 + 5507.553 * Tau);
  B0 += 80 * Math.cos(3.88 + 5223.69 * Tau);
  B0 += 44 * Math.cos(3.7 + 2352.87 * Tau);
  B0 += 32 * Math.cos(4 + 1577.34 * Tau);

  let B1 = 0;
  B1 += 9 * Math.cos(3.9 + 5507.55 * Tau);
  B1 += 6 * Math.cos(1.73 + 5223.69 * Tau);

  let b = (B0 + B1 * Tau) / 100000000;
  b = b * (180 / Math.PI);

  return b;
}
//
function EarthRadiusVector(JD) {
  let Tau = (JD - 2451545) / 365250;
  let R0 = 0;
  R0 += 100013989 * Math.cos(0 + 0 * Tau);
  R0 += 1670700 * Math.cos(3.0984635 + 6283.07585 * Tau);
  R0 += 13956 * Math.cos(3.05525 + 12566.1517 * Tau);
  R0 += 3084 * Math.cos(5.1985 + 77713.7715 * Tau);
  R0 += 1628 * Math.cos(1.1739 + 5753.3849 * Tau);
  R0 += 1576 * Math.cos(2.8469 + 7860.4194 * Tau);
  R0 += 925 * Math.cos(5.453 + 11506.77 * Tau);
  R0 += 542 * Math.cos(4.564 + 3930.21 * Tau);
  R0 += 472 * Math.cos(3.661 + 5884.927 * Tau);
  R0 += 346 * Math.cos(0.964 + 5507.553 * Tau);
  R0 += 329 * Math.cos(5.9 + 5223.694 * Tau);
  R0 += 307 * Math.cos(0.299 + 5573.143 * Tau);
  R0 += 243 * Math.cos(4.273 + 11790.629 * Tau);
  R0 += 212 * Math.cos(5.847 + 1577.344 * Tau);
  R0 += 186 * Math.cos(5.022 + 10977.079 * Tau);
  R0 += 175 * Math.cos(3.012 + 18849.228 * Tau);
  R0 += 110 * Math.cos(5.055 + 5486.778 * Tau);
  R0 += 98 * Math.cos(0.89 + 6069.78 * Tau);
  R0 += 86 * Math.cos(5.69 + 15720.84 * Tau);
  R0 += 86 * Math.cos(1.27 + 161000.69 * Tau);
  R0 += 65 * Math.cos(0.27 + 17260.15 * Tau);
  R0 += 63 * Math.cos(0.92 + 529.69 * Tau);
  R0 += 57 * Math.cos(2.01 + 83996.85 * Tau);
  R0 += 56 * Math.cos(5.24 + 71430.7 * Tau);
  R0 += 49 * Math.cos(3.25 + 2544.31 * Tau);
  R0 += 47 * Math.cos(2.58 + 775.52 * Tau);
  R0 += 45 * Math.cos(5.54 + 9437.76 * Tau);
  R0 += 43 * Math.cos(6.01 + 6275.96 * Tau);
  R0 += 39 * Math.cos(5.36 + 4694 * Tau);
  R0 += 38 * Math.cos(2.39 + 8827.39 * Tau);
  R0 += 37 * Math.cos(0.83 + 19651.05 * Tau);
    R0 += 37 * Math.cos(4.9 + 12139.55 * Tau);
    R0 += 36 * Math.cos(1.67 + 12036.46 * Tau);
    R0 += 35 * Math.cos(1.84 + 2942.46 * Tau);
    R0 += 33 * Math.cos(0.24 + 7084.9 * Tau);
    R0 += 32 * Math.cos(0.18 + 5088.63 * Tau);
    R0 += 32 * Math.cos(1.78 + 398.15 * Tau);
    R0 += 28 * Math.cos(1.21 + 6286.6 * Tau);
    R0 += 28 * Math.cos(1.9 + 6279.55 * Tau);
    R0 += 26 * Math.cos(4.59 + 10447.39 * Tau);
   // '**
    let R1 = 0;
    R1 += 103019 * Math.cos(1.10749 + 6283.07585 * Tau);
    R1 += 1721 * Math.cos(1.0644 + 12566.1517 * Tau);
    R1 += 702 * Math.cos(3.142 + 0 * Tau);
    R1 += 32 * Math.cos(1.02 + 18849.23 * Tau);
    R1 += 31 * Math.cos(2.84 + 5507.55 * Tau);
    R1 += 25 * Math.cos(1.32 + 5223.69 * Tau);
    R1 += 18 * Math.cos(1.42 + 1577.34 * Tau);
    R1 += 10 * Math.cos(5.91 + 10977.08 * Tau);
    R1 += 9 * Math.cos(1.42 + 6275.96 * Tau);
    R1 += 9 * Math.cos(0.27 + 5486.78 * Tau);
    //'**
    let R2 = 0;
    R2 += 4359 * Math.cos(5.7846 + 6283.0758 * Tau);
    R2 += 124 * Math.cos(5.579 + 12566.152 * Tau);
    R2 += 12 * Math.cos(3.14 + 0 * Tau);
    R2 += 9 * Math.cos(3.63 + 77713.77 * Tau);
    R2 += 6 * Math.cos(1.87 + 5573.14 * Tau);
    R2 += 3 * Math.cos(5.47 + 18849.23 * Tau);
   // '**

  let R3 = 145 * Math.cos(4.273 + 6283.076 * Tau); + 7 * Math.cos(3.92 + 12566.15 * Tau);
  let R4 = 4 * Math.cos(2.56 + 6283.08 * Tau);
  let R = (R0 + R1 * Tau + R2 * Math.pow(Tau, 2) + R3 * Math.pow(Tau, 3) + R4 * Math.pow(Tau, 4)) / 100000000;
  return R;
}
//
function SunGeocentricLongitude(JD, OptResult = "") {
let l;
let b;
let Theta;
let Beta;
let T;
let LambdaPrime;
let DeltaTheta;
let ThetaFK5;
let DeltaPsi;
let Abberration;
let Lambda;
let Result;

l = EarthHeliocentricLongitude(JD);
b = EarthHeliocentricLatitude(JD);
Theta = l + 180;
Theta = Theta % 360;
Beta = -b;

T = (JD - 2451545) / 36525;
LambdaPrime = Theta - 1.397 * T - 0.00031 * Math.pow(T, 2);
DeltaTheta = (-0.09033 + 0.03916 * (Math.cos(LambdaPrime * (Math.PI / 180)) + Math.sin(LambdaPrime * (Math.PI / 180))) * Math.tan(Beta * (Math.PI / 180))) / 3600;
ThetaFK5 = Theta + DeltaTheta;

DeltaPsi = NutationInLongitude(JD);
Abberration = (-20.4898 / EarthRadiusVector(JD)) / 3600;
Lambda = ThetaFK5 + DeltaPsi + Abberration;
Lambda = Lambda % 360;

switch (OptResult.toUpperCase().replace(/ /g, "")) {
case "GEOMETRICVSOP87":
case "TRUEVSOP87":
Result = Theta;
break;
case "GEOMETRICFK5SYSTEM":
case "TRUEFK5SYSTEM":
Result = ThetaFK5;
break;
case "APPARENT":
Result = Lambda;
break;
default:
Result = Lambda;
}
return Result;
}
//
function SunGeocentricLatitude(JD, OptResult = "") {
  let l;
  let b;
  let Theta;
  let Beta;
  let T;
  let Lambda;
  let DeltaBeta;
  let BetaFK5;
  let Result;

  l = EarthHeliocentricLongitude(JD);
  b = EarthHeliocentricLatitude(JD);
  Theta = l + 180;
  Theta = ModFDiv(Theta , 360) ;
  Beta = -b;
  T = (JD - 2451545) / 36525;
  Lambda = Theta - 1.397 * T - 0.00031 * Math.pow(T, 2);
  DeltaBeta = (0.03916 * (Math.cos(degToRad(Lambda)) - Math.sin(degToRad(Lambda )))) / 3600;
  BetaFK5 = Beta + DeltaBeta;
  switch (OptResult.toUpperCase().replace(/ /g, "")) {
    case "GEOMETRICVSOP87":
    case "TRUEVSOP87":
      Result = Beta;
      break;
    case "GEOMETRICFK5SYSTEM":
    case "TRUEFK5SYSTEM":
      Result = BetaFK5;
      break;
    case "APPARENT":
      Result = BetaFK5;
      break;
    default:
      Result = BetaFK5;
  }

  return BetaFK5;
}

//
function SunGeocentricDistance(JD, OptResult = "") {
let R;
let Result;
R = EarthRadiusVector(JD);
switch (OptResult.toUpperCase().replace(/ /g, '')) {
case "AU":
Result = R;
break;
case "KM":
Result = R * 149597870.7;
break;
case "ER":
Result = R * 149597870.7 / 6371;
break;
default:
Result = R;
}
return Result;
}
//

function SunApparentRightAscension(JD) {
  let Lambda;
  let Beta;
  let Epsilon;
  let Alpha;
  
  Lambda = SunGeocentricLongitude(JD, "Apparent");
  Beta = SunGeocentricLatitude(JD, "Apparent");
  Epsilon = ObliquityOfEcliptic(JD);
  Alpha = radToDeg(Math.atan2(Math.sin(degToRad(Lambda)) * Math.cos(degToRad(Epsilon)) - Math.tan(degToRad(Beta)) * Math.sin(degToRad(Epsilon)), Math.cos(degToRad(Lambda))));
  Alpha = ModFDiv(Alpha , 360);
  
  return Alpha;
}

//
function SunApparentDeclination(JD) {
  let Lambda = SunGeocentricLongitude(JD, "Apparent");
  let Beta = SunGeocentricLatitude(JD, "Apparent");
  let Epsilon = ObliquityOfEcliptic(JD);
  let Delta = radToDeg(Math.asin(Math.sin(degToRad(Beta)) * Math.cos(degToRad(Epsilon)) + Math.cos(degToRad(Beta)) * Math.sin(degToRad(Epsilon)) * Math.sin(degToRad(Lambda))));
  return Delta;
}
//
function SunEquatorialHorizontalParallax(JD) {
// Deklarasi Variabel dan Tipe Variabel
let R = 0;
let Pi = 0;

// Proses Perhitungan
R = SunGeocentricDistance(JD, "AU");
Pi = (Math.asin(Math.sin(degToRad(8.794 / 3600)) / R) * 180) / Math.PI;

// Hasil Perhitungan
return Pi;
}
//
function SunAngularSemiDiameter(JD) {
  let R = SunGeocentricDistance(JD, "AU");
  let s0 = 15 + 59.63 / 60;
  let s = s0 / R;
  return s / 60;
}
//
function EquationOfTime(JD) {
  let Tau = (JD - 2451545) / 365250;
  let Alpha = SunApparentRightAscension(JD);
  let DeltaPsi = NutationInLongitude(JD);
  let Epsilon = ObliquityOfEcliptic(JD);
  let L0 = 280.4664567 + 360007.6982779 * Tau + 0.03032028 * Tau * Tau + Tau * Tau * Tau / 49931 - Tau * Tau * Tau * Tau / 15300 - Tau * Tau * Tau * Tau * Tau / 2000000;
  L0 = ModFDiv(L0 , 360) ;
  let E = L0 - 0.0057183 - Alpha + DeltaPsi * Math.cos(Epsilon * Math.PI / 180);
  if (Math.abs(E) * 4 < 20) {
    E = E / 15;
  } else if (Math.abs(E) * 4 >= 20 && E > 0) {
    E = E / 15 - 24;
  } else if (Math.abs(E) * 4 >= 20 && E < 0) {
    E = E / 15 + 24;
  } else {
    E = E / 15;
  }
  return E;
}

function Absol(x){
return Math.abs(x);
}


  //waktu awal sholat
//Sholat Dhuhur
function dhuhur(JDE,geolong,tz) {
  let pw = EquationOfTime(JDE);
  let dh = 12 - pw + ((15 * tz) - geolong) / 15;
  let iht = 1 / 30;
  return dh + iht;
}
//Sholat Ashar
function ashar(JDE, geolat, geolong, tz) {
let pw = EquationOfTime(JDE);
let kwd = ((15 * tz) - geolong) / 15;
let iht = 1 / 30;
let sundec = SunApparentDeclination(JDE);
let ist = Math.abs(sundec - geolat);
let hashr = radToDeg( Math.atan (1 / ( Math.tan(degToRad(ist)) + 1 )));
let swashr = radToDeg( Math.acos( Math.sin(degToRad(hashr)) / Math.cos(degToRad(sundec)) / Math.cos(degToRad(geolat)) - Math.tan(degToRad(sundec)) * Math.tan(degToRad(geolat))));
let ashr1 = swashr / 15
let ashr2 = 12 - pw + ashr1 + kwd + iht;
return ashr2;

}
// Sholat Maghrib
function maghrib(JDE, geolat, geolong, geoalt, tz) {
let pw = EquationOfTime(JDE);
let kwd = ((15 * tz) - geolong) / 15;
let iht = 1 / 30;
let sundec = SunApparentDeclination(JDE);
let a = 1.76 * Math.sqrt(geoalt) / 60;
let sdm = SunAngularSemiDiameter(JDE);
let ref = 34 / 60;
let hm = -(a + sdm + ref);
let swamagh = radToDeg( Math.acos( Math.sin(degToRad(hm)) / Math.cos(degToRad(sundec)) / Math.cos(degToRad(geolat)) - Math.tan(degToRad(sundec)) * Math.tan(degToRad(geolat))));
let mgb1 = swamagh / 15;
let mgb2 = 12 - pw + mgb1 + kwd + iht;
return mgb2;

}

// Sholat isya
function isya(JDE, geolat, geolong, tz) {
let pw = EquationOfTime(JDE);
let kwd = ((15 * tz) - geolong) / 15;
let iht = 1 / 30;
let sundec = SunApparentDeclination(JDE);
let hisy = -18;
let swisy = radToDeg( Math.acos( Math.sin(degToRad(hisy)) / Math.cos(degToRad(sundec)) / Math.cos(degToRad(geolat)) - Math.tan(degToRad(sundec)) * Math.tan(degToRad(geolat))));
let isy1 = swisy / 15;
let isy2 = 12 - pw + isy1 + kwd + iht;
return isy2;
}

// Sholat shubuh
function shubuh(JDE, geolat, geolong, tz) {
let pw = EquationOfTime(JDE);
let kwd = ((15 * tz) - geolong) / 15;
let iht = 1 / 30;
let sundec = SunApparentDeclination(JDE);
let hsbh = -20;
let swsbh = radToDeg( Math.acos( Math.sin(degToRad(hsbh)) / Math.cos(degToRad(sundec)) / Math.cos(degToRad(geolat)) - Math.tan(degToRad(sundec)) * Math.tan(degToRad(geolat))));
let sbh1 = swsbh / 15;
let sbh2 = 12 - pw - sbh1 + kwd + iht;
return sbh2;
}

// waktu terbit
function terbit(JDE, geolat, geolong, geoalt, tz) {
let pw = EquationOfTime(JDE);
let kwd = ((15 * tz) - geolong) / 15;
let iht = 1 / 30;
let sundec = SunApparentDeclination(JDE);
let a = 1.76 * Math.sqrt(geoalt) / 60;
let sdm = SunAngularSemiDiameter(JDE);
let ref = 34 / 60;
let hm = -(a + sdm + ref);
let swamagh = radToDeg( Math.acos( Math.sin(degToRad(hm)) / Math.cos(degToRad(sundec)) / Math.cos(degToRad(geolat)) - Math.tan(degToRad(sundec)) * Math.tan(degToRad(geolat))));
let trbt1 = swamagh / 15;
let trbt2 = 12 - pw - trbt1 + kwd - iht;
return trbt2;
}

// Sholat dluha
function dluha(JDE, geolat, geolong, tz) {
let pw = EquationOfTime(JDE);
let kwd = ((15 * tz) - geolong) / 15;
let iht = 1 / 30;
let sundec = SunApparentDeclination(JDE);
let hdha = 4.5;
let swdha = radToDeg( Math.acos( Math.sin(degToRad(hdha)) / Math.cos(degToRad(sundec)) / Math.cos(degToRad(geolat)) - Math.tan(degToRad(sundec)) * Math.tan(degToRad(geolat))));
let dha1 = swdha / 15;
let dha2 = 12 - pw - dha1 + kwd + iht;
return dha2;
}
//

