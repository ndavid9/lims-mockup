// ALL DATA FICTIONAL — demo only. Spec limits indicative; verify against current legal text before use.
const SITES={FR:{name:"Lyon (FR) site",acc:"COFRAC accredited (No. 1-XXXX, fictional)",vat:20,reduced:[10,5.5],cur:"EUR",einv:"Factur-X / FR e-invoicing mandate (PDP)"},
DE:{name:"Köln (DE) site",acc:"DAkkS accredited (D-PL-XXXXX-01-00, fictional)",vat:19,reduced:[7],cur:"EUR",einv:"XRechnung / ZUGFeRD"}};
const CLIENTS=[
{id:"C-FR-01",site:"FR",name:"Fromagerie des Alpes Fictives SARL",addr:"12 Rue Imaginaire, 69002 Lyon, France",vatId:"FR00123456789",country:"FR"},
{id:"C-FR-02",site:"FR",name:"Eaux de la Vallée Exemple (Régie)",addr:"4 Quai du Demo, 38000 Grenoble, France",vatId:"FR00987654321",country:"FR"},
{id:"C-DE-01",site:"DE",name:"Gewürzhaus Musterfrau GmbH",addr:"Beispielstraße 7, 50667 Köln, Deutschland",vatId:"DE000111222",country:"DE"},
{id:"C-DE-02",site:"DE",name:"Klärwerk Testhausen AöR",addr:"Am Fiktivpark 3, 40213 Düsseldorf, Deutschland",vatId:"DE000333444",country:"DE"},
{id:"C-BE-01",site:"FR",name:"Brasserie Fictive BV",addr:"Voorbeeldlaan 1, 1000 Bruxelles, Belgique",vatId:"BE0000000097",country:"BE"}];
// limits: [min,max,unit,ref]
const TESTS=[
{code:"MIC-LIS",name:"Listeria monocytogenes",dept:"Microbiology",price:65,unit:"cfu/g",max:100,ref:"Reg. (EC) 2073/2005 (RTE foods)",tat:5},
{code:"MIC-SAL",name:"Salmonella (presence/25 g)",dept:"Microbiology",price:55,unit:"det/25g",max:0,ref:"Reg. (EC) 2073/2005",tat:5},
{code:"PES-MRM",name:"Pesticide multi-residue (GC/LC-MS/MS)",dept:"Chromatography",price:220,unit:"mg/kg",max:0.01,ref:"Reg. (EC) 396/2005 default MRL",tat:7},
{code:"MYC-AFB1",name:"Aflatoxin B1",dept:"Chromatography",price:95,unit:"µg/kg",max:5,ref:"Reg. (EU) 2023/915 (spices)",tat:5},
{code:"MET-PB",name:"Lead (ICP-MS)",dept:"Inorganics",price:45,unit:"µg/L",max:10,ref:"Dir. (EU) 2020/2184 drinking water",tat:4},
{code:"MET-AS",name:"Arsenic (ICP-MS)",dept:"Inorganics",price:45,unit:"µg/L",max:10,ref:"Dir. (EU) 2020/2184",tat:4},
{code:"NUT-PNL",name:"Nutrition declaration panel",dept:"Food chemistry",price:180,unit:"panel",max:null,ref:"Reg. (EU) 1169/2011",tat:8},
{code:"WW-BOD",name:"BOD5",dept:"Wet chemistry",price:30,unit:"mg/L O2",max:25,ref:"UWWTD 91/271/EEC",tat:6},
{code:"WW-COD",name:"COD",dept:"Wet chemistry",price:28,unit:"mg/L O2",max:125,ref:"UWWTD 91/271/EEC",tat:3},
{code:"WW-TSS",name:"Total suspended solids",dept:"Wet chemistry",price:20,unit:"mg/L",max:35,ref:"UWWTD 91/271/EEC",tat:3},
{code:"WAT-PH",name:"pH",dept:"Wet chemistry",price:10,unit:"pH",min:6.5,max:9.5,ref:"Dir. (EU) 2020/2184 indicator",tat:2},
{code:"WAT-ECO",name:"E. coli",dept:"Microbiology",price:25,unit:"cfu/100mL",max:0,ref:"Dir. (EU) 2020/2184",tat:3},
{code:"AIR-PM10",name:"PM10 (24 h gravimetric)",dept:"Air",price:85,unit:"µg/m³",max:50,ref:"Ambient Air Quality Dir. (daily LV)",tat:5},
{code:"AIR-PM25",name:"PM2.5 (24 h gravimetric)",dept:"Air",price:85,unit:"µg/m³",max:null,ref:"Ambient Air Quality Dir. (annual LV only)",tat:5},
{code:"STK-NOX",name:"Stack NOx (EN 14792)",dept:"Air",price:240,unit:"mg/Nm³",max:null,ref:"Permit-specific limit",tat:7},
{code:"SOIL-MET",name:"Soil metals screen",dept:"Inorganics",price:120,unit:"mg/kg",max:null,ref:"National soil guideline (configurable)",tat:7}];
const MATRICES=["Food – dairy","Food – spices","Beverage","Drinking water","Wastewater (effluent)","Surface water (WFD)","Soil","Ambient air filter","Stack emission"];
const USERS={reception:"Reception (A. Martin)",analyst:"Analyst (L. Becker)",reviewer:"QA Reviewer (C. Dubois)",manager:"Lab Manager (M. Schulz)",finance:"Finance (S. Laurent)",client:"Client portal user"};
const PERMS={reception:["samples"],analyst:["analysis"],reviewer:["analysis","approve","reports"],manager:["samples","analysis","approve","reports","invoicing","audit"],finance:["invoicing"],client:["portal"]};
const SEED_SAMPLES=[
{id:"FR-26-000101",site:"FR",client:"C-FR-01",matrix:"Food – dairy",desc:"Tomme, lot 26-0412",collected:"19/10/2026 08:30",by:"Field: J. Petit",gps:"45.76,4.83",temp:"4.1",status:"In Analysis",tests:["MIC-LIS","MIC-SAL","NUT-PNL"],due:"26/10/2026",priority:"Normal"},
{id:"FR-26-000102",site:"FR",client:"C-FR-02",matrix:"Drinking water",desc:"Réservoir R3 tap",collected:"20/10/2026 07:10",by:"Field: J. Petit",gps:"45.19,5.72",temp:"5.0",status:"Review",tests:["MET-PB","MET-AS","WAT-PH","WAT-ECO"],due:"24/10/2026",priority:"Urgent"},
{id:"DE-26-000201",site:"DE",client:"C-DE-01",matrix:"Food – spices",desc:"Paprika edelsüß, Charge 88",collected:"18/10/2026 11:00",by:"Client delivered",gps:"",temp:"18.0",status:"Approved",tests:["MYC-AFB1","PES-MRM"],due:"25/10/2026",priority:"Normal"},
{id:"DE-26-000202",site:"DE",client:"C-DE-02",matrix:"Wastewater (effluent)",desc:"Ablauf Nachklärung, 24h composite",collected:"21/10/2026 06:00",by:"Field: K. Wagner",gps:"51.22,6.77",temp:"3.8",status:"Received",tests:["WW-BOD","WW-COD","WW-TSS"],due:"27/10/2026",priority:"Normal"},
{id:"DE-26-000203",site:"DE",client:"C-DE-02",matrix:"Ambient air filter",desc:"Station Nord, filter 2026-10-20",collected:"21/10/2026 09:00",by:"Field: K. Wagner",gps:"51.25,6.80",temp:"",status:"Registered",tests:["AIR-PM10","AIR-PM25"],due:"26/10/2026",priority:"Normal"},
{id:"FR-26-000103",site:"FR",client:"C-BE-01",matrix:"Beverage",desc:"Blonde ale, batch B-55",collected:"15/10/2026 14:00",by:"Courier",gps:"",temp:"6.2",status:"Reported",tests:["PES-MRM","MYC-AFB1"],due:"22/10/2026",priority:"Normal"}];
const SEED_RESULTS={"FR-26-000102":{"MET-PB":"12.4","MET-AS":"3.1","WAT-PH":"7.6","WAT-ECO":"0"},"DE-26-000201":{"MYC-AFB1":"2.1","PES-MRM":"<0.01"},"FR-26-000103":{"PES-MRM":"<0.01","MYC-AFB1":"0.4"},"FR-26-000101":{"MIC-LIS":"<10"}};
