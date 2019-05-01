import React, { Component } from "react";
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography
} from "react-simple-maps";

const wrapperStyles = {
  width: "100%",
  maxWidth: 980,
  margin: "0 auto"
};

const statsStyle = {
  border: "5px solid green",
  width: "100%",
  padding: "5px"
};

const countryStyle = {
  textAlign: "center"
};

//I used C++ to parse csv and create giant dict,
// 3 letter country code is key,
//value 0 = country name
//value 1 = population
//value 2 = special_waste_e_waste_tons_year
//value 3 = special_waste_hazardous_waste_tons_year
//value 4 = total_msw_total_msw_generated_tons_year municipal solid waste
//value 5 = msw per person
var stats_dict = {
  ABW: ["Aruba", 103187, null, null, 88132, 0.8541],
  AFG: ["Afghanistan", 34656032, 20000.0, null, 5628525, 0.162411],
  AGO: ["Angola", 25096150, 92000.0, null, 4213644, 0.1679],
  ALB: ["Albania", 2880703, 20000.0, 5714.82, 1142964, 0.396766],
  AND: ["Andorra", 82431, null, 1788.0, 43000, 0.521648],
  ARE: ["United Arab Emirates", 9269612, 134000.0, 57525.0, 5413453, 0.584],
  ARG: ["Argentina", 42981515, 291700.0, 310044.0, 17910550, 0.416704],
  ARM: ["Armenia", 2906220, 14000.0, 62270.0, 492800, 0.169567],
  ASM: ["American Samoa", 55599, null, null, 18989, 0.341535],
  ATG: ["Antigua and Barbuda", 96777, 1100.0, null, 30585, 0.316036],
  AUS: ["Australia", 23789338, 574000.0, 7000000.0, 13345000, 0.560966],
  AUT: ["Austria", 8633169, 166174.0, 1272288.0, 4836000, 0.560165],
  AZE: ["Azerbaijan", 9649341, 63000.0, 296979.4, 2930349, 0.303684],
  BDI: ["Burundi", 6741569, 5000.0, null, 1872016, 0.277683],
  BEL: ["Belgium", 11274196, 603575.0, 2946195.0, 4708000, 0.417591],
  BEN: ["Benin", 5521763, 8200.0, null, 685936, 0.124224],
  BFA: ["Burkina Faso", 18110624, 11000.0, 7871.0, 2575251, 0.142196],
  BGD: ["Bangladesh", 155727053, 142000.0, 114358.0, 14778497, 0.0949],
  BGR: ["Bulgaria", 7177991, 53785.0, 12206169.0, 3011000, 0.419477],
  BHR: ["Bahrain", 1425171, 20000.0, 31000.0, 951943, 0.66795],
  BHS: ["Bahamas The", 386838, 4900.0, null, 264000, 0.682456],
  BIH: ["Bosnia and Herzegovina", 3535961, 1409.0, 8408.0, 1248718, 0.353148],
  BLR: ["Belarus", 9489616, 72000.0, 1336926.0, 4280000, 0.451019],
  BLZ: ["Belize", 359288, 2300.0, null, 101379, 0.282166],
  BMU: ["Bermuda", 64798, null, 525.0, 82000, 1.26547],
  BOL: ["Bolivia", 10724705, 35392.0, 545183.0, 2219052, 0.20691],
  BRA: ["Brazil", 205962108, 1411900.0, null, 79889010, 0.387882],
  BRB: ["Barbados", 280601, 3800.0, 9410.34, 174815, 0.623002],
  BRN: ["Brunei Darussalam", 423196, 7700.0, null, 216253, 0.511],
  BTN: ["Bhutan", 686958, 1457.5, null, 111314, 0.162039],
  BWA: ["Botswana", 2014866, 16000.0, null, 210854, 0.104649],
  CAF: ["Central African Republic", 4515392, 2700.0, null, 1105983, 0.244936],
  CAN: ["Canada", 35544564, 724000.0, null, 25103034, 0.706241],
  CHE: ["Switzerland", 8372098, 184000.0, 1200000.0, 6056000, 0.723355],
  CHI: ["Channel Islands", 164541, null, null, 178933, 1.08747],
  CHL: ["Chile", 16829442, 176000.0, 249755.0, 6517000, 0.387238],
  CHN: ["China", 1371220000, 7211000.0, 34652400.0, 210000000, 0.153148],
  CIV: ["Côte d'Ivoire", 20401331, 22000.0, null, 4440814, 0.217673],
  CMR: ["Cameroon", 21655715, 19000.0, 8716.6, 3270617, 0.151028],
  COD: ["Congo Dem. Rep.", 78736153, null, null, 14385226, 0.182702],
  COG: ["Congo Rep.", 2648507, null, null, 451200, 0.17036],
  COL: ["Colombia", 46406646, 252200.0, 270146.3, 12150120, 0.261819],
  COM: ["Comoros", 777424, 600.0, null, 91013, 0.11707],
  CPV: ["Cabo Verde", 513979, 2400.0, 3548.92, 132555, 0.2579],
  CRI: ["Costa Rica", 4757575, 35800.0, null, 1460000, 0.306879],
  CUB: ["Cuba", 11303687, null, 565216.0, 2692692, 0.238214],
  CUW: ["Curacao", 153822, null, null, 24704, 0.160601],
  CYM: ["Cayman Islands", 59172, null, null, 60000, 1.01399],
  CYP: ["Cyprus", 1160985, 18137.0, 173377.0, 541000, 0.465984],
  CZE: ["Czech Republic", 10546059, 79581.0, 1162342.0, 3337000, 0.316422],
  DEU: ["Germany", 81686611, 2465085.0, 21812660.0, 51046000, 0.6249],
  DJI: ["Djibouti", 746221, 900.0, null, 114997, 0.154106],
  DMA: ["Dominica", 72400, null, 627.0, 13176, 0.181989],
  DNK: ["Denmark", 5683483, 168614.0, 1718394.0, 4485000, 0.789129],
  DOM: ["Dominican Republic", 10528394, 57000.0, null, 4063910, 0.385995],
  DZA: ["Algeria", 40606052, 252000.0, 330000.0, 12378740, 0.30485],
  ECU: ["Ecuador", 16144368, 73000.0, 193812.0, 5297211, 0.328115],
  EGY: ["Egypt", 87813257, 497000.0, 380000.0, 21000000, 0.239144],
  ERI: ["Eritrea", 4474690, 3800.0, null, 726957, 0.16246],
  ESP: ["Spain", 46447697, 1202597.0, 2984518.0, 20151000, 0.433843],
  EST: ["Estonia", 1315407, 34312.0, 10410321.0, 473000, 0.359585],
  ETH: ["Ethiopia", 99873033, 49000.0, null, 6532787, 0.0654109],
  FIN: ["Finland", 5479531, 212954.0, 1998693.0, 2738000, 0.499678],
  FJI: ["Fiji", 867086, 4600.0, null, 189390, 0.218421],
  FRA: ["France", 66624068, 2218682.0, 10783405.0, 33399000, 0.501305],
  FRO: ["Faeroe Islands", 48842, null, null, 61000, 1.24893],
  FSM: ["Micronesia Fed. Sts.", 104937, 200.0, null, 26040, 0.248149],
  GAB: ["Gabon", 1086137, 14000.0, null, 238102, 0.219219],
  GBR: ["United Kingdom", 65128861, 3584126.0, 5755258.0, 31567000, 0.484685],
  GEO: ["Georgia", 3717100, 21000.0, null, 800000, 0.215222],
  GHA: ["Ghana", 21542009, 39000.0, null, 3538275, 0.16425],
  GIB: ["Gibraltar", 33623, 201.44, 58995.04, 16954, 0.504238],
  GIN: ["Guinea", 8132552, 8000.0, null, 596911, 0.0733977],
  GMB: ["Gambia The", 1311349, 2200.0, null, 193441, 0.147513],
  GNB: ["Guinea-Bissau", 1770526, 1000.0, null, 289514, 0.163519],
  GNQ: ["Equatorial Guinea", 1221490, null, null, 198443, 0.16246],
  GRC: ["Greece", 10892413, 188460.0, 221041.0, 5477424, 0.502866],
  GRD: ["Grenada", 105481, 800.0, null, 29536, 0.280013],
  GRL: ["Greenland", 56905, null, 730.0, 50000, 0.878657],
  GTM: ["Guatemala", 16252429, 55000.0, 10051.0, 2756741, 0.16962],
  GUM: ["Guam", 159973, null, null, 141500, 0.884524],
  GUY: ["Guyana", 746556, 5000.0, 741.78, 179252, 0.240105],
  HKG: ["Hong Kong SAR China", 7305700, 70000.0, 54812.0, 5679816, 0.77745],
  HND: ["Honduras", 9112867, 1700.0, 253.14, 2162028, 0.23725],
  HRV: ["Croatia", 4203604, 58078.0, 130326.0, 1654000, 0.393472],
  HTI: ["Haiti", 10847334, 6000.0, null, 2309852, 0.212942],
  HUN: ["Hungary", 9843028, 50066.0, 596554.0, 3712000, 0.37712],
  IDN: ["Indonesia", 261115456, 1274000.0, 23000000.0, 65200000, 0.249698],
  IMN: ["Isle of Man", 80759, null, null, 50551, 0.625949],
  IND: ["India", 1071477855, 1700000.0, 7467000.0, 168403240, 0.157169],
  IRL: ["Ireland", 4586897, 212874.0, 482907.0, 2692537, 0.587006],
  IRN: ["Iran", 80277428, 630000.0, 8000000.0, 17885000, 0.22279],
  IRQ: ["Iraq", 36115649, 221000.0, 20622.0, 13140000, 0.363831],
  ISL: ["Iceland", 330815, 7600.0, 7000.0, 525000, 1.58699],
  ISR: ["Israel", 8380100, 120000.0, 321000.0, 5400000, 0.644384],
  ITA: ["Italy", 60730582, 2800026.0, 8923548.0, 29524000, 0.486147],
  JAM: ["Jamaica", 2881355, 17000.0, 10000.0, 1051695, 0.365],
  JOR: ["Jordan", 8413464, 43000.0, 1230441.0, 2529997, 0.300708],
  JPN: ["Japan", 127141000, 518978.0, 3600000.0, 43981000, 0.345923],
  KAZ: ["Kazakhstan", 16791425, 147000.0, null, 4659740, 0.277507],
  KEN: ["Kenya", 41350152, 17350.0, null, 5595099, 0.13531],
  KGZ: ["Kyrgyz Republic", 5956900, 7200.0, 4771346.0, 1113300, 0.186893],
  KHM: ["Cambodia", 15270790, 14000.0, null, 1089000, 0.0713126],
  KIR: ["Kiribati", 114395, 100.0, null, 35724, 0.312286],
  KNA: ["St. Kitts and Nevis", 54288, 700.0, null, 32892, 0.60588],
  KOR: ["Korea Rep.", 50746659, 570635.0, null, 18218975, 0.359018],
  KWT: ["Kuwait", 2998083, 67000.0, 203000.0, 1750000, 0.583706],
  LAO: ["Lao PDR", 6663967, 7500.0, 5200.0, 351900, 0.0528064],
  LBN: ["Lebanon", 5603279, 51000.0, 46000.0, 2040000, 0.364073],
  LBR: ["Liberia", 3512932, null, null, 564467, 0.160683],
  LBY: ["Libya", 6193501, 70000.0, null, 2147596, 0.34675],
  LCA: ["St. Lucia", 177206, 1600.0, 2732.0, 77616, 0.437999],
  LIE: ["Liechtenstein", 36545, 293.0, 1204.0, 32382, 0.886086],
  LKA: ["Sri Lanka", 21203000, 72.5, null, 2631650, 0.124117],
  LSO: ["Lesotho", 1965662, 1800.0, null, 73457, 0.0373701],
  LTU: ["Lithuania", 2904910, 82691.0, 165477.0, 1300000, 0.447518],
  LUX: ["Luxembourg", 569604, 7398.0, 237180.0, 356000, 0.624996],
  LVA: ["Latvia", 1977527, 25071.0, 104142.0, 857000, 0.43337],
  MAC: ["Macao SAR China", 612167, 11000.0, 3118.0, 377942, 0.617384],
  MAF: ["St. Martin (French part)", 30959, null, null, 15480, 0.500016],
  MAR: ["Morocco", 34318082, 30300.0, 289385.0, 6852000, 0.199662],
  MCO: ["Monaco", 37783, null, 312.07, 46000, 1.21748],
  MDA: ["Moldova", 3554108, 6300.0, 418.0, 3981200, 1.12017],
  MDG: ["Madagascar", 24894551, 14000.0, 45957.0, 3768759, 0.151389],
  MDV: ["Maldives", 409163, 3003.95, 15105.53, 211506, 0.516924],
  MEX: ["Mexico", 125890949, 957900.0, 18172.49, 53100000, 0.421794],
  MHL: ["Marshall Islands", 52793, null, null, 8614, 0.163166],
  MKD: ["Macedonia FYR", 2081206, 1220.0, 40797.0, 796585, 0.382752],
  MLI: ["Mali", 16006670, 12000.0, null, 1937354, 0.121034],
  MLT: ["Malta", 431874, 7643.0, 36523.0, 269000, 0.622867],
  MMR: ["Myanmar", 46095462, 55000.0, null, 4677307, 0.10147],
  MNE: ["Montenegro", 622159, 6200.0, 3819.21, 332000, 0.533626],
  MNG: ["Mongolia", 3027398, 14000.0, null, 2900000, 0.957918],
  MNP: ["Northern Mariana Islands", 54036, null, null, 32761, 0.606281],
  MOZ: ["Mozambique", 27212382, 17000.0, null, 2500000, 0.0918699],
  MRT: ["Mauritania", 3506288, 5100.0, null, 454000, 0.129482],
  MUS: ["Mauritius", 1263473, 11000.0, 17000.0, 438000, 0.346664],
  MWI: ["Malawi", 16577147, 9500.0, null, 1297844, 0.0782912],
  MYS: ["Malaysia", 30228017, 280000.0, 2918478.0, 12982685, 0.429492],
  NAM: ["Namibia", 1559983, 14000.0, null, 256729, 0.164572],
  NCL: ["New Caledonia", 278000, null, null, 108157, 0.389054],
  NER: ["Niger", 8842415, 7900.0, 554000.0, 1865646, 0.210988],
  NGA: ["Nigeria", 154402181, 277000.0, null, 27614830, 0.17885],
  NIC: ["Nicaragua", 5737723, 10800.0, 2837.0, 1528816, 0.26645],
  NLD: ["Netherlands", 16939923, 534410.0, 4830495.0, 8855000, 0.52273],
  NOR: ["Norway", 5188607, 150000.0, 1482000.0, 2187000, 0.4215],
  NPL: ["Nepal", 28982771, 23000.0, 5051.0, 1768977, 0.0610355],
  NRU: ["Nauru", 13049, null, null, 6192, 0.474519],
  NZL: ["New Zealand", 4692700, 95000.0, null, 3405000, 0.725595],
  OMN: ["Oman", 3960925, 59000.0, 1469835.0, 1734885, 0.438],
  PAK: ["Pakistan", 193203476, 301000.0, 1538000.0, 30760000, 0.15921],
  PAN: ["Panama", 3969249, 3200.0, null, 1472262, 0.370917],
  PER: ["Peru", 30973354, 182000.0, 660180.18, 8356711, 0.269803],
  PHL: ["Philippines", 103320222, 290000.0, 4332222.32, 14631923, 0.141617],
  PLW: ["Palau", 21503, 200.0, null, 9427, 0.438404],
  PNG: ["Papua New Guinea", 7755785, 7000.0, null, 1000000, 0.128936],
  POL: ["Poland", 37986412, 224452.0, 1679051.0, 10863000, 0.285971],
  PRI: ["Puerto Rico", 3473181, 946.44, 4.92, 4170953, 1.2009],
  PRT: ["Portugal", 10401062, 170078.0, 701228.0, 4710000, 0.452838],
  PRY: ["Paraguay", 6639119, 34200.0, null, 1818501, 0.273907],
  PSE: ["West Bank and Gaza", 4046901, null, 62621.0, 1387000, 0.342731],
  PYF: ["French Polynesia", 273528, null, null, 147000, 0.537422],
  QAT: ["Qatar", 2109568, 29000.0, 105000.0, 1000990, 0.4745],
  ROU: ["Romania", 19815481, 132268.0, 590300.0, 4895000, 0.247029],
  RUS: ["Russia", 143201676, 1392000.0, 110000000.0, 60000000, 0.41899],
  RWA: ["Rwanda", 11917508, 5900.0, null, 4384969, 0.367943],
  SAU: ["Saudi Arabia", 31557144, 508000.0, 697000.0, 16125701, 0.511],
  SDN: ["Sudan", 38647803, 51000.0, null, 2831291, 0.0732588],
  SEN: ["Senegal", 15411614, 15000.0, null, 2454059, 0.159234],
  SGP: ["Singapore", 5607283, 100000.0, 446870.0, 7704300, 1.37398],
  SLB: ["Solomon Islands", 563513, 400.0, null, 179972, 0.319375],
  SLE: ["Sierra Leone", 5439695, 3400.0, null, 610222, 0.112179],
  SLV: ["El Salvador", 6164626, 30100.0, 16465.0, 1648996, 0.267493],
  SMR: ["San Marino", 33203, null, null, 17175, 0.517273],
  SOM: ["Somalia", 14317996, null, null, 2326099, 0.16246],
  SRB: ["Serbia", 7095383, 14388.0, 13475026.0, 1840000, 0.259324],
  SSD: ["South Sudan", 11177490, null, null, 2680681, 0.239829],
  STP: ["São Tomé and Príncipe", 191266, 200.0, null, 25587, 0.133777],
  SUR: ["Suriname", 526103, 5000.0, null, 78620, 0.149438],
  SVK: ["Slovak Republic", 5423801, 30911.0, 375688.0, 1784000, 0.328921],
  SVN: ["Slovenia", 2063531, 26359.0, 155229.0, 926000, 0.448745],
  SWE: ["Sweden", 9799186, 721671.0, 2568154.0, 4377000, 0.44667],
  SWZ: ["Eswatini", 1343098, 5700.0, null, 218199, 0.162459],
  SXM: ["Sint Maarten (Dutch part)", 37685, null, null, null, null],
  SYC: ["Seychelles", 88303, 1100.0, null, 48000, 0.543583],
  SYR: ["Syrian Arab Republic", 20824893, null, 68000.0, 4500000, 0.216088],
  TCA: ["Turks and Caicos Islands", 34900, null, null, null, null],
  TCD: ["Chad", 11887202, 8800.0, null, 1358851, 0.114312],
  TGO: ["Togo", 7228915, 6400.0, 1900.0, 1109030, 0.153416],
  THA: ["Thailand", 68657600, 384233.0, 3445000.0, 26853366, 0.39112],
  TJK: ["Tajikistan", 8177809, null, null, 1787400, 0.218567],
  TKM: ["Turkmenistan", 5366277, 22000.0, 1000.0, 500000, 0.0931745],
  TLS: ["Timor-Leste", 1268671, 3600.0, null, 63875, 0.050348],
  TON: ["Tonga", 104951, 300.0, null, 17238, 0.164248],
  TTO: ["Trinidad and Tobago", 1328100, 71.07, 123914.1, 727874, 0.548057],
  TUN: ["Tunisia", 11143908, 90000.0, 150000.0, 2700000, 0.242285],
  TUR: ["Turkey", 78271472, 623000.0, 3432426.0, 31283000, 0.399673],
  TUV: ["Tuvalu", 11097, 10.0, null, 3989, 0.359467],
  TWN: ["Taiwan", 23434000, 14036.0, null, 7336000, 0.313049],
  TZA: ["Tanzania", 49082997, 38000.0, null, 9276995, 0.189006],
  UGA: ["Uganda", 35093648, 25000.0, null, 7045050, 0.20075],
  UKR: ["Ukraine", 45004645, 277000.0, 448000000.0, 15242025, 0.338677],
  URY: ["Uruguay", 3431552, 37000.0, null, 1260140, 0.367222],
  USA: ["United States", 318563456, 2440000.0, 28800000.0, 258000000, 0.809886],
  UZB: ["Uzbekistan", 29774500, null, null, 4000000, 0.134343],
  VCT: ["St. Vincent and the Grenadines", 109455, 900.0, null, 31561, 0.288347],
  VEN: ["Venezuela RB", 29893080, 232700.0, 123157.0, 9779093, 0.327136],
  VGB: ["British Virgin Islands", 20645, null, null, 21099, 1.02199],
  VIR: ["Virgin Islands (U.S.)", 105784, null, null, 146500, 1.3849],
  VNM: ["Vietnam", 86932500, 141000.0, 2995153.5, 9570300, 0.110089],
  VUT: ["Vanuatu", 270402, 300.0, null, 70225, 0.259706],
  WSM: ["Samoa", 187665, 500.0, null, 27399, 0.146],
  XKX: ["Kosovo", 1801800, 23.0, 495.0, 319000, 0.177045],
  YEM: ["Yemen Rep.", 27584213, 42000.0, 21000.0, 4836820, 0.175347],
  ZAF: ["South Africa", 51729345, 321000.0, 1319096.0, 18457232, 0.356804],
  ZMB: ["Zambia", 14264756, 15000.0, 80000.0, 2608268, 0.182847]
  //use C++ to parse csv and create giant dict,
};

class BasicMap extends Component {
  constructor(props) {
    super(props);
    //value 0 = country name
    //value 1 = population
    //value 2 = special_waste_e_waste_tons_year
    //value 3 = special_waste_hazardous_waste_tons_year
    //value 4 = total_msw_total_msw_generated_tons_year municipal solid waste
    //value 5 = msw per person
    this.state = {
      country_name: "Choose a Country",
      population: null,
      e_waste: null,
      haz_waste: null,
      total_msw: null,
      msw_per_person: null
    };

    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(geography, evt) {
    console.log("Geography data: ", geography);
    console.log("country_name: ", stats_dict[geography.id][0]);

    var stat_1 = "not available";
    if (stats_dict[geography.id][1] != null) {
      stat_1 = stats_dict[geography.id][1];
    }
    console.log("population: ", stat_1);

    var stat_2 = "not available";
    if (stats_dict[geography.id][2] != null) {
      stat_2 = stats_dict[geography.id][2];
    }
    console.log("e_waste: ", stat_2);

    var stat_3 = "not available";
    if (stats_dict[geography.id][3] != null) {
      stat_3 = stats_dict[geography.id][3];
    }
    console.log("haz_waste: ", stat_3);

    var stat_4 = "not available";
    if (stats_dict[geography.id][4] != null) {
      stat_4 = stats_dict[geography.id][4];
    }
    console.log("total_msw: ", stat_4);

    var stat_5 = "not available";
    if (stats_dict[geography.id][5] != null) {
      stat_5 = stats_dict[geography.id][5];
    }
    console.log("msw_per_person: ", stat_5);

    this.setState({
      country_name: stats_dict[geography.id][0],
      population: stat_1,
      e_waste: stat_2,
      haz_waste: stat_3,
      total_msw: stat_4,
      msw_per_person: stat_5
    });
  }

  render() {
    return (
      <div style={wrapperStyles}>
        <h1>Environ 244: World Environmental Waste Statistics</h1>

        <ComposableMap
          projectionConfig={{
            scale: 205,
            rotation: [-11, 0, 0]
          }}
          width={980}
          height={551}
          style={{
            width: "100%",
            height: "auto"
          }}
        >
          <ZoomableGroup center={[0, 20]} disablePanning>
            <Geographies geography="world-50m.json">
              {(geographies, projection) =>
                geographies.map(
                  (geography, i) =>
                    geography.id !== "ATA" && (
                      <Geography
                        key={i}
                        geography={geography}
                        projection={projection}
                        style={{
                          default: {
                            fill: "#ECEFF1",
                            stroke: "#607D8B",
                            strokeWidth: 0.75,
                            outline: "none"
                          },
                          hover: {
                            fill: "#607D8B",
                            stroke: "#607D8B",
                            strokeWidth: 0.75,
                            outline: "none"
                          },
                          pressed: {
                            fill: "#607D8B",
                            stroke: "#607D8B",
                            strokeWidth: 0.75,
                            outline: "none"
                            // fill: "#FF5722",
                            // stroke: "#607D8B",
                            // strokeWidth: 0.75,
                            // outline: "none"
                          }
                        }}
                        onClick={this.handleClick}
                      />
                    )
                )
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
        <div style={statsStyle}>
          <h2 style={countryStyle}>{this.state.country_name}</h2>
          <h4>Population:</h4>
          {this.state.population}
          <h4>Electronic Waste (tons/year):</h4>
          {this.state.e_waste}
          <h4>Hazardous Waste (tons/year):</h4>
          {this.state.haz_waste}
          <h4>Municipal Solid Waste / Consumer Waste (tons/year):</h4>
          {this.state.total_msw}
          <h4>Municipal Solid Waste Per Capita:</h4>
          {this.state.msw_per_person}
        </div>
        <a href="https://github.com/schrecka/environ244_nextjs">
          Website Repository
          <img
            border="0"
            alt="Github"
            src="components/GitHub-Mark-32px.png"
            width="100"
            height="100"
          />
        </a>
      </div>
    );
  }
}

export default BasicMap;
